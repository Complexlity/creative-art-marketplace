import { type User } from '@clerk/nextjs/dist/types/server/clerkClient';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react'

interface useCurrentUserProps {
  userId: string
}

const useCurrentUser= ({userId}: useCurrentUserProps) => {
  return useQuery({
    queryKey: [userId],
    queryFn: async () => {
      const res = await fetch("/api/current_user", {
        method: "POST",
        body: userId,
      });
      const result = await res.json()
      return result.user as User
    },
  });
}

export default useCurrentUser