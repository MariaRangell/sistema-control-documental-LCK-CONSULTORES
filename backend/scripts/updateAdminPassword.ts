import bcrypt from 'bcryptjs';
import prisma from '../src/config/database';

async function run() {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    const updated = await prisma.usuarios.updateMany({
      where: { nombre_usuario: 'admin' },
      data: { contrasena: hash, intentos_fallidos: 0, bloqueado_hasta: null }
    });
    console.log(`Actualizados: ${updated.count}`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
