import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  DRIVE_ROOT_FOLDER_ID
} = process.env as Record<string, string>;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

if (GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
}

export function getAuthUrl(scope: 'drive' | 'drive.file' = 'drive') {
  const scopes = scope === 'drive'
    ? ['https://www.googleapis.com/auth/drive']
    : ['https://www.googleapis.com/auth/drive.file'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}

export async function setTokensByCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

export function getDrive() {
  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function listChildren(folderId?: string) {
  const drive = getDrive();
  const qFolder = `'${folderId || DRIVE_ROOT_FOLDER_ID}' in parents and trashed = false`;
  const res = await drive.files.list({
    q: qFolder,
    fields: 'files(id, name, mimeType, modifiedTime, size)'
  });
  return res.data.files || [];
}

export async function uploadSimple(filePath: string, fileName: string, parentId?: string) {
  const drive = getDrive();
  const fileMetadata = {
    name: fileName,
    parents: [parentId || DRIVE_ROOT_FOLDER_ID!]
  } as any;
  const media = {
    body: fs.createReadStream(filePath)
  } as any;
  const res = await drive.files.create({ requestBody: fileMetadata, media, fields: 'id, webViewLink, webContentLink' });
  return res.data;
}
