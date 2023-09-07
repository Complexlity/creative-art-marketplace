import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { supabaseWithoutClient as supabase } from 'supabase';
import { resourceLimits } from 'worker_threads';
interface useCurrentUserProps {
  userId?: string | null
}

type User = {
  username: string | null,
  userId: string | null,
  imageUrl: string | null
}


const useCurrentUser = ({ userId }: useCurrentUserProps) => {
  let authUserId: string | null | undefined;
  console.log(userId)
  if (!userId) {
    authUserId = useAuth().userId
  }
  const userOrAuthUserId = userId ?? authUserId
  const userName = (user: any) => user.username ?? user.firstName ?? user.lastName
  return useQuery({
    queryKey: [userOrAuthUserId],
    queryFn: async (): Promise<User> => {

      const { data: users, error: fetchError } = await supabase.from('users').select('*').eq('userId', userOrAuthUserId)
      console.log({users, fetchError})
      if (users && users.length > 0) {

        return users[0] as unknown as User

      }
      const res = await fetch("/api/current_user", {
        method: "POST",
        body: userId,
      });
      const result = await res.json()
      const user = result.user
      if (authUserId) {
        const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          { username :userName(user), imageUrl: user.imageUrl, userId: authUserId },
        ])
        .select("*")
        return newUser![0] as unknown as User
      }
      else {
        return {
          username:userName(user) ?? null,
          userId: userOrAuthUserId ?? null,
          imageUrl: user.imageUrl ?? null
        }
      }
    }

  });
}

export default useCurrentUser