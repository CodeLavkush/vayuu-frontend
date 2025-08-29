import React from 'react'
import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

function Results() {
  return (
    <div className='text-2xl text-white bg-gray-800 flex flex-col gap-4 justify-center items-center w-screen h-screen'>
      <h1>Coming soon....</h1>
      <div className="flex justify-center items-center gap-2 hover:underline hover:text-sky-500 cursor-pointer">
        <MoveLeft />
        <Link to="/dashboard/admin" className="text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  )
}

export default Results
