'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed top-4 left-4 flex items-center gap-2 z-50 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
      <audio ref={audioRef} loop>
        <source src="/audio.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary transition-colors"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary transition-colors"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className="w-24"
        aria-label="Volume"
      />
    </div>
  )
}

