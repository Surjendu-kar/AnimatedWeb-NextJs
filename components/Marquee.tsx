"use client";
import { motion } from "motion/react";

function Marquee() {
  return (
    <div
      data-scroll
      data-scroll-speed="0.001"
      className="w-full py-5 lg:py-10 bg-[#004D43] rounded-tl-md rounded-tr-md lg:rounded-tl-2xl lg:rounded-tr-2xl overflow-hidden"
    >
      <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap">
        <motion.div
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex flex-shrink-0"
        >
          <h1 className="text-[80px] lg:text-[365px] leading-[15vw] pb-3 lg:pb-9 uppercase font-grotesk pr-20">
            Let's build together
          </h1>
          <h1 className="text-[80px] lg:text-[365px] leading-[15vw] pb-3 lg:pb-9 uppercase font-grotesk pr-20">
            Let's build together
          </h1>
        </motion.div>
        <motion.div
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex flex-shrink-0"
        >
          <h1 className="text-[80px] lg:text-[365px] leading-[15vw] pb-3 lg:pb-9 uppercase font-grotesk pr-20">
            Let's build together
          </h1>
          <h1 className="text-[80px] lg:text-[365px] leading-[15vw] pb-3 lg:pb-9 uppercase font-grotesk pr-20">
            Let's build together
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default Marquee;
