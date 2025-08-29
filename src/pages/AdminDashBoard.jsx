import { NavDashboard } from '@/components'
import { Book, BookOpenCheck, CheckCheck, Flag, User, Users } from 'lucide-react'
import React, { useEffect } from 'react'

function AdminDashBoard() {
  useEffect(()=> {
    document.title = "Admin Dashboard - vayuu"
  }, [])
  const tiles = [
    { title: "Perosonal info", icon: User, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/info" },
    { title: "Departments", icon: Users, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/deparments" },
    { title: "Courses", icon: Book, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/courses" },
    { title: "Exams", icon: BookOpenCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/exams" },
    { title: "Results", icon: CheckCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/results" },
    { title: "Notice", icon: Flag, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/admin/notice" },
  ]

  return <NavDashboard tiles={tiles}/>
}

export default AdminDashBoard
