import conf from "@/conf/conf";
import { createClient } from "@supabase/supabase-js";
import generateId from "helper/generateId";

const client = createClient(
    conf.supabaseProjectUrl,
    conf.supabaseApiKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        }
    }
)

async function adminSignup({ college_name, reg_no, phone_no, email, password, address  }) {
    let admin_id = generateId("AD")
    try {
        
        const { data: authData, error: authError } = await client.auth.signUp({email, password, options: {
            data: { role: "admin" }
        }})

        if (authError) throw authError

        const user = authData.user

        const { data: collegeData, error: collegeError} = await client
        .from("College")
        .insert([{ 
            name: college_name, 
            reg_no, 
            phone_no, 
            address, 
            email 
        }])
        .select()
        .single()

        if(collegeError) throw collegeError

        const { error: adminError} = await client
        .from("Admin")
        .insert([
            {
                user_id: user.id,
                admin_id,
                college_id: collegeData.id,
            }
        ])

        if(adminError) throw adminError

        return user
    } catch (error) {
        console.error("ADMIN SIGNUP ERROR:", error)
        throw error
    }
}

export {
    adminSignup,
}