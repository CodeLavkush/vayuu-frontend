import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, House, MoveLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getTableByUserId } from '@/supabase/getTableData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { addTableData } from '@/supabase/postTableData';
import { addExams } from '@/store/examsSlice';
import { SuccessToast } from '@/helper/SuccessToast';
import { ErrorToast } from '@/helper/ErrorToast';
import { Calendar } from '@/components/ui/calendar';

function Exams() {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(null);
  const [examType, setExamType] = useState('');
  const [duration, setDuration] = useState('');
  const [room, setRoom] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const authUser = useSelector((state) => state.auth.data);
  const departmentsSlice = useSelector((state) => state.departments.data);
  const coursesSlice = useSelector((state) => state.courses.data);
  const subjectsSlice = useSelector((state) => state.subjects.data);
  const [admin, setAdmin] = useState(null);
  const [exams, setExams] = useState([]);
  const examsSlice = useSelector((state) => state.exams.data);
  const dispatch = useDispatch();

  const handleAddExam = async (e) => {
    e.preventDefault();
    const formetedDate = format(date, 'yyyy-MM-dd');
    try {
      const data = {
        type: examType,
        date: formetedDate,
        duration: duration,
        room: room,
        subject_id: selectedSubject,
        college_id: admin.college_id,
      };

      const res = await addTableData('Exams', data);

      if(!res) return
      setExams(res);
      dispatch(addExams(res));
      SuccessToast('Exam has been declared!');

    } catch (error) {
      ErrorToast('Failed to declare exam');
      console.error("ERROR:", error)
    } finally {
      setExamType('');
      setDuration('');
      setRoom('');
      setSelectedDepartment('');
      setSelectedCourse('');
      setSelectedSubject('');
      setDate(null);
    }
  };

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await getTableByUserId('Admin', authUser.id);

        if(!adminData) return

        setAdmin(adminData);
        const departmentsData = departmentsSlice.filter(
          (dept) => dept.college_id === adminData?.college_id
        );
        setDepartments(departmentsData);
      } catch (error) {
        console.error("ERROR:", error)
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const coursesData = coursesSlice.filter((c) => c.department_id === selectedDepartment);
    setCourses(coursesData);
  }, [selectedDepartment]);

  useEffect(() => {
    const subjectsData = subjectsSlice.filter((s) => s.course_id === selectedCourse);
    setSubjects(subjectsData);
  }, [selectedCourse]);

  useEffect(() => {
    setExams(examsSlice);
  }, [examsSlice]);

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex flex-col justify-center items-center text-white p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Exam Form */}
        <Card className="w-full bg-gray-800 text-white border-purple-700 rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-center lg:text-left">
              Add Exam
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAddExam} className="flex flex-col gap-4">
              {/* Exam Type */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="examType">Type</Label>
                <Input
                  id="examType"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  placeholder="Enter exam type (e.g., Midterm, Final)"
                  className="bg-gray-900 border-purple-700"
                />
              </div>

              {/* Exam Date */}
              <div className="space-y-2">
                <Label className="text-gray-200 text-xs sm:text-sm md:text-base">Exam Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base ${
                        !date ? 'text-gray-500' : ''
                      }`}
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
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleSelect}
                      captionLayout="dropdown"
                      initialFocus
                      className="rounded-xl text-gray-100 [&_.rdp-day]:text-gray-100 [&_.rdp-day:hover]:text-black [&_.rdp-nav_button]:text-gray-100 [&_.rdp-nav_button:hover]:bg-gray-700 [&_.rdp-day_selected]:bg-purple-600 [&_.rdp-day_selected]:text-white [&_.rdp-dropdown]:bg-gray-800 [&_.rdp-dropdown]:text-gray-100 [&_.rdp-dropdown]:hover:bg-gray-700"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter duration (e.g., 2 hours)"
                  className="bg-gray-900 border-purple-700"
                />
              </div>

              {/* Room */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Enter room number"
                  className="bg-gray-900 border-purple-700"
                />
              </div>

              {/* Department, Course, Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Departments */}
                <div className="space-y-2">
                  <Label>Departments</Label>
                  <Select onValueChange={setSelectedDepartment}>
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

                {/* Courses */}
                <div className="space-y-2">
                  <Label>Courses</Label>
                  <Select onValueChange={setSelectedCourse} disabled={!selectedDepartment}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                      {courses.map((c) => (
                        <SelectItem
                          key={c.id}
                          value={c.id}
                          className="text-gray-100 hover:bg-purple-700"
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subjects */}
                <div className="space-y-2 sm:col-span-2">
                  <Label>Subjects</Label>
                  <Select onValueChange={setSelectedSubject} disabled={!selectedCourse}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                      {subjects.map((s) => (
                        <SelectItem
                          key={s.id}
                          value={s.id}
                          className="text-gray-100 hover:bg-purple-700"
                        >
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={handleAddExam} className="bg-purple-700 cursor-pointer hover:bg-purple-900">
              Add Exam
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column: Scheduled Exams */}
        <div className="w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center lg:text-left">
            Scheduled Exams
          </h2>
          {exams.length > 0 ? (
            <div className="flex flex-col gap-4">
              {exams.map((exam) => (
                <Card key={exam.id} className="bg-gray-800 border border-purple-700 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-purple-400">{exam.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-300">
                    <div className='flex gap-2 justify-items-start items-center'>
                      <CalendarIcon/>
                      <p>{format(new Date(exam.date), 'dd-MM-yyyy')}</p>
                    </div>
                    <div className='flex gap-2 justify-items-start items-center'>
                      <Clock/>
                      <p>{exam.duration}</p>
                    </div>
                    <div className='flex gap-2 justify-items-start items-center'>
                      <House/>
                      <p>{exam.room}</p>
                    </div>
                    <div className='flex gap-2 justify-items-start items-center'>
                      <Book/>
                      <p>{subjectsSlice.find((s) => s.id === exam.subject_id)?.name || 'N/A'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center lg:text-left">No exams scheduled yet.</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center items-center gap-2 mt-6 hover:underline hover:text-sky-500 cursor-pointer">
        <MoveLeft />
        <Link to="/dashboard/admin" className="text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Exams;
