import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;

    const saved = await prisma.file.create({
      data: {
        filename: file.originalname,
        filepath: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        userId,
      },
    });

    res.status(201).json(saved);
  } catch {
    res.status(500).json({ message: 'Upload failed' });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: req.user.id },
      orderBy: { uploadedAt: 'desc' },
    });
    res.json(files);
  } catch {
    res.status(500).json({ message: 'Failed to fetch files' });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!file || file.userId !== req.user.id)
      return res.status(403).json({ message: 'Access denied' });

    const filepath = path.join(process.cwd(), 'uploads', file.filepath);
    res.download(filepath, file.filename);
  } catch {
    res.status(500).json({ message: 'Download failed' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!file || file.userId !== req.user.id)
      return res.status(403).json({ message: 'Access denied' });

    const filepath = path.join(process.cwd(), 'uploads', file.filepath);
    fs.unlinkSync(filepath);

    await prisma.file.delete({ where: { id: file.id } });

    res.json({ message: 'File deleted' });
  } catch {
    res.status(500).json({ message: 'Delete failed' });
  } 
};

