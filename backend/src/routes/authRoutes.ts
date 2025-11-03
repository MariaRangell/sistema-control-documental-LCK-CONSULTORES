import { Router, Request, Response } from 'express';
import { login, logout, profile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    nombre_usuario: string;
    correo: string;
    rol: string;
    nombre_completo: string;
  };
}

const router = Router();

// Ruta de login - no requiere autenticación
router.post('/login', login);

// Ruta de logout - requiere autenticación
router.post('/logout', authenticateToken, logout);

// Ruta para obtener perfil del usuario - requiere autenticación
router.get('/profile', authenticateToken, profile);

// Ruta para verificar si el token es válido
router.get('/verify', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'Token válido',
    user: req.user
  });
});

export default router; 