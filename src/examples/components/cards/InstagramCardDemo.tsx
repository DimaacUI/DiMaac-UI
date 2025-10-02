import InstagramCard from '@/ui/components/cards/InstagramCard'
import React from 'react'

const InstagramCardDemo = () => {
  return (
<div className="w-full flex gap-6 flex-wrap justify-center">
        {/* Your InstagramCard components */}
        <InstagramCard
            image="/lyliaInsta.png"
            profileImage="/lyliaDP.png"
            isVerified={true}
            caption="This is a caption"
            username="lylia_agent47"
            timestamp="1d"
            postClassName="min-h-[500px]"
        />
        
        <InstagramCard
            profileImage="/logo.png"
            isVerified={true}
            caption="midnight thoughts hitting different ✨ sometimes you just gotta trust the process and let creativity flow #midnightvibes #trusttheprocess #aesthetic"
            username="DiMaac"
            timestamp="23m"
            postClassName="min-h-[500px]"
            customPost={
                <div 
                    className="w-full h-full relative overflow-hidden"
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
            }
        />
                <InstagramCard
            image="/barakaInsta.png"
            profileImage="/barakaDP.png"
            isVerified={true}
            caption="This is a caption"
            username="muscle_therapist"
            timestamp="2w"
            postClassName="min-h-[500px]"
        />
    </div>
  )
}
export default InstagramCardDemo