import conf from "@/conf/conf";
import { createClient } from "@supabase/supabase-js";
import generateId from "@/helper/generateId";
import client from "./supabaseClient";

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

async function facultySignup({ full_name, phone_no, address, email, password, college_id, department_id}) {
    let faculty_id = generateId("FT")
    try {
        const {data: authData, error: authError } = await client.auth.signUp({email, password, options: {
            data: { role: "faculty" }
        }})
        
        if (authError) throw authError

        const user = authData.user

        const { error: facultyError } = await client
        .from("Faculty")
        .insert([
            {
                user_id: user.id,
                college_id,
                department_id,
                full_name,
                phone_no,
                address,
                faculty_id,
            }
        ])

        if(facultyError) throw facultyError

        return user
    } catch (error) {
        console.error("FACULTY SIGNUP ERROR:", error)
        throw error
    }
}

async function studentSignup({ full_name, phone_no, address, dob, blood_group, course_id, college_id, department_id, email, password }) {
    let student_id = generateId("ST")
    try {
        const { data: authData, error: authError } = await client.auth.signUp({email, password, options: {
            data: { role: "student" }
        }})

        if(authError) throw authError

        const user = authData.user

        const { error: studentError } = await client
        .from("Students")
        .insert([
            {
                full_name,
                student_id,
                phone_no,
                address,
                dob,
                blood_group,
                course_id,
                user_id: user.id,
                college_id,
                department_id,
            }
        ])

        if(studentError) throw studentError

        return user
    } catch (error) {
        console.error("STUDENT SIGNUP ERROR:", error)
        throw error
    }
}

export {
    adminSignup,
    facultySignup,
    studentSignup,
}