import { getTableById, getTableByUserId } from '@/supabase/getTableData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { authLogout } from '@/supabase/auth';
import { logout } from '@/store/authSlice';
import { useDispatch } from 'react-redux';

function Info() {
  const authUser = useSelector((state) => state.auth.data);
  const [student, setStudent] = useState({});
  const [department, setDepartment] = useState({});
  const [college, setCollege] = useState({});
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await getTableByUserId('Students', authUser.id);
        const collegeData = await getTableById('College', studentData.college_id);
        const departmentData = await getTableById('Department', studentData.department_id);
        const courseData = await getTableById('Courses', studentData.course_id);
        if (studentData) {
          setStudent(studentData);
          setCollege(collegeData);
          setDepartment(departmentData);
          setCourse(courseData);
        }
      } catch (error) {
        console.error('Error while fetching student info', error);
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

  return (
    <div className="bg-gray-900 min-h-screen w-screen flex justify-center items-center flex-col text-white p-4">
      <Card className="w-full max-w-2xl max-h-screen overflow-y-auto bg-gray-800 text-white border-purple-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-center md:text-left break-words">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-center items-center gap-4 w-full">
          {[
            { label: 'ID', value: student?.student_id },
            { label: 'Name', value: student?.full_name },
            { label: 'Phone No', value: student?.phone_no },
            { label: 'Address', value: student?.address },
            { label: 'Department', value: department?.name },
            { label: 'Course', value: course?.name },
            { label: 'College', value: college?.name },
            {
              label: 'DOB',
              value: student?.dob ? format(new Date(student.dob), 'dd-MM-yyyy') : 'N/A',
            },
            { label: 'Blood Group', value: student?.blood_group },
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
              <Link to="/dashboard/student" className="text-sm font-bold">
                Back
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Info;
