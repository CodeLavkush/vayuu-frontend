import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const randomSizeClasses = [
  "col-span-1 row-span-2",
  "col-span-1 row-span-3",
  "col-span-2 row-span-2",
  "col-span-2 row-span-3",
];

const getRandomSize = () => {
  return randomSizeClasses[Math.floor(Math.random() * randomSizeClasses.length)];
};

function NavDashboard({ tiles }) {
  return (
    <div
      className="w-screen h-screen overflow-y-auto 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 
        auto-rows-[minmax(6rem,_1fr)] gap-4 p-4 sm:p-6 
        bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
    >
      {tiles.map((tile, idx) => {
        const sizeClass = getRandomSize();
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-2xl shadow-md border border-purple-700 ${tile.gradient} 
              flex flex-col justify-between transition-all ${sizeClass}`}
          >
            <Card className="bg-transparent border-0 shadow-none h-full w-full">
              <CardContent className="flex flex-col items-start gap-2 p-4 sm:p-6 h-full w-full text-white">
                <Link to={tile.link} className="flex flex-col gap-2 w-full h-full">
                  <tile.icon size={28} className="text-white" />
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                    {tile.title}
                  </span>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export default NavDashboard;
