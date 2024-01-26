import { clerkClient } from '@clerk/nextjs'

import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { newUser } from '~/utils/types';






export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: newUser }>
) {

  if (req.method === 'POST') {
    const supabase = createPagesServerClient({ req, res })
    const userId = req.body as string
    let user = await clerkClient.users.getUser(userId)

    if (!user) {
      return res.status(404).json({
        user: {
          username: null,
          userId: '',
          imageUrl: '',
          userUrl: '',
          game_currency: null
        }
      })
    }

    const userUrl = user.username! + userId.slice(userId.length - 6)
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert(
        [{
          username: user.username!,
          imageUrl: user.imageUrl!,
          user_id: userId!,
          user_url: userUrl,
          game_currency: 1000
        }],
      )
      .select("*")



    return res.status(200).json({ user: newUser as unknown as newUser });
  }
}
