import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { getAuthUrl, setTokensByCode, listChildren } from '../services/drive';

const router = Router();

router.get('/auth', authenticateToken, authorizeRoles('admin'), (req: Request, res: Response) => {
  const url = getAuthUrl('drive');
  res.redirect(url);
});

router.get('/oauth2callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('Missing code');
  try {
    const tokens = await setTokensByCode(code);
    if (tokens.refresh_token) {
      const envPath = path.join(process.cwd(), '.env');
      const content = fs.readFileSync(envPath, 'utf8');
      if (!content.includes('GOOGLE_REFRESH_TOKEN=')) {
        fs.appendFileSync(envPath, `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
      }
    }
    return res.send('Autorización correcta. Ya puedes cerrar esta ventana.');
  } catch (e: any) {
    return res.status(500).send(`Error al intercambiar el código: ${e.message}`);
  }
});

router.get('/list', authenticateToken, authorizeRoles('admin'), async (req: Request, res: Response) => {
  try {
    const folderId = (req.query.folderId as string) || undefined;
    const files = await listChildren(folderId);
    res.json({ files });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
