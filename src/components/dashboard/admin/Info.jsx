import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById, getTableByUserId } from '@/supabase/getTableData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogout } from '@/supabase/auth';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { addTableData } from '@/supabase/postTableData';
import { SuccessToast } from '@/helper/SuccessToast';
import { ErrorToast } from '@/helper/ErrorToast';
import { addDepartments as addDepartmentsSlice } from '@/store/departmentsSlice';
import { addCourses as addCoursesSlice } from '@/store/coursesSlice';

function Info() {
  const authUser = useSelector((state) => state.auth.data);
  const [departments, setDepartments] = useState([]);
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [department, setDepartment] = useState('')
  const [admin, setAdmin] = useState({});
  const [college, setCollege] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const departmentsState = useSelector((state)=> state.departments.data)
  const [selectedDepartment, setSelectedDepartment] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await getTableByUserId('Admin', authUser.id);
        const collegeData = await getTableById('College', adminData.college_id);
        if (adminData) {
          setAdmin(adminData);
          setCollege(collegeData);
        }
      } catch (error) {
        console.log('ERROR While fetching admin and college info');
        throw error;
      }
    }
    fetchData();
  }, [authUser]);

  const handleLogout = async () => {
    try {
      await authLogout();
      navigate('/login');
    } catch (error) {
      console.error('Error logout');
      throw error;
    }
  };

  const handleAddDepartment = async ()=>{
    try {
      const data = {
        "name": department,
        "college_id": college?.id,
      }
      const res = await addTableData("Department", data)
      if(res){
        dispatch(addDepartmentsSlice(res))
        setDepartments((depts)=> [...depts, res])
        SuccessToast("Department added!")
        setDepartment('')
      }
    } catch (error) {
      ErrorToast("Department cannot be added....")
      throw error
    }
  }

  const handleAddCourse = async ()=>{
    try {
      const department = departments.filter((dept)=> dept.name === selectedDepartment)
      const data = {
        "name": courseName,
        "code": courseCode,
        "department_id": department[0]?.id,
        "college_id": college?.id,
      }
      const res = await addTableData("Courses", data)
      if(res){
        dispatch(addCoursesSlice(res))
        SuccessToast("Course added!")
        setCourseName('')
        setCourseCode('')
        setSelectedDepartment('')
      }
    } catch (error) {
      ErrorToast("Course cannot be added....")
      throw error
    }
  }

  useEffect(()=> {
    setDepartments(departmentsState)
  }, [college, dispatch])

  return (
    <div className="bg-gray-900 min-h-screen w-screen flex flex-col items-center text-white p-4 gap-6 overflow-x-hidden">
      {/* Personal Info */}
      <Card className="w-full max-w-2xl max-h-screen overflow-y-auto bg-gray-800 text-white border-purple-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-2xl text-center md:text-left break-words">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-center items-center gap-4 w-full">
          {[
            { label: 'Admin ID', value: admin?.admin_id },
            { label: 'College Name', value: college?.name },
            { label: 'Reg. No.', value: college?.reg_no },
            { label: 'Phone No.', value: college?.phone_no },
            { label: 'Address', value: college?.address },
            { label: 'Email', value: college?.email },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row flex-1 gap-2 justify-between items-center w-full"
            >
              <Label className="w-full md:w-40 text-center md:text-left break-words">
                {item.label}
              </Label>
              <Input
                value={item.value || 'N/A'}
                disabled
                className="border-none w-full md:flex-1 min-w-0 truncate"
              />
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-800 cursor-pointer w-full md:w-auto"
            >
              Logout
            </Button>
            <div className="flex justify-center items-center gap-2 hover:underline hover:text-sky-500 cursor-pointer">
              <MoveLeft />
              <Link to="/dashboard/admin" className="text-sm font-bold">
                Back
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Add Department Form */}
      <Card className="w-full max-w-2xl bg-gray-800 text-white border-purple-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-2xl text-center md:text-left">
            Add Department
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form className="flex flex-col gap-2">
            <Label htmlFor="deptName">Department Name</Label>
            <Input
              id="deptName"
              placeholder="Enter department name"
              className="bg-gray-900 border-purple-700"
              value={department}
              onChange={(e)=> setDepartment(e.target.value)}
            />
          </form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={handleAddDepartment} className="bg-purple-700 hover:bg-purple-900">Add Department</Button>
        </CardFooter>
      </Card>

      {/* Add Courses Form */}
      <Card className="w-full max-w-2xl bg-gray-800 text-white border-purple-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-2xl text-center md:text-left">
            Add Courses
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e)=> setCourseName(e.target.value)}
              placeholder="Enter course name"
              className="bg-gray-900 border-purple-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              value={courseCode}
              onChange={(e)=> setCourseCode(e.target.value)}
              placeholder="Enter course code"
              className="bg-gray-900 border-purple-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="bg-gray-900 border-purple-700 text-white w-full max-w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-gray-800 border-purple-700 w-full max-w-[95vw] overflow-x-hidden text-white"
              >
                {departments?.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name} className="cursor-pointer">
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={handleAddCourse} className="bg-purple-700 hover:bg-purple-900">Add Course</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Info;
