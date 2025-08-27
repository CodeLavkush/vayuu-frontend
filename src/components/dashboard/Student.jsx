import { useSelector } from 'react-redux'
import { getStudentById } from '@/supabase/getTableData'
import { useEffect, useState } from 'react'

function StudentDashBoard() {
  const [student, setStudent] = useState({})
  const authUser = useSelector((state)=> state.auth.data)

  useEffect(()=>{
    async function fetchStudent() {
      try {
        const res = await getStudentById({ "user_id": authUser.id })
        if(res != null){
          setStudent(res)
        }
      } catch (error) {
        console.error("ERROR:", error)
        throw error
      }
    }
    fetchStudent()
  }, [authUser])

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white">Student Page</h1>
        <h2 className="text-white">{student?.full_name}</h2>
        <p className="text-white text-xl font-bold">Student Dashboard in progress.......</p>
    </div>
  )
}

export default StudentDashBoard
