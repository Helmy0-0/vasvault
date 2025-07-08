import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed },
    });

    res.status(201).json({ message: 'User registered' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
