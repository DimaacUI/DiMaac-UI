"use client";

import FacebookCard from '@/ui/components/cards/FacebookCard'
import PostSwiper from '@/ui/components/cards/PostSwiper'
import React from 'react'

const FacebookCardDemo = () => {
  const posts = [
    {
      profileImage: "/logo.png",
      content: "Excited to announce the launch of DiMaac UI! 🎉 A collection of beautiful, animated components built with React and GSAP.",
      username: "DiMaac",
      timestamp: "2h",
      image: "/socialMediaThumbnail.png"
    },
    {
      profileImage: "/barakaDP.png",
      content: `Just finished an intense workout session! 💪 Remember: your body and your code both need regular maintenance. Stay strong, stay sharp!

#Fitness #Coding #HealthyDeveloper`,
      username: "Baraka - Muscle Therapist",
      timestamp: "5h"
    },
    {
      profileImage: "/lyliaDP.png",
      content: (
        <div 
          className="w-full aspect-video relative overflow-hidden"
          style={{
            background: 'linear-gradient(to top, #4f46e5 0%, #7c3aed 100%)',
            fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-2 h-2 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-8 left-6 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-12 right-12 w-4 h-4 border border-white rotate-45"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center">
            <div className="mb-4">
              <div className="text-4xl mb-2">✨</div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Create. Build. Inspire.
              </h2>
            </div>
            
            <div className="space-y-2 max-w-sm">
              <p className="text-white/90 text-base font-light leading-relaxed">
                every line of code
              </p>
              <p className="text-white text-lg font-medium">
                tells a story
              </p>
              <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                make it count
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="mt-6 w-16 h-px bg-white/40"></div>
          </div>
        </div>
      ),
      username: "Lylia",
      timestamp: "8h"
    },
    {
      profileImage: "/logo.png",
      content: `The secret to becoming a better developer? Build things. Lots of things. Don't just follow tutorials—create your own projects, make mistakes, debug, learn, and repeat.

Your portfolio isn't about perfection. It's about progress. 📈`,
      username: "DiMaac",
      timestamp: "12h"
    },
    {
      profileImage: "/barakaDP.png",
      content: `They say sitting is the new smoking. As developers, we need to take care of our bodies just as much as we care about our code.

Stand up every hour. Stretch. Hydrate. Your future self will thank you. 🧘‍♂️💻`,
      username: "Baraka - Muscle Therapist",
      timestamp: "1d"
    },
    {
      profileImage: "/lyliaDP.png",
      content: `Debugging is like being a detective in a crime movie where you're also the murderer. 🕵️‍♀️

You wrote the bug. You have to find the bug. You know you wrote it somewhere. But where?!

This is fine. Everything is fine. 😅`,
      username: "Lylia",
      timestamp: "2d"
    },
    {
      profileImage: "/logo.png",
      content: `Stop waiting for the perfect moment to start. There's no perfect time, no perfect setup, no perfect knowledge level.

Start messy. Start incomplete. Start scared.

Just start. You'll figure it out along the way. That's how everyone does it. 🚀`,
      username: "DiMaac",
      timestamp: "3d"
    },
    {
      profileImage: "/barakaDP.png",
      content: (
        <div 
          className="w-full aspect-video relative overflow-hidden"
          style={{
            background: 'linear-gradient(to top, #065f46 0%, #059669 100%)',
            fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-2 h-2 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-8 left-6 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-12 right-12 w-4 h-4 border border-white rotate-45"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center">
            <div className="mb-4">
              <div className="text-4xl mb-2">💪</div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Mind & Muscle
              </h2>
            </div>
            
            <div className="space-y-2 max-w-sm">
              <p className="text-white/90 text-base font-light leading-relaxed">
                strong body,
              </p>
              <p className="text-white text-lg font-medium">
                strong code
              </p>
              <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                discipline wins
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="mt-6 w-16 h-px bg-white/40"></div>
          </div>
        </div>
      ),
      username: "Baraka - Muscle Therapist",
      timestamp: "4d"
    }
  ];

  const facebookSlides = posts.map((post, index) => (
    <FacebookCard
      key={index}
      profileImage={post.profileImage}
      content={post.content}
      username={post.username}
      timestamp={post.timestamp}
      image={post.image}
    />
  ));

  return <PostSwiper slides={facebookSlides} />
}

export default FacebookCardDemo
