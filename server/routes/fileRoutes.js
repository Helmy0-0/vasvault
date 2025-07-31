import express from 'express';
import upload from '../upload.js';
import authenticate from '../auth.js';
import {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile
} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/', authenticate, getFiles);
router.get('/:id', authenticate, downloadFile);
router.delete('/:id', authenticate, deleteFile);
  
export default router;