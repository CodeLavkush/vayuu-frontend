import { useSelector } from "react-redux"

function AdminDashBoard() {
    const authUser = useSelector((state)=> state.auth.data)
  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white">Admin Page</h1>
        <h2 className="text-white">{authUser.email}</h2>
        <p className="text-white text-xl font-bold">Admin Dashboard in progress.......</p>
    </div>
  )
}

export default AdminDashBoard
