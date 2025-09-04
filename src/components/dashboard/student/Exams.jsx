import { Link } from 'react-router-dom';
import { Book, Calendar, Clock, House, MoveLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTableByUserId } from '@/supabase/getTableData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function Exams() {
  const authUser = useSelector((state) => state.auth.data);
  const coursesSlice = useSelector((state) => state.courses.data);
  const subjectsSlice = useSelector((state) => state.subjects.data);
  const examsSlice = useSelector((state) => state.exams.data);

  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await getTableByUserId('Students', authUser.id);

        if (!studentData) return;

        const course = coursesSlice.find((course) => course.id === studentData.course_id);
        if (!course) return;

        const subjectsData = subjectsSlice.filter((subject) => subject.course_id === course.id);
        setSubjects(subjectsData);
      } catch (error) {
        throw error
      }
    }
    fetchData();
  }, [authUser, coursesSlice, subjectsSlice]);

  useEffect(() => {
    if (subjects.length > 0) {
      const subjectIds = subjects.map((s) => s.id);
      const studentExams = examsSlice.filter((exam) => subjectIds.includes(exam.subject_id));
      setExams(studentExams);
    }
  }, [subjects, examsSlice]);

  return (
    <div className="bg-gray-900 min-h-screen w-screen flex flex-col items-center text-white p-6 gap-6 overflow-x-hidden">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">My Exams</h2>

      {exams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {exams.map((exam) => (
            <Card key={exam.id} className="bg-gray-800 border border-purple-700 rounded-xl">
              <CardHeader>
                <CardTitle className="text-purple-400">{exam.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <div className='flex gap-2 justify-items-start items-center'>
                  <Calendar/>
                  <p>{exam.date}</p>
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
                  <p>{subjects.find((s) => s.id === exam.subject_id)?.name || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No exams scheduled yet.</p>
      )}

      <div className="flex justify-center items-center gap-2 hover:underline hover:text-sky-500 cursor-pointer mt-6">
        <MoveLeft />
        <Link to="/dashboard/student" className="text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Exams;
