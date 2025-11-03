import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporter de nodemailer (SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  authMethod: 'LOGIN',
  logger: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP verify error:', err);
  } else {
    console.log('✅ SMTP listo para enviar correos');
  }
});

export const enviarEmail = async (
  destinatario: string,
  asunto: string,
  contenido: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"Sistema de Control Documental" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      html: contenido,
    });

    console.log('Email enviado:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
}; 