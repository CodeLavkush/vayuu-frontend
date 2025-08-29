import { useEffect } from 'react'
import { NavDashboard } from '@/components'
import { Book, BookOpenCheck, CheckCheck, Flag, User, Users } from 'lucide-react'

function FacultyDashboard() {
  useEffect(()=> {
    document.title = "Faculty Dashboard - vayuu"
  }, [])

  const tiles = [
    { title: "Perosonal info", icon: User, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/info" },
    { title: "Students", icon: Users, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/students" },
    { title: "Subjects", icon: Book, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/subjects" },
    { title: "Exams", icon: BookOpenCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/exams" },
    { title: "Results", icon: CheckCheck, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/results" },
    { title: "Notice", icon: Flag, gradient: "bg-gradient-to-br from-gray-600 to-gray-900", link: "/dashboard/faculty/notice" },
  ]
  return <NavDashboard tiles={tiles}/>
}

export default FacultyDashboard
