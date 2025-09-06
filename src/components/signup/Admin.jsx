import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { adminSignup as authAdminSignup } from "@/supabase/auth";
import { SuccessToast } from "@/helper/SuccessToast";
import { ErrorToast } from "@/helper/ErrorToast";

function Admin() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const data = {
        "college_name": name,
        "reg_no": regNo,
        "phone_no": phoneNo,
        "email": email,
        "password": password,
        "address": address,
      }
      const res = await authAdminSignup(data)

      if(!res) return

      SuccessToast("Your profile is created!")
      navigate("/login")

    } catch (error) {
      console.error("ADMIN FORM ERROR:", error)
      ErrorToast("Profile creation failed!")
    }
  }

  useEffect(() => {
    document.title = "Admin - Create an account ";
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <Card className="bg-gray-900/70 border border-purple-700 shadow-2xl rounded-2xl w-full">
          <CardHeader className="text-center">
            <img
              src="/logo.png"
              alt="Vayuu Logo"
              className="mx-auto h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"
            />
            <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              Create an Account
            </p>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">
              Admin Info
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  College Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="ABC College"
                  required
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="regno"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Registered No.
                </Label>
                <Input
                  id="regno"
                  type="text"
                  placeholder="2023XXXX"
                  required
                  value={regNo}
                  onChange={(e)=> setRegNo(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
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
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Phone No.
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
                  value={phoneNo}
                  onChange={(e)=> setPhoneNo(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Your address here"
                  required
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm md:text-base py-2 sm:py-3">
                Create Account
              </Button>
              <p className="text-center text-gray-400 text-xs sm:text-sm md:text-base mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Admin;
