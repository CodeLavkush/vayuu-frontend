import conf from "@/conf/conf";
import { createClient } from "@supabase/supabase-js";
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

export {
    getCollegeIdAndName,
    getDepartmentIdAndName,
    getCoursesIdAndName,
}