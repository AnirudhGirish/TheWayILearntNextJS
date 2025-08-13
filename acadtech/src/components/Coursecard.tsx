'use client'
import React from 'react';
import CourseData from '@/data/courses.json';
import Link from 'next/link';
import { BackgroundGradient } from './ui/background-gradient';

interface Course {
    id: number,
    title: string,
    slug: string,
    description: string,
    isFeatured: boolean,
}
interface CoursecardProps {
    id?: string;  // Optional prop for the ID of the section
}

const Coursecard: React.FC<CoursecardProps> = ({ id }) => {
    const featuredCourses = CourseData.courses.filter((course: Course )=> course.isFeatured)
  return (
    <div className='py-12 bg-zinc-950 'id={id}>
        <div>
            <div className='text-center'>
                <h2 className='text-2xl text-white font-semibold tracking-wide'>Featured Courses</h2>
                <p className='text-4xl leading-8 mt-2 font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-t from-purple-50 to-purple-400'>Learn the Best</p>
            </div>
        </div>
        <div className='mt-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
                {featuredCourses.map((course:Course)=>(
                    <div key={course.id} className="flex justify-center">
                         <BackgroundGradient className="flex flex-col rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 overflow-hidden h-full">
                            <div className='p-4 sm:p-6 flex flex-col items-center text-center flex-grow'>
                                <p className='text-xl sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200'>{course.title}</p>
                                <p className='text-lg text-neutral-600 dark:text-neutral-400 flex-grow mb-2'>{course.description}</p>
                                <Link href={`${course.slug}`}>Learn More</Link>
                            </div>
                         </BackgroundGradient>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-20 text-center'>
            <Link href={"https://www.coursera.org/browse/computer-science"} className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:p-[3px]'>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        View All Courses !!!
                    </span>
            </Link>
        </div>
    </div>
  )
}
export default Coursecard