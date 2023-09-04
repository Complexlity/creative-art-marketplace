import supabaseClient from "~/../supabase";
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from "react";

const Supabase = () => {
  const [supabase, setSupabase] = useState<any>()
  const { getToken, userId } = useAuth()
  useEffect(() => {
      const getSupabase = async () => {
        const supabaseAccessToken = await getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        setSupabase(supabase)
      }
    getSupabase()
 }, [])
  return supabase
}
export default Supabase