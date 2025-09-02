import { getTableById, getTableByUserId } from '@/supabase/getTableData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogout } from '@/supabase/auth';
import { addTableData } from '@/supabase/postTableData';
import { addSubjects as addSubjectsSlice } from '@/store/subjectsSlice';
import { SuccessToast } from '@/helper/SuccessToast';
import { ErrorToast } from '@/helper/ErrorToast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

function Info() {
  const authUser = useSelector((state) => state.auth.data);
  const [faculty, setFaculty] = useState({});
  const [department, setDepartment] = useState({});
  const [college, setCollege] = useState({});
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const coursesState = useSelector((state)=> state.courses.data)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [courses, setCourses] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const facultyData = await getTableByUserId('Faculty', authUser.id);
        const departmentData = await getTableById('Department', facultyData.department_id);
        const collegeData = await getTableById('College', facultyData.college_id);
        if (facultyData) {
          setDepartment(departmentData);
          setFaculty(facultyData);
          setCollege(collegeData);
        }
      } catch (error) {
        console.error('ERROR while fetching info');
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

  const handleAddSubject = async () => {
    try {
      const course = courses.filter((c)=> c.name === selectedCourse)
      const data = {
        "name": subjectName,
        "code": subjectCode,
        "course_id": course[0]?.id,
        "faculty_id": faculty?.id,
        "college_id": college?.id,
      }
      const res = await addTableData("Subjects", data)
      if(res){
        dispatch(addSubjectsSlice(res))
        SuccessToast("Subject Added!")
        setSubjectCode('')
        setSubjectName('')
        setSelectedCourse('')
      }
    } catch (error) {
      ErrorToast("Subject cannot be added....")
      throw error;
    }
  };

  useEffect(()=>{
    setCourses(coursesState)
  }, [])

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
            { label: 'ID', value: faculty?.faculty_id },
            { label: 'Name', value: faculty?.full_name },
            { label: 'Phone No', value: faculty?.phone_no },
            { label: 'Address', value: faculty?.address },
            { label: 'Department', value: department?.name },
            { label: 'College', value: college?.name },
            { label: 'Email', value: authUser?.user_metadata?.email },
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
              <Link to="/dashboard/faculty" className="text-sm font-bold">
                Back
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Add Subject Card */}
      <Card className="w-full max-w-2xl bg-gray-800 text-white border-purple-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-2xl text-center md:text-left">
            Add Subject
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="subjectName">Subject Name</Label>
            <Input
              id="subjectName"
              placeholder="Enter subject name"
              className="bg-gray-900 border-purple-700"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="subjectCode">Subject Code</Label>
            <Input
              id="subjectCode"
              placeholder="Enter subject code"
              className="bg-gray-900 border-purple-700"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Courses</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="bg-gray-900 border-purple-700 text-white w-full max-w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-gray-800 border-purple-700 w-full max-w-[95vw] overflow-x-hidden text-white"
              >
                {courses?.map((course) => (
                  <SelectItem key={course.id} value={course.name} className="cursor-pointer">
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={handleAddSubject}
            className="bg-purple-700 hover:bg-purple-900"
          >
            Add Subject
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Info;
