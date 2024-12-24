import { AudioPlayer } from './components/audio-player'
import { AnimatedBackground } from './components/animated-background'
import { ViewCounter } from './components/view-counter'
import { SocialLinks } from './components/social-links'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <AudioPlayer />
      
      <div className="z-10 text-center p-8 bg-black/30 rounded-xl backdrop-blur-md">
        <div className="mb-8">
          <Image
            src="https://cdn.discordapp.com/avatars/1300855994536169564/0814039e921bfeb4a77a1eb2d7adefd3.png?size=1024"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full mx-auto border-2 border-primary/50"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-white animate-pulse">
          haneul
        </h1>
        
        <p className="text-white/80 mb-6 text-lg animate-fade-in">
          프로필에 와주셔서 감사합니다
          <br />
          <span className="text-sm text-white/60">Thank you for coming to my profile</span>
        </p>

        <SocialLinks />
        
        <div className="mt-6">
          <ViewCounter />
        </div>
      </div>
    </main>
  )
}

