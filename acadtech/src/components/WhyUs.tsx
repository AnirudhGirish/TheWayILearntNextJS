"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [{
  title: "Universal Application",
  description: "Computer Science applies to every field imaginable, from entertainment to education, medicine to transportation. It's the key to revolutionizing industries and solving real-world problems."
},
{
  title: "Empowering Innovation",
  description: "With computer science, you can create innovative solutions to challenges big and small. From developing new software to creating cutting-edge artificial intelligence, it’s the engine of progress."
},
{
  title: "Problem-Solving at Scale",
  description: "Computer science enables us to tackle problems that were once thought insurmountable. Whether it's climate change, disease outbreaks, or global communication, it's the key to scalable solutions."
},
{
  title: "Endless Career Opportunities",
  description: "A background in computer science opens doors to an abundance of career paths in fields like software development, data science, cybersecurity, and beyond, providing stability and growth."
},
{
  title: "Automation & Efficiency",
  description: "Through programming and algorithms, computer science helps automate tedious tasks, streamline workflows, and maximize efficiency in every industry, saving time and resources."
},
{
  title: "Driving the Future",
  description: "From AI to quantum computing, computer science is at the forefront of technological advancement. Understanding it means you're part of shaping the future and staying ahead of the curve."
}]

  
interface CardProps {
    id?: string;  // Optional prop for the ID of the section
}

const WhyUs: React.FC<CardProps> = ({ id }) => {
  return (
    <div id={id}>
        <StickyScroll content={content}/>
    </div>
  )
}

export default WhyUs