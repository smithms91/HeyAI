'use client';

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
  {
    name: 'John Doe',
    avatar: 'J',
    title: 'Software Engineer',
    description: "This is the best application I've used!"
  },
  {
    name: 'Caleb Pressley',
    avatar: 'C',
    title: 'Podcaster',
    description: "This is the 2nd best application I've ever used!"
  },
  {
    name: 'Smith Mackenzie',
    avatar: 'S',
    title: 'Photographer',
    description: "I love AI, this is amazing!"
  },
  {
    name: 'Terrence Crawford',
    avatar: 'T',
    title: 'Boxer',
    description: "This is the best AI application I've used!"
  },
]

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>Testimonials</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map((item) => (
          <Card className="bg-[#192339] border-none text-white" key={item.description}>
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div>
                  <p className='text-lg'>{item.name}</p>
                  <p className='text-zinc-400 text-sm'>{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0'>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LandingContent