import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { supabaseWithoutClient as supabase } from 'supabase';
import { Database } from 'supabase_types';
import { resourceLimits } from 'worker_threads';
import { User } from 'lucide-react';
type useCurrentUserProps =
  {
  userId?: string | null
  }

type User = {
  username: string | null,
  userId: string | null,
  imageUrl: string | null
}


const useCurrentUser = ({ userId }: useCurrentUserProps) => {
  let authUserId: string | null | undefined;
  if (!userId) {
    authUserId = useAuth().userId
  }
  const userOrAuthUserId = userId ?? authUserId

  const userName = (user: User) => user.username

  return useQuery({
    queryKey: [userOrAuthUserId],
    queryFn: async (): Promise<User> => {
      if (!userOrAuthUserId) {
        return {
          username: null,
          userId: null,
          imageUrl: null
        }
      }
      const { data: users, error: fetchError } = await supabase.from('users').select('*').eq('user_id', userOrAuthUserId)
      if (users && users.length > 0) {

        return users[0] as unknown as User

      }
      const res = await fetch("/api/current_user", {
        method: "POST",
        body: userId,
      });
      const result = await res.json()
      const user = result.user as User
      if (!user) return {
          username:null,
          userId: '',
          imageUrl: ''

      }
      if (authUserId) {
        const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert(
          [{ username :userName(user)!, imageUrl: user.imageUrl!, user_id: userOrAuthUserId! }],
        )
        .select("*")
        return newUser![0] as unknown as User
      }
      else {
        return {
          username:userName(user),
          userId: userOrAuthUserId,
          imageUrl: user.imageUrl
        }
      }
    }

  });
}

export default useCurrentUser