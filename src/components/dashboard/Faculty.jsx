import { getFacultyById } from "@/supabase/getTableData"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


function FacultyDashBoard() {
  const [faculty, setFaculty] = useState({})
  const authUser = useSelector((state)=> state.auth.data)

  useEffect(()=>{
    async function fetchFaculty() {
      try {
        const res = await getFacultyById({ "user_id": authUser.id})
        if(res != null){
          setFaculty(res)
        }
      } catch (error) {
        console.error("ERROR:", error)
        throw error
      }
    }
    fetchFaculty()
  }, [authUser])

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white">Faculty Page</h1>
      <h2 className="text-white">{faculty?.full_name}</h2>
      <p className="text-white text-xl font-bold">Faculty in progress.......</p>
    </div>
  )
}

export default FacultyDashBoard
