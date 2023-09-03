import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtlfyyhidratdgjsnjha.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
console.log(supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase)

export default supabase