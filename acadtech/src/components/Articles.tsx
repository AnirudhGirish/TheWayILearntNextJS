"use client"
import React from 'react'
import { HoverEffect } from './ui/card-hover-effect';
import Link from 'next/link';

const articles = [
    {
      "title": "The Role of Computer Science in Solving Global Challenges",
      "description": "This article explores how computer science contributes to solving global issues like climate change, healthcare, cybersecurity, and education. It highlights the impact of technologies such as AI, data analytics, and cloud computing in driving innovation and sustainability.",
      "link": "https://alpinecollege.edu.in/the-role-of-computer-science-in-solving-global-challenges/"
    },
    {
      "title": "How Digital Technologies Can Be Used to Solve the World's Challenges",
      "description": "This piece discusses the potential of digital technologies, including computer science, in addressing global challenges such as social inequalities and climate change. It emphasizes the importance of responsible and sustainable use of technology to drive progress.",
      "link": "https://www.weforum.org/stories/2022/05/can-technology-save-the-world/"
    },
    {
      "title": "AI for Social Good: Addressing Global Challenges and Empowering Communities",
      "description": "This research article examines how artificial intelligence, a subset of computer science, can be leveraged for social good to tackle global challenges and empower communities.",
      "link": "https://www.researchgate.net/publication/377914843_AI_for_Social_Good_Addressing_Global_Challenges_and_Empowering_Communities/fulltext/65bcee9834bbff5ba7e99527/AI-for-Social-Good-Addressing-Global-Challenges-and-Empowering-Communities.pdf"
    },
    {
      "title": "Tackling Global Issues with Computer Science",
      "description": "This article discusses how computer science is addressing global issues, improving healthcare, expanding education access, advancing social justice, and more.",
      "link": "https://online.champlain.edu/blog/tackling-global-issues-with-computer-science"
    },
    {
      "title": "Growth Mindset in Computer Science - Introducing Computational Thinking in Education",
      "description": "This study explores the importance of fostering a growth mindset in computer science education, highlighting how it can lead to better problem-solving and resilience.",
      "link": "https://1library.net/article/growth-mindset-computer-science-introducing-computational-thinking-education.qo1kwe5z"
    },
    {
      "title": "Moving Students Toward a 'Growth Mindset' in Computer Science",
      "description": "This article discusses strategies to encourage a growth mindset among computer science students, emphasizing the role of educators in fostering resilience and a love for learning.",
      "link": "https://advocate.csteachers.org/2014/11/05/moving-students-toward-a-growth-mindset-in-computer-science/"
    }
];
  

interface ArticlesProps {
    id?: string;  // Optional prop for the ID of the section
}

const Articles: React.FC<ArticlesProps> = ({ id }) => {
  return (
    <div className="max-w-7xl mx-auto px-4" id={id}>
        <div className='mt-20'>
            <div className='text-center'>
                <h2 className='text-2xl text-white font-semibold tracking-wide'>From the Industry</h2>
                <p className='text-4xl leading-8 mt-2 font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-t from-purple-50 to-purple-400'>Articles</p>
            </div>
        </div>
        <div>
            <HoverEffect items={articles} />
        </div>
        <div  className='mt-5 text-center pb-5'>
            <Link href={"https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://news.mit.edu/topic/computers&ved=2ahUKEwj8iK77zLyLAxWjR2wGHfy1GWAQFnoECAoQAQ&usg=AOvVaw1Y_brCqf3sYq9YGhh6Od-0"} className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:p-[3px]'>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        View All Articles !!!
                    </span>
            </Link>
        </div>
  </div>
  )
}

export default Articles