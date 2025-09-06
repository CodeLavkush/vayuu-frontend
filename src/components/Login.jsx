import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "@/supabase/auth";
import { useDispatch } from "react-redux";
import { login as loginSlice } from "@/store/authSlice";
import { SuccessToast } from "@/helper/SuccessToast";
import { ErrorToast } from "@/helper/ErrorToast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const data = {
        "email": email,
        "password": password,
      }

      const res = await authLogin(data)

      if(res != null){
        dispatch(loginSlice(res))
        SuccessToast("Logged in successfully")
        if(res.user.user_metadata.role === "admin"){
          navigate("/dashboard/admin")
        }
        else if(res.user.user_metadata.role === "faculty"){
          navigate("/dashboard/faculty")
        }
        else if(res.user.user_metadata.role === "student"){
          navigate("/dashboard/student")
        }
        else{
          navigate("/")
        }
      }
    } catch (error) {
      console.error("LOGIN FORM ERROR:", error)
      ErrorToast("Login failed!")
    }
  }

  useEffect(() => {
    document.title = "Login - Log into your account";
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/70 border border-purple-700 shadow-2xl rounded-2xl">
          <CardHeader className="text-center">
            <img
              src="./logo.png"
              alt="Vayuu Logo"
              className="mx-auto h-16 w-16 object-contain"
            />
            <p className="text-gray-400 mt-2">College Management System</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                Login
              </Button>
              <p className="text-center text-gray-400 text-xs sm:text-sm md:text-base mt-3">Create an account <Link to="/signup" className="text-purple-400 hover:underline">Signup</Link></p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
