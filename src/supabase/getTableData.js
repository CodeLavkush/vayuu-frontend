import client from "./supabaseClient";

async function getCollegeIdAndName() {
    try {
        const {data, error} = await client
        .from("College")
        .select("id, name")
        .order("name", { ascending: true })

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching colleges:", error.message);
        throw error
    }
}

async function getDepartmentIdAndName(college_id) {
    try {
        const {data, error} = await client
        .from("Department")
        .select("id, name")
        .eq("college_id", college_id)
        .order("name", { ascending: true })

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching departments:", error.message);
        throw error
    }
}

async function getCoursesIdAndName(college_id, department_id) {
    try {
        const {data, error} = await client
        .from("Courses")
        .select("id, name")
        .eq("college_id", college_id)
        .eq("department_id", department_id)
        .order("name", { ascending: true })

        if (error) throw error

        return data
    } catch (error) {
        console.error("Error fetching courses:", error.message)
        throw error
    }
}

async function getAdminByUserId({user_id}) {
    try {
        const {data: adminData, error: adminError} = await client
        .from("Admin")
        .select("*")
        .eq("user_id", user_id)
        .single()

        if(adminError) throw adminError

        return adminData
    } catch (error) {
        console.error("Error fetching admin:", error)
        throw error
    }
}

async function getStudentByUserId({ user_id }) {
    try {
        const { data, error } = await client
        .from("Students")
        .select("*")
        .eq("user_id", user_id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching student:", error)
        throw error
    }
}

async function getFacultyByUserId({ user_id }) {
    try {
        const { data, error } = await client
        .from("Faculty")
        .select("*")
        .eq("user_id", user_id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching faculty:", error)
        throw error
    }
}

async function getDepartmentById(id) {
    try {
        const { data, error } = await client
        .from("Department")
        .select("*")
        .eq("id", id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching department:", error)
        throw error
    }
}

async function getCourseById(id) {
    try {
        const { data, error } = await client
        .from("Courses")
        .select("*")
        .eq("id", id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching course:", error)
        throw error
    }
}

async function getCollegeById(id) {
    try {
        const { data, error } = await client
        .from("College")
        .select("*")
        .eq("id", id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error("Error fetching college:", error)
        throw error
    }
}

async function getAllEntriesFromTable(tableName) {
    try {
        const { data, error } = await client
        .from(tableName)
        .select("*")

        if(error) throw error

        return data
    } catch (error) {
        console.error(`Error fetching ${tableName}:`, error)
        throw error
    }
}


export {
    getCollegeIdAndName,
    getDepartmentIdAndName,
    getCoursesIdAndName,
    getFacultyByUserId,
    getStudentByUserId,
    getAdminByUserId,
    getDepartmentById,
    getCourseById,
    getCollegeById,
    getAllEntriesFromTable,
}