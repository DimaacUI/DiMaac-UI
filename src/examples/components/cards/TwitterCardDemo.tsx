"use client";

import TwitterCard from '@/ui/components/cards/TwitterCard'
import PostSwiper from '@/ui/components/cards/PostSwiper'
import React from 'react'

const TwitterCardDemo = () => {
    const tweets = [
        {
            profileImage: "/logo.png",
            isVerified: true,
            content: "Just shipped a new feature for DiMaac UI! 🚀",
            displayName: "DiMaac",
            username: "DiMaacUI",
            timestamp: "2h",
            image: "/socialMediaThumbnail.webp"
        },
        {
            profileImage: "/logo.png",
            isVerified: true,
            content: `Hot take: Your side project doesn't need:

❌ Microservices
❌ Kubernetes
❌ Redis
❌ GraphQL
❌ Multiple databases

It needs:

✅ To solve a real problem
✅ To ship fast
✅ To get users
✅ To iterate based on feedback

Stop over-engineering. Start shipping. 🚢`,
            displayName: "DiMaac",
            username: "DiMaacUI",
            timestamp: "5h"
        },
        {
            profileImage: "/lyliaDP.png",
            isVerified: true,
            content: (
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
            ),
            displayName: "Lylia",
            username: "lylia_agent47",
            timestamp: "8h"
        },
        {
            profileImage: "/barakaDP.webp",
            isVerified: true,
            content: `Training legs today. Training code tomorrow.

Both require:
• Consistency over intensity
• Progressive overload
• Proper form
• Recovery time
• Long-term thinking

Whether you're building muscle or building apps, the principles are the same. Stay disciplined. 💪

#FitnessAndCode`,
            displayName: "Baraka",
            username: "muscle_therapist",
            timestamp: "1d"
        },
        {
            profileImage: "/lyliaDP.png",
            isVerified: true,
            content: (
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
                            <div className="text-4xl mb-2">⚡️</div>
                            <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                                The 1% Rule
                            </h2>
                        </div>

                        <div className="space-y-2 max-w-sm">
                            <p className="text-white/90 text-base font-light leading-relaxed">
                                1% better every day
                            </p>
                            <p className="text-white text-lg font-medium">
                                = 37x better in a year
                            </p>
                            <p className="text-white/80 text-base mt-4 tracking-widest uppercase">
                                compound growth
                            </p>
                        </div>

                        {/* Subtle accent line */}
                        <div className="mt-6 w-16 h-px bg-white/40"></div>
                    </div>
                </div>
            ),
            displayName: "Lylia",
            username: "lylia_agent47",
            timestamp: "1d"
        },
        {
            profileImage: "/logo.png",
            isVerified: true,
            content: `Real talk: The best developers I know aren't the ones who memorized every algorithm or framework.

They're the ones who:
• Ask great questions
• Admit when they don't know
• Help others without ego
• Ship features that users love
• Debug with curiosity, not frustration

Be the dev people want on their team. Technical skills are teachable. Character isn't. 💙`,
            displayName: "DiMaac",
            username: "DiMaacUI",
            timestamp: "2d"
        },
        {
            profileImage: "/barakaDP.webp",
            isVerified: true,
            content: `Your body is a temple. Your code is a cathedral.

Both need:
✓ Strong foundations
✓ Regular maintenance
✓ Attention to detail
✓ Sustainable practices

Don't skip leg day. Don't skip code reviews. Both will catch up with you eventually. 🏋️‍♂️💻`,
            displayName: "Baraka",
            username: "muscle_therapist",
            timestamp: "3d"
        },
        {
            profileImage: "/logo.png",
            isVerified: true,
            content: `Unpopular opinion: You don't need to learn every new JavaScript framework that comes out.

Master the fundamentals:
• Vanilla JS
• CSS
• HTML
• HTTP
• Browser APIs

Frameworks come and go. Fundamentals are forever. Build on rock, not sand. 🏗️`,
            displayName: "DiMaac",
            username: "DiMaacUI",
            timestamp: "4d"
        }
    ];

    const twitterSlides = tweets.map((tweet, index) => (
        <TwitterCard
            key={index}
            profileImage={tweet.profileImage}
            isVerified={tweet.isVerified}
            content={tweet.content}
            displayName={tweet.displayName}
            username={tweet.username}
            timestamp={tweet.timestamp}
            image={tweet.image}
            className="bg-[#252728]"
        />
    ));

    return <PostSwiper slides={twitterSlides} />
}

export default TwitterCardDemo

