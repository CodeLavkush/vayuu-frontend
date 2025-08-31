import client from "./supabaseClient";

async function deleteTableById(tableName, column, id) {
    try {
        const { data, error } = await client
        .from(tableName)
        .delete()
        .eq(column, id)
        .select()
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error(`Error deleting ${tableName}`)
        throw error
    }
}


export {
    deleteTableById,
}