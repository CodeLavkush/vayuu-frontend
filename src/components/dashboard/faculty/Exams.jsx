import { Link } from 'react-router-dom';
import { Book, Calendar, Clock, House, MoveLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTableByUserId } from '@/supabase/getTableData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

function Exams() {
  const authUser = useSelector((state) => state.auth.data);
  const subjectsSlice = useSelector((state) => state.subjects.data);
  const examsSlice = useSelector((state) => state.exams.data);

  const [faculty, setFaculty] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const facultyData = await getTableByUserId('Faculty', authUser.id);
        if (facultyData) {
          setFaculty(facultyData);
        }
      } catch (error) {
        throw error
      }
    }
    if (authUser?.id) {
      fetchFaculty();
    }
  }, [authUser]);

  useEffect(() => {
    if (faculty && subjectsSlice.length > 0) {
      const subjectsData = subjectsSlice.filter((s) => s.faculty_id === faculty.id);
      setSubjects(subjectsData);
    }
  }, [faculty, subjectsSlice]);

  useEffect(() => {
    if (subjects.length > 0 && examsSlice.length > 0) {
      const subjectIds = subjects.map((s) => s.id);
      const facultyExams = examsSlice.filter((exam) => subjectIds.includes(exam.subject_id));
      setExams(facultyExams);
    } else {
      setExams([]);
    }
  }, [subjects, examsSlice]);

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">My Exams</h1>

      {/* Exams List */}
      {exams.length > 0 ? (
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card
              key={exam.id}
              className="bg-gray-800 border border-purple-700 rounded-xl shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-purple-400 text-lg font-semibold">{exam.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <div className="flex gap-2 items-center">
                  <Calendar />
                  <p>{exam.date ? format(new Date(exam.date), 'dd-MM-yyyy') : 'N/A'}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Clock />
                  <p>{exam.duration || 'N/A'}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <House />
                  <p>{exam.room || 'N/A'}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Book />
                  <p>{subjects.find((s) => s.id === exam.subject_id)?.name || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No exams scheduled yet.</p>
      )}

      {/* Back Button */}
      <div className="flex justify-center items-center gap-2 mt-8 hover:underline hover:text-sky-500 cursor-pointer">
        <MoveLeft />
        <Link to="/dashboard/faculty" className="text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Exams;
