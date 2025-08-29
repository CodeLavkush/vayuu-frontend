import { NavDashboard } from '@/components'
import React from 'react'
import { useEffect } from 'react'
import { Book, BookOpenCheck, CheckCheck, Flag, User } from 'lucide-react'

function StudentDashboard() {
  useEffect(()=> {
    document.title = "Student Dashboard - vayuu"
  }, [])

  const tiles = [
    { title: "Perosonal info", icon: User, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/student/info" },
    { title: "Subjects", icon: Book, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/student/subjects" },
    { title: "Exams", icon: BookOpenCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/student/exams" },
    { title: "Results", icon: CheckCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/student/results" },
    { title: "Notice", icon: Flag, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/student/notice" },
  ]

  return <NavDashboard tiles={tiles}/>
}

export default StudentDashboard
