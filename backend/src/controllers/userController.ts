import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { enviarEmail } from '../config/email';

const VALID_ROLES = ['admin','empresa','proveedor','rh','cliente','auditoria','user'] as const
const VALID_COMPANIES = ['empresa','cliente','proveedor'] as const

export const listUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      orderBy: { id: 'desc' },
      select: {
        id: true,
        nombre_usuario: true,
        correo: true,
        nombre_completo: true,
        rol: true,
        empresa_asignada: true,
        activo: true,
        email_verificado: true,
        ultimo_login: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
      }
    })
    return res.json({ usuarios })
  } catch (e) {
    console.error('Error listUsuarios:', e)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nombre_usuario, correo, nombre_completo, rol, empresa_asignada, activo } = req.body

    if (rol && !VALID_ROLES.includes(rol)) {
      return res.status(400).json({ error: 'Rol inválido' })
    }
    if (empresa_asignada && !VALID_COMPANIES.includes(empresa_asignada)) {
      return res.status(400).json({ error: 'Empresa asignada inválida' })
    }

    const updated = await prisma.usuarios.update({
      where: { id },
      data: {
        nombre_usuario,
        correo,
        nombre_completo,
        rol,
        empresa_asignada,
        activo,
        fecha_actualizacion: new Date(),
      }
    })
    return res.json({ message: 'Usuario actualizado', usuario: { id: updated.id } })
  } catch (e) {
    console.error('Error updateUsuario:', e)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await prisma.usuarios.delete({ where: { id } })
    return res.json({ message: 'Usuario eliminado' })
  } catch (e) {
    console.error('Error deleteUsuario:', e)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre_usuario, correo, nombre_completo, rol, empresa_asignada } = req.body;

    if (!nombre_usuario || !correo || !nombre_completo || !rol) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (!VALID_ROLES.includes(rol)) {
      return res.status(400).json({ error: 'Rol inválido' })
    }

    if (empresa_asignada && !VALID_COMPANIES.includes(empresa_asignada)) {
      return res.status(400).json({ error: 'Empresa asignada inválida' })
    }

    const existe = await prisma.usuarios.findFirst({ where: { OR: [{ nombre_usuario }, { correo }] } });
    if (existe) return res.status(409).json({ error: 'Usuario o correo ya existe' });

    // Obtener o crear empresa LCK por defecto
    const empresa = await prisma.empresa.upsert({
      where: { rfc: 'LCO131230GP5' },
      update: {},
      create: {
        nombre: 'LCK CONSULTORES S.A. DE C.V.',
        rfc: 'LCO131230GP5',
        domicilioFiscal: 'Querétaro, Qro.'
      }
    })

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpira = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Hash temporal para cumplir NOT NULL en `contrasena`
    const tempPasswordHash = await bcrypt.hash(crypto.randomBytes(12).toString('hex'), 10)

    const usuario = await prisma.usuarios.create({
      data: {
        nombre_usuario,
        correo,
        nombre_completo,
        rol,
        empresa_asignada: empresa_asignada ?? 'empresa',
        empresaId: empresa.id,
        activo: true,
        email_verificado: false,
        token_verificacion: token,
        token_expira: tokenExpira,
        contrasena: tempPasswordHash
      }
    });

    const activationLink = `${process.env.APP_URL || 'http://localhost:5173'}/establecer-contrasena?token=${token}`;

    let emailOk = false
    try {
      if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        emailOk = await enviarEmail(
          correo,
          'Activa tu cuenta y establece tu contraseña',
          `<p>Hola ${nombre_completo},</p>
           <p>Se creó una cuenta para ti en LCK CONSULTORES S.A. DE C.V.</p>
           <p>Haz clic en el siguiente enlace para establecer tu contraseña y activar tu cuenta:</p>
           <p><a href="${activationLink}">Establecer contraseña</a></p>
           <p>Este enlace expira en 24 horas.</p>`
        );
      }
    } catch (e) {
      emailOk = false
    }

    return res.status(201).json({ 
      message: emailOk ? 'Usuario creado. Se envió correo de activación.' : 'Usuario creado. No se pudo enviar correo, copia el enlace de activación.',
      id: usuario.id,
      activationLink,
      empresa: { id: empresa.id, nombre: empresa.nombre }
    });
  } catch (error) {
    console.error('Error crearUsuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const establecerContrasena = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token y contraseña son requeridos' });

    const usuario = await prisma.usuarios.findFirst({ where: { token_verificacion: token } });
    if (!usuario) return res.status(400).json({ error: 'Token inválido' });

    if (usuario.token_expira && usuario.token_expira < new Date()) {
      return res.status(400).json({ error: 'Token expirado' });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.usuarios.update({
      where: { id: usuario.id },
      data: {
        contrasena: hash,
        email_verificado: true,
        token_verificacion: null,
        token_expira: null,
        ultimo_login: new Date(),
      }
    });

    return res.json({ message: 'Contraseña establecida. Cuenta verificada.' });
  } catch (error) {
    console.error('Error establecerContrasena:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
