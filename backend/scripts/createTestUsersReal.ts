import bcrypt from 'bcryptjs';
import prisma from '../src/config/database';

async function createTestUsersReal() {
  try {
    console.log('🔧 Creando usuarios de prueba para la base de datos ROLES...');

    // Usuarios de prueba con los roles y empresas reales de tu BD
    const users = [
      {
        nombre_usuario: 'admin',
        correo: 'admin@lck.com',
        nombre_completo: 'Administrador Sistema',
  contrasena: await bcrypt.hash('admin123', 10),
        rol: 'admin' as const,
        empresa_asignada: 'woco' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'usuario1',
        correo: 'usuario1@lck.com',
        nombre_completo: 'Usuario Woco',
  contrasena: await bcrypt.hash('user123', 10),
        rol: 'user' as const,
        empresa_asignada: 'woco' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'usuario2',
        correo: 'usuario2@signify.com',
        nombre_completo: 'Usuario Signify',
  contrasena: await bcrypt.hash('user123', 10),
        rol: 'user' as const,
        empresa_asignada: 'signify' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'usuario3',
        correo: 'usuario3@signify-lum.com',
        nombre_completo: 'Usuario Signify Luminarias',
  contrasena: await bcrypt.hash('user123', 10),
        rol: 'user' as const,
        empresa_asignada: 'signify_luminarias' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'admin2',
        correo: 'admin2@signify.com',
        nombre_completo: 'Admin Signify',
  contrasena: await bcrypt.hash('admin123', 10),
        rol: 'admin' as const,
        empresa_asignada: 'signify' as const,
        activo: true,
        email_verificado: true
      }
    ];

    for (const user of users) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.usuarios.findFirst({
          where: {
            OR: [
              { nombre_usuario: user.nombre_usuario },
              { correo: user.correo }
            ]
          }
        });

        if (existingUser) {
          console.log(`⚠️  Usuario ${user.nombre_usuario} ya existe, actualizando...`);
          await prisma.usuarios.update({
            where: { id: existingUser.id },
            data: {
              ...user,
              fecha_actualizacion: new Date()
            }
          });
        } else {
          await prisma.usuarios.create({
            data: {
              ...user,
              fecha_creacion: new Date(),
              fecha_actualizacion: new Date()
            }
          });
          console.log(`✅ Usuario ${user.nombre_usuario} creado exitosamente`);
        }
      } catch (error) {
        console.error(`❌ Error creando usuario ${user.nombre_usuario}:`, error);
      }
    }

    console.log('\n🎉 Usuarios de prueba creados/actualizados exitosamente en la BD ROLES!');
    console.log('\n📋 Credenciales de prueba:');
    console.log('┌──────────────┬─────────────┬───────────────────┬──────────────────────┐');
    console.log('│ Usuario      │ Contraseña  │ Rol               │ Empresa              │');
    console.log('├──────────────┼─────────────┼───────────────────┼──────────────────────┤');
    console.log('│ admin        │ admin123    │ admin             │ woco                 │');
    console.log('│ usuario1     │ user123     │ user              │ woco                 │');
    console.log('│ usuario2     │ user123     │ user              │ signify              │');
    console.log('│ usuario3     │ user123     │ user              │ signify_luminarias   │');
    console.log('│ admin2       │ admin123    │ admin             │ signify              │');
    console.log('└──────────────┴─────────────┴───────────────────┴──────────────────────┘');

    console.log('\n🔗 Para probar:');
    console.log('1. Ve a: http://localhost:5173');
    console.log('2. Usa cualquiera de las credenciales de arriba');
    console.log('3. El backend está en: http://localhost:3003');

  } catch (error) {
    console.error('❌ Error general:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsersReal(); 