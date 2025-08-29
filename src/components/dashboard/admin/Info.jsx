import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCollegeById, getAdminByUserId } from '@/supabase/getTableData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Info() {
  const authUser = useSelector((state) => state.auth.data);
  const [admin, setAdmin] = useState({});
  const [college, setCollege] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await getAdminByUserId({ user_id: authUser.id });
        const collegeData = await getCollegeById(adminData.college_id);
        if (adminData != null) {
          setAdmin(adminData);
          setCollege(collegeData);
        }
      } catch (error) {
        console.log('ERROR While fetching admin info');
        throw error;
      }
    }
    fetchData();
  }, [authUser]);

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
            <Button className="bg-red-600 hover:bg-red-800 cursor-pointer w-full md:w-auto">
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
    </div>
  );
}

export default Info;
