import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { User, IdCard, Dock, Phone, MapPin, Mail } from 'lucide-react';

function Departments() {
  const departmentsState = useSelector((state) => state.departments.data);
  const facultyState = useSelector((state) => state.faculty.data);
  const studentsState = useSelector((state) => state.students.data);

  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    setDepartments(departmentsState);
    setStudents(studentsState);
    setFaculty(facultyState);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white p-4 sm:p-6 md:p-10 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">Departments</h1>

      {selectedPerson && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 p-4">
          <Card className="relative bg-gray-800 border border-purple-500 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg">
            <Button
              onClick={() => setSelectedPerson(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
            >
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-purple-300">
                {selectedPerson.type === 'student' ? 'Student Details' : 'Faculty Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-200 text-sm sm:text-base">
              <p className='flex justify-items-start items-start gap-2 w-full'>
                <User/>
                <p>{selectedPerson.full_name || "NA"} </p>
              </p>
              {selectedPerson.type === 'student' ? (
                <p className='flex justify-items-start items-start gap-2 w-full'>
                  <IdCard/>
                  <p>{selectedPerson.student_id || "NA"} </p>
                </p>
              ) : (
                <p className='flex justify-items-start items-start gap-2 w-full'>
                  <IdCard/>
                  <p>{selectedPerson.faculty_id || "NA"} </p>
                </p>
              )}
              <p className='flex justify-items-start items-start gap-2 w-full'>
                <Dock/>
                <p>{selectedPerson.department_name || "NA"} </p>
              </p>
              <p className='flex justify-items-start items-start gap-2 w-full'>
                <Phone/>
                <p>{selectedPerson.phone_no || "NA"} </p>
              </p>
              <p className='flex justify-items-start items-start gap-2 w-full'>
                <MapPin/>
                <p>{selectedPerson.address || "NA"} </p>
              </p>
              {selectedPerson.email && (
                <p className='flex justify-items-start items-start gap-2 w-full'>
                  <Mail/>
                  <p>{selectedPerson.email || "NA"} </p>
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {departments && departments.length > 0 ? (
          departments.map((department) => {
            const departmentStudents = students.filter((s) => s.department_id === department.id);
            const departmentFaculty = faculty.filter((f) => f.department_id === department.id);

            return (
              <Card
                key={department.id}
                className="bg-gray-800 border border-purple-600 rounded-xl shadow-md hover:shadow-xl hover:border-purple-400 transition duration-300 ease-in-out"
              >
                <CardHeader className="p-4 text-center">
                  <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-purple-300">
                    {department.name}
                  </CardTitle>
                </CardHeader>

                <div className="px-4 pb-4">
                  <Accordion type="multiple" collapsible>
                    {/* Students */}
                    <AccordionItem
                      value={`students-${department.id}`}
                      className="border-b border-purple-700"
                    >
                      <AccordionTrigger className="text-purple-300">
                        Students ({departmentStudents.length})
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {departmentStudents.length > 0 ? (
                          departmentStudents.map((student) => (
                            <div
                              key={student.id}
                              onClick={() =>
                                setSelectedPerson({
                                  ...student,
                                  type: 'student',
                                  department_name: department.name,
                                })
                              }
                              className="text-gray-300 text-sm sm:text-base flex w-full justify-between items-center cursor-pointer hover:text-purple-400"
                            >
                              <p>{student.full_name}</p>
                              <p>{student.student_id}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No students available</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Faculty */}
                    <AccordionItem value={`faculty-${department.id}`}>
                      <AccordionTrigger className="text-purple-300">
                        Faculty ({departmentFaculty.length})
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {departmentFaculty.length > 0 ? (
                          departmentFaculty.map((f) => (
                            <div
                              key={f.id}
                              onClick={() =>
                                setSelectedPerson({
                                  ...f,
                                  type: 'faculty',
                                  department_name: department.name,
                                })
                              }
                              className="text-gray-300 text-sm sm:text-base flex w-full justify-between items-center cursor-pointer hover:text-purple-400"
                            >
                              <p>{f.full_name}</p>
                              <p>{f.faculty_id}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No faculty available</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-400 text-center col-span-full">No departments available yet!</p>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-center items-center gap-2 mt-8 hover:underline hover:text-sky-500 cursor-pointer">
        <MoveLeft />
        <Link to="/dashboard/admin" className="text-sm sm:text-base font-bold">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Departments;
