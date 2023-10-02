// auth.ts

import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET as string;
export async function generateToken(payload: any) {
  const token = await new SignJWT({
    ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Set your own expiration time
    .sign(getJwtSecretKey());
  return token;
}
export function getJwtSecretKey() {
  if (!secret) throw new Error("JWT Secret key is not matched");
  return new TextEncoder().encode(secret);
}
export async function verifyToken(token: string) {
  try {
    const { payload } =  await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error: any) {
    return null; // Token is invalid or expired
  }
}
