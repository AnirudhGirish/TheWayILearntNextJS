import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'

const quotes = [
    {
      "quote": "The computer was born to solve problems that did not exist before.",
      "name": "Bill Gates",
      "title": "Co-founder of Microsoft"
    },
    {
      "quote": "Software is a great combination between artistry and engineering.",
      "name": "Steve Jobs",
      "title": "Co-founder of Apple Inc"
    },
    {
      "quote": "Any sufficiently advanced technology is indistinguishable from magic.",
      "name": "Arthur C. Clarke",
      "title": "Science Fiction Writer"
    },
    {
      "quote": "It’s not a faith in technology. It’s faith in people.",
      "name": "Steve Wosniak",
      "title": "Co-founder of Apple Inc."
    },
    {
      "quote": "Programs must be written for people to read, and only incidentally for machines to execute.",
      "name": "Harold Abelson",
      "title": "Computer Scientist"
    },
    {
      "quote": "The most damaging phrase in the language is: 'It’s always been done that way.'",
      "name": "Grace Hopper",
      "title": "Rear Admiral, Computer Scientist"
    },
    {
      "quote": "We are changing the world with technology.",
      "name": "Elon Musk",
      "title": "Co-founder of SpaceX"
    },
    {
      "quote": "Technology is best when it brings people together.",
      "name": "Matt Mullenweg",
      "title": "Founder of WordPress"
    }
];
  

interface CardProps {
    id?: string;  // Optional prop for the ID of the section
}

const Quotes: React.FC<CardProps> = ({ id }) => {
  return (
    <div className="flex flex-col p-10 justify-center bg-white dark:bg-black dark:bg-grid-white/[0.09] bg-grid-black/[0.2]"id={id}>
        <h2 className='pt-16 text-6xl font-bold text-center'>Industry Quotes</h2>
        <div className='h-[40rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden'>
          <InfiniteMovingCards
            items={quotes}
            speed='normal'
          />
        </div>
    </div>
  )
}

export default Quotes;