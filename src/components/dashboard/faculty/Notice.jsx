import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTableData } from '@/supabase/postTableData';
import { deleteNotice, setNotice as setNoticeSlice } from '@/store/noticeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getTableByUserId, getTableInAscendingOrder } from '@/supabase/getTableData';
import { format } from 'date-fns';
import { deleteTableById } from '@/supabase/deleteTableData';
import { SuccessToast } from '@/helper/SuccessToast';

function Notice() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [notices, setNotices] = useState([]);
  const authUser = useSelector((state) => state.auth.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const facultyData = await getTableByUserId('Faculty', authUser.id);
      const data = {
        title,
        content: message,
        faculty_id: facultyData?.id,
        college_id: facultyData?.college_id,
      };

      const newNotice = await addTableData("Notice", data);

      if (!newNotice) return

      setNotices((prev) => [newNotice, ...prev]);
      dispatch(setNoticeSlice([newNotice, ...notices]));
      setTitle('');
      setMessage('');
      SuccessToast("New Notice Added!")

    } catch (error) {
      ErrorToast("New Notice cannot be added...")
      console.error('Error notice form', error);
    }
  };

  const handleDeleteNotice = async (noticeId)=>{
    try {
      const res = await deleteTableById("Notice", "id", noticeId)

      if(!res) return

      setNotices((prev) => prev.filter((n) => n.id !== noticeId));
      dispatch(deleteNotice(noticeId))

    } catch (error) {
      console.error("ERROR:", error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTableInAscendingOrder("created_at", false, "Notice")

        if(!res) return

        setNotices(res)
      } catch (error) {
        console.error("ERROR:", error)
      }
    }
    fetchData()
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex flex-col items-center p-4 sm:p-6 md:p-10 text-white">
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <h1 className="text-xl sm:text-2xl font-bold text-purple-300 text-center">Notice Board</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-gray-800 border border-purple-600 rounded-xl shadow-md p-4 sm:p-6"
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title..."
            className="text-white"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className="text-white"
          />
          <Button className="bg-purple-500 hover:bg-purple-600 w-full">Add Notice</Button>
        </form>
      </div>

      {/* Notices List */}
      <div className="mt-8 p-2 w-full max-w-3xl h-[50vh] overflow-y-auto overflow-x-hidden space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => {
            const formatedDate = format(new Date(notice?.created_at), 'dd-MM-yyyy');
            return (
              <Card
                key={notice.id}
                className="w-full border border-purple-600 bg-gray-800 text-white hover:shadow-lg hover:scale-[1.02] transition-transform"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">
                    {notice?.title || 'N/A'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{notice?.content || 'N/A'}</p>
                </CardContent>
                <CardFooter className="flex gap-2 flex-col justify-items-start items-start">
                  <p className="text-sm text-gray-400">{formatedDate}</p>
                  {
                    notice?.faculty_id != null && (
                      <Button onClick={()=> handleDeleteNotice(notice.id)} className="bg-red-600 cursor-pointer text-white hover:bg-red-400">Delete</Button>
                    )
                  }
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No notices available</p>
        )}
      </div>

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

export default Notice;
