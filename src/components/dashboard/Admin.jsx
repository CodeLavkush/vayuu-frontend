import { getCollegeById } from "@/supabase/getTableData"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function AdminDashBoard() {
  const [college, setCollege] = useState(null)
  const authUser = useSelector((state)=> state.auth.data)
  useEffect(()=>{
    async function fetchCollege(){
      try {
        const res = await getCollegeById({ "user_id": authUser.id })
        if(res != null){
          setCollege(res)
        }
      } catch (error) {
        console.error("ERROR:", error)
        throw error
      }
    }
    fetchCollege()
  }, [authUser])

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white">Admin Page</h1>
        <h2 className="text-white">{college?.name}</h2>
        <p className="text-white text-xl font-bold">Admin Dashboard in progress.......</p>
    </div>
  )
}

export default AdminDashBoard
