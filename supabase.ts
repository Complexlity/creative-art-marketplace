// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://vtlfyyhidratdgjsnjha.supabase.co";
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
// console.log(supabaseKey)
// const supabase = createClient(supabaseUrl, supabaseKey);
// console.log(supabase)
import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = async (supabaseAccessToken: any) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};
export default supabaseClient