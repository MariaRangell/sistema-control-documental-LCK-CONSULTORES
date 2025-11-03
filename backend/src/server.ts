import app from './app';
import prisma from './config/database';

const PORT = process.env.PORT || 3002;

// Función para verificar la conexión a la base de datos
async function verificarConexionDB() {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida');
    // Asegurar empresa LCK por defecto
    await prisma.empresa.upsert({
      where: { rfc: 'LCO131230GP5' },
      update: {},
      create: {
        nombre: 'LCK CONSULTORES S.A. DE C.V.',
        rfc: 'LCO131230GP5',
        domicilioFiscal: 'Querétaro, Qro.'
      }
    });
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    console.log('\nPor favor, asegúrate de que:');
    console.log('1. PostgreSQL esté instalado y corriendo');
    console.log('2. La base de datos "sistema_control_documental" exista');
    console.log('3. Las credenciales en el archivo .env sean correctas\n');
    return false;
  }
}

// Iniciar el servidor
async function iniciarServidor() {
  const dbConectada = await verificarConexionDB();
  
  if (dbConectada) {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } else {
    console.log('❌ No se pudo iniciar el servidor debido a problemas con la base de datos');
    process.exit(1);
  }
}

iniciarServidor(); 