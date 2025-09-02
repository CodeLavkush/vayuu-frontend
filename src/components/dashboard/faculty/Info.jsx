import { getTableById, getTableByUserId } from '@/supabase/getTableData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogout } from '@/supabase/auth';

function Info() {
  const authUser = useSelector((state) => state.auth.data);
  const [faculty, setFaculty] = useState({});
  const [department, setDepartment] = useState({});
  const [college, setCollege] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const facultyData = await getTableByUserId("Faculty", authUser.id);
        const departmentData = await getTableById("Department", facultyData.department_id);
        const collegeData = await getTableById("College", facultyData.college_id);
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

  const handleLogout = async ()=>{
    try {
      await authLogout()
      navigate("/login")
    } catch (error) {
      console.error("Error logout")
      throw error
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen w-screen flex justify-center items-center flex-col text-white p-4">
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
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-800 cursor-pointer w-full md:w-auto">
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
    </div>
  );
}

export default Info;
