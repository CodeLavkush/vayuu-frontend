import client from "./supabaseClient";

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
    addTableData,
}