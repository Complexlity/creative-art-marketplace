import { clerkClient } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server/clerkClient';
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  user?: User;
  message?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
   const userId = req.body
    const user = await clerkClient.users.getUser(userId)
   return res.status(200).json({ user: user })
  }
  return res.status(404).json({message: "Wrong Method"})
}