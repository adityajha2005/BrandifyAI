"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import Lookup from "../_data/Lookup";
import Link from "next/link";

function Hero() {
  const[logotitle,setLogotitle] = useState();
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        {Lookup.HeroHeading}
        {" "}
        <Highlight className="text-black dark:text-white">
          {Lookup.HeroSubHeading}
        </Highlight>
      </motion.h1>
      <div className="flex gap-6 w-full max-w-2xl mt-10 mx-auto">
        <input
          placeholder={Lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e)=>setLogotitle(e.target.value)}
        />
        <Link href={'/create?title='+logotitle}>
        <Button className="w-full p-6">Get Started!</Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}

export default Hero;
