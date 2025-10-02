import PostSwiper from '@/ui/components/cards/PostSwiper'
import TwitterCard from '@/ui/components/cards/TwitterCard'
import FacebookCard from '@/ui/components/cards/FacebookCard'
import InstagramCard from '@/ui/components/cards/InstagramCard'
import React from 'react'

export const PostSwiperDemo = () => {
  const socialPosts = [
    // Twitter Card with image
    <TwitterCard
      key="twitter-1"
      profileImage="/logo.png"
      isVerified={true}
      content="Just shipped PostSwiper! 🚀 A unified component for swipeable social media cards. Mix Twitter and Facebook posts seamlessly. \n\n #DiMaacUI #React"
      displayName="DiMaac"
      username="DiMaacUI"
      timestamp="1h"
      image="/socialMediaThumbnail.png"
      className="bg-[#252728]"
    />,
    
    // Facebook Card
    <FacebookCard
      key="facebook-1"
      profileImage="/barakaDP.png"
      content="Fitness tip of the day: Your posture while coding matters! Keep your back straight, shoulders relaxed, and take breaks every hour. A healthy body supports a sharp mind. 💪💻"
      username="Baraka - Muscle Therapist"
      timestamp="3h"
    />,
    
    // Twitter Custom - Moon
    <TwitterCard
      key="twitter-2"
      profileImage="/lyliaDP.png"
      isVerified={true}
      content={(
        <div 
          className="w-full aspect-video relative overflow-hidden"
          style={{
            background: 'linear-gradient(to top, #923857 0%, #FFAFDF 100%)',
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
              <div className="text-4xl mb-2">🌙</div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                3:06 AM
              </h2>
            </div>
            
            <div className="space-y-2 max-w-sm">
              <p className="text-white/90 text-base font-light leading-relaxed">
                when the world sleeps,
              </p>
              <p className="text-white text-lg font-medium">
                creativity awakens
              </p>
              <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                trust the process
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="mt-6 w-16 h-px bg-white/40"></div>
          </div>
        </div>
      )}
      displayName="Lylia"
      username="lylia_agent47"
      timestamp="5h"
      className="bg-[#252728]"
    />,
    
    // Instagram Custom
    <InstagramCard
      key="instagram-2"
      profileImage="/logo.png"
      isVerified={true}
      caption="midnight thoughts hitting different ✨ sometimes you just gotta trust the process and let creativity flow #midnightvibes #trusttheprocess #aesthetic"
      username="DiMaac"
      timestamp="6h"
      className="max-w-xl bg-[#252728] p-4 rounded-2xl border border-white/10"
      postClassName="min-h-0"
      customPost={
        <div 
          className="w-full h-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(to top, #0c4a6e 0%, #0369a1 100%)',
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
              <div className="text-4xl mb-2">🚀</div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Ship It
              </h2>
            </div>
            
            <div className="space-y-2 max-w-sm">
              <p className="text-white/90 text-base font-light leading-relaxed">
                ideas mean nothing,
              </p>
              <p className="text-white text-lg font-medium">
                execution is everything
              </p>
              <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                just build it
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="mt-6 w-16 h-px bg-white/40"></div>
          </div>
        </div>
      }
    />,
    
    // Facebook text
    <FacebookCard
      key="facebook-2"
      profileImage="/logo.png"
      content="The secret to becoming a better developer? Build things. Lots of things. Don't just follow tutorials—create your own projects, make mistakes, debug, learn, and repeat.\n\nYour portfolio isn't about perfection. It's about progress. 📈"
      username="DiMaac"
      timestamp="8h"
    />,
    
    // Twitter text
    <TwitterCard
      key="twitter-3"
      profileImage="/barakaDP.png"
      isVerified={true}
      content="Your body is a temple. Your code is a cathedral.\n\nBoth need:\n✓ Strong foundations\n✓ Regular maintenance\n✓ Attention to detail\n\nDon't skip leg day. Don't skip code reviews. 🏋️‍♂️💻"
      displayName="Baraka"
      username="muscle_therapist"
      timestamp="12h"
      className="bg-[#252728]"
    />,
    
    // Facebook Custom - Keep Going
    <FacebookCard
      key="facebook-3"
      profileImage="/lyliaDP.png"
      content={(
        <div 
          className="w-full aspect-video relative overflow-hidden"
          style={{
            background: 'linear-gradient(to top, #7c2d12 0%, #dc2626 100%)',
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
              <div className="text-4xl mb-2">🔥</div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Keep Going
              </h2>
            </div>
            
            <div className="space-y-2 max-w-sm">
              <p className="text-white/90 text-base font-light leading-relaxed">
                when it gets hard,
              </p>
              <p className="text-white text-lg font-medium">
                that's when it matters
              </p>
              <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                never give up
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="mt-6 w-16 h-px bg-white/40"></div>
          </div>
        </div>
      )}
      username="Lylia"
      timestamp="1d"
    />,
  ];

  return (
    <PostSwiper slides={socialPosts} />
  )
}
