import bcrypt from 'bcryptjs';
import prisma from '../src/config/database';

async function createUsersDocumental() {
  try {
    console.log('🔧 Creando usuarios de prueba en la BD sistema_control_documental...');

    // Usuarios de prueba con todos los roles
    const users = [
      {
        nombre_usuario: 'admin',
        correo: 'admin@lck.com',
        nombre_completo: 'Administrador Sistema',
  contrasena: await bcrypt.hash('admin123', 10),
        rol: 'admin' as const,
        empresa_asignada: 'empresa' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'empresa1',
        correo: 'empresa@lck.com',
        nombre_completo: 'Usuario Empresa',
  contrasena: await bcrypt.hash('emp123', 10),
        rol: 'empresa' as const,
        empresa_asignada: 'empresa' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'rh1',
        correo: 'rh@lck.com',
        nombre_completo: 'Recursos Humanos',
  contrasena: await bcrypt.hash('rh2024', 10),
        rol: 'rh' as const,
        empresa_asignada: 'empresa' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'cliente1',
        correo: 'cliente@lck.com',
        nombre_completo: 'Cliente Prueba',
  contrasena: await bcrypt.hash('cli2024', 10),
        rol: 'cliente' as const,
        empresa_asignada: 'cliente' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'proveedor1',
        correo: 'proveedor@lck.com',
        nombre_completo: 'Proveedor Prueba',
  contrasena: await bcrypt.hash('prov2024', 10),
        rol: 'proveedor' as const,
        empresa_asignada: 'proveedor' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'auditoria1',
        correo: 'auditoria@lck.com',
        nombre_completo: 'Auditoría LCK',
  contrasena: await bcrypt.hash('aud2024', 10),
        rol: 'auditoria' as const,
        empresa_asignada: 'empresa' as const,
        activo: true,
        email_verificado: true
      },
      {
        nombre_usuario: 'usuario1',
        correo: 'usuario@lck.com',
        nombre_completo: 'Usuario Normal',
  contrasena: await bcrypt.hash('user123', 10),
        rol: 'user' as const,
        empresa_asignada: 'empresa' as const,
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

    console.log('\n🎉 Usuarios de prueba creados en sistema_control_documental!');
    console.log('\n📋 Credenciales de prueba:');
    console.log('┌──────────────┬─────────────┬───────────────┬──────────────────────┐');
    console.log('│ Usuario      │ Contraseña  │ Rol           │ Empresa              │');
    console.log('├──────────────┼─────────────┼───────────────┼──────────────────────┤');
    console.log('│ admin        │ admin123    │ admin         │ empresa              │');
    console.log('│ empresa1     │ emp123      │ empresa       │ empresa              │');
    console.log('│ rh1          │ rh2024      │ rh            │ empresa              │');
    console.log('│ cliente1     │ cli2024     │ cliente       │ cliente              │');
    console.log('│ proveedor1   │ prov2024    │ proveedor     │ proveedor            │');
    console.log('│ auditoria1   │ aud2024     │ auditoria     │ empresa              │');
    console.log('│ usuario1     │ user123     │ user          │ empresa              │');
    console.log('└──────────────┴─────────────┴───────────────┴──────────────────────┘');

    console.log('\n🔗 Para probar:');
    console.log('1. Ve a: http://localhost:5173');
    console.log('2. Usa cualquiera de las credenciales de arriba');
    console.log('3. Verás menús diferentes según tu rol');

  } catch (error) {
    console.error('❌ Error general:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsersDocumental();
