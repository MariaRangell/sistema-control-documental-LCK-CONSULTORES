import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    nombre_usuario: string;
    correo: string;
    rol: string;
    nombre_completo: string;
  };
}

interface JWTPayload {
  id: number;
  nombre_usuario: string;
  correo: string;
  rol: string;
  nombre_completo: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Token de acceso requerido'
      });
    }

    // Verificar token JWT
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'tu_clave_secreta'
    ) as JWTPayload;

    // Verificar que el usuario existe y está activo
    const usuario = await prisma.usuarios.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nombre_usuario: true,
        correo: true,
        nombre_completo: true,
        rol: true,
        activo: true,
        esta_online: true
      }
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'Usuario no encontrado'
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Cuenta desactivada'
      });
    }

    // Actualizar última actividad
    await prisma.usuarios.update({
      where: { id: usuario.id },
      data: {
        ultima_actividad: new Date()
      }
    });

    // Agregar información del usuario a la request
    req.user = {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
      nombre_completo: usuario.nombre_completo
    };

    next();

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }

    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuario no autenticado'
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        error: 'No tienes permisos para acceder a este recurso'
      });
    }

    next();
  };
}; 