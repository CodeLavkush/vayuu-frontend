import { useSelector } from "react-redux"

function FacultyDashBoard() {
    const authUser = useSelector((state)=> state.auth.data)
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white">Faculty Page</h1>
      <h2 className="text-white">{authUser.email}</h2>
      <p className="text-white text-xl font-bold">Faculty in progress.......</p>
    </div>
  )
}

export default FacultyDashBoard
