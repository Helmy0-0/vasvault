import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed },
    });

    res.status(201).json({ message: "User registered" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsersId = async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id),  },
      include: {
        files: true,
      },
    });
    if (!users) return res.status(404).json({ message: "User not found" });

    res.json({
      id: users.id,
      email: users.email,
      files: users.files,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
