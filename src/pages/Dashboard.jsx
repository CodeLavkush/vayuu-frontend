import { Outlet } from "react-router-dom"
import { getAllEntriesFromTable } from "@/supabase/getTableData"
import { useDispatch } from "react-redux"
import { setDepartments } from "@/store/departmentsSlice"
import { setCourses } from "@/store/coursesSlice"
import { setExams } from "@/store/examsSlice"
import { setFaculty } from "@/store/facultySlice"
import { setMarks } from "@/store/marksSlice"
import { setResults } from "@/store/resultsSlice"
import { setStudents } from "@/store/studentsSlice"
import { setSubjects } from "@/store/subjectsSlice"
import { setNotice } from "@/store/noticeSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react"

function Dashboard() {

  const authUser = useSelector((state)=> state.auth.data)
  const tableNames = ["Students", "Faculty", "Courses", "Department", "Marks", "Results", "Subjects", "Exams", "Notice"]
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchData() {
      try {
        for(let i = 0; i <= tableNames.length; i++){
          const res = await getAllEntriesFromTable(tableNames[i])

          if(!res) throw "Cannot get response"

          if(tableNames[i] === "Students"){
            dispatch(setStudents(res))
          }
          else if(tableNames[i] === "Faculty"){
            dispatch(setFaculty(res))
          }
          else if(tableNames[i] === "Courses"){
            dispatch(setCourses(res))
          }
          else if(tableNames[i] === "Department"){
            dispatch(setDepartments(res))
          }
          else if(tableNames[i] === "Marks"){
            dispatch(setMarks(res))
          }
          else if(tableNames[i] === "Results"){
            dispatch(setResults(res))
          }
          else if(tableNames[i] === "Subjects"){
            dispatch(setSubjects(res))
          }
          else if(tableNames[i] === "Exams"){
            dispatch(setExams(res))
          }
          else if(tableNames[i] === "Notice"){
            dispatch(setNotice(res))
          }
        }
      } catch (error) {
        console.error("Error fetching table data")
        throw error
      }
    }
    fetchData()
  }, [authUser])

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Dashboard
