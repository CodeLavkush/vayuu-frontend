import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Subjects() {

  const authUser = useSelector((state)=> state.auth.data)
  const facultyState = useSelector((state)=> state.faculty.data)
  const subjectsState = useSelector((state)=> state.subjects.data)
  const departmentsState = useSelector((state)=> state.departments.data)
  const coursesState = useSelector((state)=> state.courses.data)
  const [subjects, setSubjects] = useState([])

  useEffect(()=>{
    const faculty = facultyState.filter((f)=> f.user_id === authUser.id)
    const department = departmentsState.filter((dept)=> dept.id === faculty[0]?.department_id)
    const course = coursesState.filter((c)=> c.department_id === department[0]?.id)
    const subjectsData = subjectsState.filter((s)=> s.course_id === course[0]?.id)
    setSubjects(subjectsData)
  }, [])


  return (
    <div className="bg-gray-900 min-h-screen w-screen flex flex-col items-center text-white p-4 gap-6">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
          Subjects
        </h1>
        <div className="flex justify-center items-center gap-2 hover:underline hover:text-sky-500 cursor-pointer">
          <MoveLeft />
          <Link to="/dashboard/faculty" className="text-sm font-bold">
            Back
          </Link>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((subj) => (
          <Card
            key={subj.id}
            className="bg-gray-800 border border-purple-700 rounded-xl shadow-lg hover:shadow-purple-900/40 transition-all duration-200"
          >
            <CardHeader>
              <CardTitle className="text-lg text-purple-200 sm:text-xl font-semibold truncate">
                {subj.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Code: {subj.code}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Subjects
