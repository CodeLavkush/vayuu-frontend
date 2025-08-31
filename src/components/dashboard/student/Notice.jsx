import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { format } from 'date-fns';
import { getTableInAscendingOrder } from '@/supabase/getTableData';

function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTableInAscendingOrder("created_at", false, "Notice")
        if(res){
          setNotices(res)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex flex-col items-center p-4 sm:p-6 md:p-10 text-white">
      <h1 className="text-xl sm:text-2xl font-bold text-purple-300 text-center">Notice Board</h1>

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
                <CardFooter>
                  <p className="text-sm text-gray-400">{formatedDate}</p>
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
        <Link to="/dashboard/student" className="text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Notice;
