import bcrypt from 'bcryptjs';
import prisma from '../src/config/database';

async function createTestUsers() {
  try {
    console.log('🔧 Creando usuarios de prueba...');

    // Usuarios de prueba con contraseñas hasheadas
    const users = [
      {
        nombre_usuario: 'admin',
        correo: 'admin@lck.com',
        nombre_completo: 'Administrador Sistema',
  contrasena: await bcrypt.hash('admin123', 10),
        rol: 'admin' as const,
        activo: true
      },
      {
        nombre_usuario: 'rh',
        correo: 'rh@lck.com',
        nombre_completo: 'Recursos Humanos',
  contrasena: await bcrypt.hash('rh2024', 10),
        rol: 'rh' as const,
        activo: true
      },
      {
        nombre_usuario: 'empresa',
        correo: 'empresa@lck.com',
        nombre_completo: 'Empresa LCK',
  contrasena: await bcrypt.hash('emp2024', 10),
        rol: 'empresa' as const,
        empresa_asignada: 'empresa' as const,
        activo: true
      },
      {
        nombre_usuario: 'cliente',
        correo: 'cliente@lck.com',
        nombre_completo: 'Cliente Prueba',
  contrasena: await bcrypt.hash('cli2024', 10),
        rol: 'cliente' as const,
        empresa_asignada: 'cliente' as const,
        activo: true
      },
      {
        nombre_usuario: 'proveedor',
        correo: 'proveedor@lck.com',
        nombre_completo: 'Proveedor Prueba',
  contrasena: await bcrypt.hash('prov2024', 10),
        rol: 'proveedor' as const,
        empresa_asignada: 'proveedor' as const,
        activo: true
      },
      {
        nombre_usuario: 'auditoria',
        correo: 'auditoria@lck.com',
        nombre_completo: 'Auditoría LCK',
  contrasena: await bcrypt.hash('aud2024', 10),
        rol: 'auditoria' as const,
        activo: true
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
            data: user
          });
        } else {
          await prisma.usuarios.create({
            data: user
          });
          console.log(`✅ Usuario ${user.nombre_usuario} creado exitosamente`);
        }
      } catch (error) {
        console.error(`❌ Error creando usuario ${user.nombre_usuario}:`, error);
      }
    }

    console.log('\n🎉 Usuarios de prueba creados/actualizados exitosamente!');
    console.log('\n📋 Credenciales de prueba:');
    console.log('┌─────────────┬─────────────┬────────────┐');
    console.log('│ Usuario     │ Contraseña  │ Rol        │');
    console.log('├─────────────┼─────────────┼────────────┤');
    console.log('│ admin       │ admin123    │ admin      │');
    console.log('│ rh          │ rh2024      │ rh         │');
    console.log('│ empresa     │ emp2024     │ empresa    │');
    console.log('│ cliente     │ cli2024     │ cliente    │');
    console.log('│ proveedor   │ prov2024    │ proveedor  │');
    console.log('│ auditoria   │ aud2024     │ auditoria  │');
    console.log('└─────────────┴─────────────┴────────────┘');

  } catch (error) {
    console.error('❌ Error general:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers(); 