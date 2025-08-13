import React from 'react'
import Link from 'next/link'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";
// md:h-[40rem]
function HeroSection() {
  return (
    <div className='h-auto sm:h-screen  w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0'>
         <Spotlight className="-top-40 left-0 md:left-60 md:-top-20"
        fill="purple"/>
        <div className='p-4 relative z-10 w-full text-center'>
            <h1 className='mt-20 md:mt-0 text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>Everything is Computer Science</h1>
            <p className='mt-8 font-normal text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto'>Unlock the power of technology with our platform designed around Computer Science. As the backbone of today’s digital world, it drives innovation, problem-solving, and endless possibilities. From mobile apps to complex systems in business and healthcare, mastering Computer Science lets you shape the future. Start today and be part of the breakthroughs that will define tomorrow.</p>
            <div className='mt-4'>
                <Link href={"https://www.coursera.org/browse/computer-science"}>
                    <Button duration={5000}>Explore Courses</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection