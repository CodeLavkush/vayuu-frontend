import conf from "@/conf/conf";
import { createClient } from "@supabase/supabase-js";


const client = createClient(
    conf.supabaseProjectUrl,
    conf.supabaseApiKey,
)

export default client