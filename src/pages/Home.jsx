import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function Home() {
    useEffect(()=>{
        document.title = "Vayuu - A Modern College Management System"
    }, [])
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex flex-col">
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 lg:px-16 gap-6 z-10 text-center lg:text-left py-10">
          <img
            className="w-20 sm:w-28 md:w-32 lg:w-36 fade-el drop-shadow-lg"
            src="/logo.png"
            alt="logo"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight fade-el text-white">
            The Future of
            <span className="bg-gradient-to-r from-gray-300 via-purple-400 to-gray-600 bg-clip-text text-transparent">
              {" "}College Management
            </span>
          </h1>

          <p className="max-w-[95%] sm:max-w-[550px] text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-medium tracking-wide fade-el">
            Vayuu empowers institutions with a modern, flexible, and scalable
            solution to streamline administration, support faculty, and elevate
            the student experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 mt-4 fade-el w-full sm:w-auto">
            <Button
              asChild
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-6 py-2 font-semibold shadow-lg"
            >
              <a
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </a>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-gray-800 hover:bg-purple-700 text-white rounded-lg px-6 py-2 font-semibold shadow-lg"
            >
              <a
                href="/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Signup
              </a>
            </Button>
          </div>
        </div>

        {/* Right Content (Features) */}
        <div className="hidden lg:flex flex-col justify-center items-center gap-8 z-10 py-10">
          <div className="fade-el bg-white/10 backdrop-blur-md rounded-2xl p-6 w-64 xl:w-72 text-center shadow-lg border border-gray-700 hover:scale-105 transition-transform text-white">
            <div className="text-violet-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <h3 className="text-xl xl:text-2xl font-bold">Minimalistic</h3>
            <p className="text-gray-300 text-sm mt-2">
              Clean, intuitive interfaces designed for clarity and ease of use.
            </p>
          </div>

          <div className="fade-el bg-gradient-to-r from-purple-600/30 to-violet-800/30 backdrop-blur-lg rounded-2xl p-6 w-64 xl:w-72 text-center shadow-xl hover:scale-105 transition-transform text-white">
            <div className="text-purple-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 14v7m-6-7h12"
                />
              </svg>
            </div>
            <h3 className="text-xl xl:text-2xl font-bold">Modern</h3>
            <p className="text-gray-300 text-sm mt-2">
              Powered by the latest technology to ensure scalability and
              performance.
            </p>
          </div>

          <div className="fade-el bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 w-64 xl:w-72 text-center shadow-md border border-violet-500/40 hover:scale-105 transition-transform text-white">
            <div className="text-violet-300 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 4h6v6H5v-6h8v-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl xl:text-2xl font-bold">Flexible</h3>
            <p className="text-gray-300 text-sm mt-2">
              Adaptable to multiple institutions with customizable features.
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full text-xs sm:text-sm text-gray-400 text-center fade-el z-20 py-4">
        © 2025 Vayuu. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
