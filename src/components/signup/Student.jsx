import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCollegeIdAndName, getDepartmentIdAndName, getCoursesIdAndName } from '@/supabase/getTableData';
import { studentSignup } from '@/supabase/auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SuccessToast } from '@/helper/SuccessToast';
import { ErrorToast } from '@/helper/ErrorToast';

function Student() {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGp, setBloodGp] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formatedDob = format(date, "yyyy-MM-dd")
    try {
      const data = {
        "full_name": name,
        "phone_no": phoneNo,
        "address": address,
        "email": email,
        "password": password,
        "blood_group": bloodGp,
        "course_id": selectedCourse,
        "college_id": selectedCollege,
        "dob": formatedDob,
        "department_id": selectedDepartment,
      }

      const res = await studentSignup(data)

      if(!res) return

      SuccessToast("Your profile is created!")
      navigate("/login")
    } catch (error) {
      console.error("STUDENT FORM ERROR:", error)
      ErrorToast("Profile creation failed!")
    }
  }

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  
  useEffect(() => {
    async function fetchColleges() {
      const collegesData = await getCollegeIdAndName();

      if(!collegesData) return

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
    async function fetchCourses() {
      if (!selectedCollege) return;
      const coursesData = await getCoursesIdAndName(selectedCollege, selectedDepartment);

      if(!coursesData) return
      
      setCourses(coursesData);
    }
    fetchCourses();
  }, [selectedDepartment]);

  useEffect(() => {
    document.title = 'Student - Create an account ';
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
            <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">Student Info</p>
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
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setPhoneNo(e.target.value)}
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
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Date of Birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base ${
                        !date ? 'text-gray-500' : ''
                      }`}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    side="bottom"
                    className="w-auto p-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg"
                    style={{ position: 'fixed' }}
                  >
                    <div
                      onKeyDown={(e) => {
                        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        captionLayout="dropdown"
                        initialFocus
                        className="rounded-xl text-gray-100 [&_.rdp-day]:text-gray-100 [&_.rdp-day:hover]:text-black [&_.rdp-nav_button]:text-gray-100 [&_.rdp-nav_button:hover]:bg-gray-700 [&_.rdp-day_selected]:bg-purple-600 [&_.rdp-day_selected]:text-white [&_.rdp-dropdown]:bg-gray-800 [&_.rdp-dropdown]:text-gray-100 [&_.rdp-dropdown]:hover:bg-gray-700"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blood" className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Blood Group
                </Label>
                <Input
                  id="blood"
                  type="text"
                  placeholder="A+, O-, B+"
                  required
                  value={bloodGp}
                  onChange={(e) => setBloodGp(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
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

                <div className="space-y-2">
                  <Label className="text-gray-200 text-xs sm:text-sm md:text-base">Courses</Label>
                  <Select onValueChange={setSelectedCourse} disabled={!selectedDepartment}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id}
                          className="text-gray-100 hover:bg-purple-700"
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm md:text-base py-2 sm:py-3">
                Create Account
              </Button>
              <p className="text-center text-gray-400 text-xs sm:text-sm md:text-base mt-3">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:underline">
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

export default Student;
