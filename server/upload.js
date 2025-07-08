import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.pdf', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  },
});

export default upload;
