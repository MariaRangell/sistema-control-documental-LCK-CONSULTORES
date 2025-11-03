import { Router } from 'express';
import { crearUsuario, establecerContrasena, listUsuarios, updateUsuario, deleteUsuario } from '../controllers/userController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

// Solo admin puede crear usuarios
router.post('/', authenticateToken, authorizeRoles('admin'), crearUsuario);

// Listar usuarios (solo admin)
router.get('/', authenticateToken, authorizeRoles('admin'), listUsuarios);

// Actualizar usuario (solo admin)
router.patch('/:id', authenticateToken, authorizeRoles('admin'), updateUsuario);

// Eliminar usuario (solo admin)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteUsuario);

// Establecer contraseña y verificar cuenta (público con token)
router.post('/establecer-contrasena', establecerContrasena);

export default router;
