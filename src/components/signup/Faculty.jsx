import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCollegeIdAndName, getDepartmentIdAndName } from '@/supabase/getTableData';
import { facultySignup as authFacultySignup } from '@/supabase/auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { SuccessToast } from '@/helper/SuccessToast';
import { ErrorToast } from '@/helper/ErrorToast';

export default function Faculty() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const data = {
        "full_name": name,
        "phone_no": phoneNo,
        "address": address,
        "department_id": selectedDepartment,
        "college_id": selectedCollege,
        "email": email,
        "password": password,
      }

      const res = await authFacultySignup(data)

      if(!res) return

      SuccessToast("Your profile is created!")
      navigate("/login")
    } catch (error) {
      console.error("FACULTY FORM ERROR:", error)
      ErrorToast("Profile creation failed!")
    }
  }

  useEffect(() => {
    async function fetchColleges() {
      const collegesData = await getCollegeIdAndName();
      setColleges(collegesData);
    }
    fetchColleges();
  }, []);

  useEffect(() => {
    async function fetchDepartments() {
      if (!selectedCollege) return;
      const departmentsData = await getDepartmentIdAndName(selectedCollege);

      if(!departmentsData) return

      setDepartments(departmentsData);
    }
    fetchDepartments();
  }, [selectedCollege]);

  useEffect(() => {
    document.title = 'Faculty - Create an account ';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <Card className="bg-gray-900/70 border border-purple-700 shadow-2xl rounded-2xl w-full">
          <CardHeader className="text-center">
            <img
              src="/logo.png"
              alt="Vayuu Logo"
              className="mx-auto h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"
            />
            <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              Create an Account
            </p>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">Faculty Info</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Phone No.
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
                  value={phoneNo}
                  onChange={(e)=> setPhoneNo(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Your address here"
                  required
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label className="text-gray-200 text-xs sm:text-sm md:text-base">College</Label>
                  <Select onValueChange={setSelectedCollege}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Select a college" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                      {colleges.map((college) => (
                        <SelectItem
                          key={college.id}
                          value={college.id}
                          className="text-gray-100 hover:bg-purple-700"
                        >
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200 text-xs sm:text-sm md:text-base">
                    Department
                  </Label>
                  <Select onValueChange={setSelectedDepartment} disabled={!selectedCollege}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                      {departments.map((dept) => (
                        <SelectItem
                          key={dept.id}
                          value={dept.id}
                          className="text-gray-100 hover:bg-purple-700"
                        >
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm md:text-base py-2 sm:py-3">
                Create Account
              </Button>
              <p className="text-center text-gray-400 text-xs sm:text-sm md:text-base">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-500 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
