import { Link } from 'react-router-dom';
import { MoveLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Dock, Phone } from 'lucide-react';

function Students() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const coursesData = useSelector((state) => state.courses.data);
  const studentsData = useSelector((state) => state.students.data);
  const facultyData = useSelector((state) => state.faculty.data);
  const authUser = useSelector((state) => state.auth.data);

  useEffect(() => {
    setCourses(coursesData || []);
    setStudents(studentsData || []);
  }, [coursesData, studentsData]);

  const faculty = facultyData.filter((f) => f.user_id === authUser?.id);

  const filteredCourses = courses.filter(
    (course) => course.department_id === faculty[0]?.department_id
  );

  return (
    <div className="relative text-white bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex flex-col items-center w-full min-h-screen p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        My Department Courses & Students
      </h1>

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const courseStudents = students.filter(
              (student) => student.course_id === course.id
            );

            return (
              <Card
                key={course.id}
                className="bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition w-full p-4 flex flex-col"
              >
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-bold text-purple-300">
                    {course.name}{' '}
                    <span className="text-gray-400">({course.code})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {courseStudents.length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-200 flex-1 overflow-y-auto max-h-40">
                      {courseStudents.map((student) => (
                        <li
                          key={student.id}
                          onClick={() => setSelectedStudent(student)}
                          className="p-2 bg-gray-800 rounded-md hover:bg-purple-700 transition cursor-pointer"
                        >
                          {student.full_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">No students enrolled</p>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No courses available
          </p>
        )}
      </div>

      {/* Back button */}
      <div className="flex justify-center items-center gap-2 mt-8 hover:underline hover:text-sky-500 cursor-pointer">
        <MoveLeft />
        <Link to="/dashboard/faculty" className="text-sm sm:text-base font-bold">
          Back
        </Link>
      </div>

      {/* Floating Student Card */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
          <Card className="bg-gray-900 text-white max-w-md w-full rounded-xl shadow-xl relative">
            <Button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-purple-300">
                {selectedStudent.full_name || "N/A"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className='w-full gap-4 flex justify-items-start items-center'>
                <User/>
                <p>{selectedStudent.student_id || "N/A"}</p>
              </div>
              <div className='w-full gap-4 flex justify-items-start items-center'>
                <Phone/>
                {selectedStudent.phone_no || "N/A"}
              </div>
              <div className='w-full gap-4 flex justify-items-start items-center'>
                <Dock/>
                <p>{selectedStudent.dob || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Students;
