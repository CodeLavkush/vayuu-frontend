import client from "./supabaseClient";

async function addNotice({title, content, admin_id, faculty_id, college_id}) {
    try {
        const { data, error } = await client
        .from("Notice")
        .insert([
            {
                title,
                content,
                admin_id,
                faculty_id,
                college_id,
            }
        ])
        .select()
        .single()

        if(error) throw error

        return data

    } catch (error) {
        console.error("Error sending notice")
        throw error
    }
}

export {
    addNotice,
}