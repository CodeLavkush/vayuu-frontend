import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
  useEffect(()=>{
    document.title = "Signup - Create an account"
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl w-full"
      >
        {/* Faculty Card */}
        <Card className="bg-gray-900/70 border border-purple-700 shadow-2xl rounded-2xl text-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <img
              src="/logo.png"
              alt="Faculty Logo"
              className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            />
            <p className="text-gray-200 text-base sm:text-lg md:text-xl font-semibold mt-3">
              Faculty Signup
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4">
              Create an account as a faculty member to manage courses and
              students.
            </p>
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm sm:text-base py-2 sm:py-3"
            >
              <Link to="/signup/faculty">Go to Faculty Signup</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Student Card */}
        <Card className="bg-gray-900/70 border border-purple-700 shadow-2xl rounded-2xl text-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <img
              src="/logo.png"
              alt="Student Logo"
              className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            />
            <p className="text-gray-200 text-base sm:text-lg md:text-xl font-semibold mt-3">
              Student Signup
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4">
              Create an account as a student to access learning resources and
              updates.
            </p>
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm sm:text-base py-2 sm:py-3"
            >
              <Link to="/signup/student">Go to Student Signup</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Signup;
