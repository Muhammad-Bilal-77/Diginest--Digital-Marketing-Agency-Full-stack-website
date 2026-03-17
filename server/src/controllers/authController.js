import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function login(req, res) {
  const { username, password } = req.body;

  if (username !== env.adminUsername || password !== env.adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", username: env.adminUsername },
    env.jwtSecret,
    { expiresIn: "7d" }
  );

  return res.json({ token });
}

export function me(_req, res) {
  return res.json({ ok: true });
}
