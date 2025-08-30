import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function Courses() {
  const [courses, setCourses] = useState([]);
  const coursesState = useSelector((state) => state.courses.data);

  useEffect(() => {
    setCourses(coursesState);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Available Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-purple-400">{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">Code: {course.code}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No courses available yet!</p>
        )}
      </div>

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
