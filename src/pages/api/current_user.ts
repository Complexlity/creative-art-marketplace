import { clerkClient } from '@clerk/nextjs'

import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'




type User = {
  username: string | null | undefined;
  userId: string | null | undefined;
  imageUrl: string | null | undefined;
  game_currency: number | null | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: User }>
) {

  if (req.method === 'POST') {
    const supabase = createPagesServerClient({ req, res })
    const userId = req.body
    let user = await clerkClient.users.getUser(userId)

    if (!user) {
      return res.status(404).json({
        user: {
          username: null,
          userId: '',
          imageUrl: '',
          game_currency: null
        }
      })
    }
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert(
        [{
          username: user.username!,
          imageUrl: user.imageUrl!,
          user_id: userId!,
          game_currency: 1000
        }],
      )
      .select("*")



    return res.status(200).json({ user: newUser as unknown as User });
  }
}
