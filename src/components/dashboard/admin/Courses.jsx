import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const coursesState = useSelector((state) => state.courses.data);
  const subjectsState = useSelector((state) => state.subjects.data);

  useEffect(() => {
    setSubjects(subjectsState);
    setCourses(coursesState);
  }, [coursesState, subjectsState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Available Courses</h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card
              key={course.id}
              className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-purple-400">
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">Code: {course.code}</p>

                {/* Subjects Section */}
                <div className="bg-gray-900 rounded-lg p-3 border border-purple-700">
                  <h2 className="text-sm sm:text-base font-semibold text-purple-300 mb-2">
                    Subjects
                  </h2>
                  {subjects.some((s) => s.course_id === course.id) ? (
                    <ul className="space-y-2">
                      {subjects
                        .filter((subject) => subject.course_id === course.id)
                        .map((subject) => (
                          <li
                            key={subject.id}
                            className="bg-gray-800 rounded-md px-3 py-2 border border-gray-700 text-sm flex justify-between items-center hover:bg-gray-700 transition"
                          >
                            <span className="text-white truncate">{subject.name}</span>
                            <span className="text-xs text-gray-400 ml-2">({subject.code})</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No subjects available yet!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No courses available yet!</p>
        )}
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

export default Courses;
