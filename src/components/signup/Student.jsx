import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";


function Student() {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Student - Create an account ";
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
              Student Info
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fullname"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  required
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
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200 text-xs sm:text-sm md:text-base">
                  Date of Birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-gray-100 text-xs sm:text-sm md:text-base ${
                        !date ? "text-gray-500" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    side="bottom"
                    className="w-auto p-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg"
                    style={{ position: "fixed" }}
                  >
                    <div
                      onKeyDown={(e) => {
                        if (
                          [
                            "ArrowUp",
                            "ArrowDown",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        captionLayout="dropdown"
                        initialFocus
                        className="rounded-xl text-gray-100 [&_.rdp-day]:text-gray-100 [&_.rdp-day:hover]:text-black [&_.rdp-nav_button]:text-gray-100 [&_.rdp-nav_button:hover]:bg-gray-700 [&_.rdp-day_selected]:bg-purple-600 [&_.rdp-day_selected]:text-white [&_.rdp-dropdown]:bg-gray-800 [&_.rdp-dropdown]:text-gray-100 [&_.rdp-dropdown]:hover:bg-gray-700"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="blood"
                  className="text-gray-200 text-xs sm:text-sm md:text-base"
                >
                  Blood Group
                </Label>
                <Input
                  id="blood"
                  type="text"
                  placeholder="A+, O-, B+"
                  required
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 text-xs sm:text-sm md:text-base"
                />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm md:text-base py-2 sm:py-3">
                Sign Up
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

export default Student;
