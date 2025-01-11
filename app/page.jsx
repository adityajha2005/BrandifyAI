"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { StrictMode } from "react";

export default function Home() {
  return (
    <div>
      <StrictMode>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:xl-56 p-4">
        
      <Hero />
      </div>
      </StrictMode>
    </div>
  );
}
