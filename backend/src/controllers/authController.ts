import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

interface LoginRequest extends Request {
  body: {
    correo?: string;
    nombre_usuario?: string;
    password: string;
  };
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    nombre_usuario: string;
    correo: string;
    rol: string;
  };
}

export const login = async (req: LoginRequest, res: Response) => {
  try {
    const { correo, nombre_usuario, password } = req.body;

    // Validar que se proporcione correo o nombre_usuario
    if (!correo && !nombre_usuario) {
      return res.status(400).json({
        error: 'Debes proporcionar correo o nombre de usuario'
      });
    }

    if (!password) {
      return res.status(400).json({
        error: 'La contraseña es requerida'
      });
    }

    // Buscar usuario por correo o nombre_usuario
    const usuario = await prisma.usuarios.findFirst({
      where: {
        OR: [
          { correo: correo },
          { nombre_usuario: nombre_usuario }
        ]
      }
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Cuenta desactivada. Contacta al administrador'
      });
    }

    // Verificar si el usuario está bloqueado
    if (usuario.bloqueado_hasta && usuario.bloqueado_hasta > new Date()) {
      return res.status(401).json({
        error: 'Cuenta bloqueada temporalmente. Intenta más tarde'
      });
    }

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(password, usuario.contrasena as string);

    if (!isValidPassword) {
      // Incrementar intentos fallidos
      await prisma.usuarios.update({
        where: { id: usuario.id },
        data: {
          intentos_fallidos: usuario.intentos_fallidos + 1,
          fecha_ultimo_intento: new Date(),
          // Bloquear cuenta después de 5 intentos fallidos por 30 minutos
          bloqueado_hasta: usuario.intentos_fallidos >= 4 
            ? new Date(Date.now() + 30 * 60 * 1000) 
            : undefined
        }
      });

      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Obtener información del navegador y IP
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip || req.connection.remoteAddress || '';

    // Actualizar información de login exitoso
    await prisma.usuarios.update({
      where: { id: usuario.id },
      data: {
        ultimo_login: new Date(),
        intentos_fallidos: 0,
        bloqueado_hasta: null,
        esta_online: true,
        ultima_actividad: new Date(),
        ip_ultima_conexion: ip,
        navegador_ultima_conexion: userAgent
      }
    });

    // Generar JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        nombre_completo: usuario.nombre_completo
      },
      process.env.JWT_SECRET || 'tu_clave_secreta',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        nombre_completo: usuario.nombre_completo,
        rol: usuario.rol,
        empresa_asignada: usuario.empresa_asignada,
        ultima_actividad: usuario.ultima_actividad
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user) {
      // Actualizar estado online del usuario
      await prisma.usuarios.update({
        where: { id: req.user.id },
        data: {
          esta_online: false,
          ultima_actividad: new Date()
        }
      });
    }

    res.json({
      message: 'Logout exitoso'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

export const profile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuario no autenticado'
      });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nombre_usuario: true,
        correo: true,
        nombre_completo: true,
        rol: true,
        empresa_asignada: true,
        activo: true,
        ultimo_login: true,
        ultima_actividad: true,
        email_verificado: true
      }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      user: usuario
    });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
}; 