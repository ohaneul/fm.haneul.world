'use client'

import { SiSteam, SiSpotify } from '@icons-pack/react-simple-icons'
import { Globe } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 mt-6">
      <a
        href="https://steamcommunity.com/id/kyuripyo/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#1b2838] transition-colors duration-300"
      >
        <SiSteam className="w-8 h-8" />
      </a>
      <a
        href="https://open.spotify.com/user/cpnr5yepksvx0qn7c5z29aw2q"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#1DB954] transition-colors duration-300"
      >
        <SiSpotify className="w-8 h-8" />
      </a>
      <a
        href="https://www.haneul.world"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-primary transition-colors duration-300"
      >
        <Globe className="w-8 h-8" />
      </a>
    </div>
  )
}

