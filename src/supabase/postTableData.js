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

async function addDepartment({ name, college_id }) {
    try {
        const { data, error } = await client
        .from("Department")
        .insert([
            {
                name, 
                college_id
            }
        ])
        .select()
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error inserting department")
        throw error
    }
}

async function addCourse({ name, code, college_id, department_id }) {
    try {
        const { data, error } = await client
        .from("Courses")
        .insert([
            {
                name,
                code,
                college_id,
                department_id,
            }
        ])
        .select()
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error inserting course")
        throw error
    }
}

async function addTableData(tableName, payload) {
    try {
        const { data, error } = await client
        .from(tableName)
        .insert([payload])
        .select()
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error(`Error inserting ${tableName}`)
    }
}

export {
    addNotice,
    addDepartment,
    addCourse,
    addTableData,
}