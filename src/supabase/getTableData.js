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

async function getTableByUserId(tableName, user_id) {
        try {
        const {data, error} = await client
        .from(tableName)
        .select("*")
        .eq("user_id", user_id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error(`Error fetching ${tableName}:`, error)
        throw error
    }
}

async function getTableById(tableName, id) {
        try {
        const { data, error } = await client
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error(`Error fetching ${tableName}:`, error)
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

async function getTableInAscendingOrder(order_by, isAscending, tableName) {
    try {
        const { data, error } = await client
        .from(tableName)
        .select("*")
        .order(order_by, { ascending: isAscending})

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
    getTableByUserId,
    getTableById,
    getAllEntriesFromTable,
    getTableInAscendingOrder,
}