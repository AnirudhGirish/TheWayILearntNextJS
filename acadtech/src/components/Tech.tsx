'use client'
import React from 'react'
import { AnimatedTooltip } from './ui/animated-tooltip';
import Link from 'next/link';

const tech = [
    {
      "id": 1,
      "name": "Artificial Intelligence (AI)",
      "designation": "Programming Language",
      "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 2,
      "name": "Cloud Computing",
      "designation": "System Language",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 3,
      "name": "Cybersecurity",
      "designation": "DevOps Tool",
      "image": "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 4,
      "name": "Blockchain",
      "designation": "Backend Framework",
      "image": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 5,
      "name": "Internet of Things (IoT)",
      "designation": "Front-End Framework",
      "image": "https://images.unsplash.com/photo-1553341640-9397992456f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 6,
      "name": "Quantum Computing",
      "designation": "System Language",
      "image": "https://images.unsplash.com/photo-1609151376730-f246ec0b99e5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 7,
      "name": "DevOps",
      "designation": "DevOps Tool",
      "image": "https://images.unsplash.com/photo-1525373698358-041e3a460346?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

interface CardProps {
    id?: string;  // Optional prop for the ID of the section
}

const Tech: React.FC<CardProps> = ({ id }) => {
  return (
    <div className='flex flex-col items-center justify-center pb-16'id={id}>
       <div className='mt-20'>
            <div className='text-center'>
                <h2 className='text-4xl text-white font-semibold tracking-wide'>Top Computer Science</h2>
                <p className='text-4xl leading-10 mt-2 font-extrabold tracking-tight sm:text-8xl bg-clip-text text-transparent bg-gradient-to-t from-purple-50 to-purple-400'>Technologies</p>
            </div>
      </div>
      <div className='mt-20'>
          <div className="flex flex-row items-center justify-center w-full">
            <AnimatedTooltip items={tech} />
          </div>
      </div>
      <div  className='text-center pb-5 mt-20'>
            <Link href={"https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.simplilearn.com/top-technology-trends-and-jobs-article&ved=2ahUKEwi574jazbyLAxXSSWwGHZr4GyEQFnoECAsQAQ&usg=AOvVaw3uqEMGmrMOOxZsZNxbp1gL"} className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:p-[3px]'>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Explore All Technologies !!!
                    </span>
            </Link>
        </div> 
    </div>
  )
}

export default Tech

{/**/}