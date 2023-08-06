import User from "@/models/User";
import connect from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (request: NextApiRequest,
  res: NextApiResponse<any>) {
  const newPost = new User(JSON.parse(request.body));
  try {
    await connect();
    await newPost.save();
    return res.status(200).json({ success: "User signed up!" })
  } catch (err) {
    return res.status(500).json({ error: "User has not been created" })
  }
};