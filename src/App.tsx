import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music2, GithubIcon, GamepadIcon } from 'lucide-react';

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
    setIsLoaded(true);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const socialLinks = [
    { Icon: Music2, color: '#1DB954', href: 'https://open.spotify.com/user/cpnr5yepksvx0qn7c5z29aw2q', label: 'Spotify' },
    { Icon: GamepadIcon, color: '#171a21', href: 'https://steamcommunity.com/id/kyuripyo/', label: 'Steam' },
    { Icon: RSS, color: '#f5f5f5', href: 'https://www.haneul.world', label: 'Website' }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: 'url("https://kpopping.com/documents/95/0/220925-Dreamcatcher-Gahyeon-documents-2(1).jpeg?v=456a5")',
          opacity: isLoaded ? 1 : 0
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 animate-gradient-xy" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Profile Section */}
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 mb-8 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity duration-300" 
                 style={{ animationDuration: '8s' }} />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="https://cdn.discordapp.com/avatars/1300855994536169564/0814039e921bfeb4a77a1eb2d7adefd3.png?size=1024"
              alt="Profile"
              className="absolute inset-1 w-[120px] h-[120px] rounded-full object-cover border-2 border-white/50 group-hover:border-white transition-colors duration-300"
            />
          </div>

          {/* Name and Welcome Text */}
          <div className="space-y-6">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4 tracking-wider animate-fade-in hover:scale-105 transition-transform duration-300">
              HANEUL
            </h1>
            <p className="text-3xl text-white/90 font-medium animate-fade-in-delayed hover:text-white transition-colors duration-300">
              내 프로필에 오신 것을 환영합니다
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
            {socialLinks.map(({ Icon, color, href, label }, index) => (
              <a
                key={index}
                href={href}
                className="group relative p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                aria-label={label}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-red-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon 
                  className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" 
                  style={{ color }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={toggleMute}
            className="group relative bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-all duration-300"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-red-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <Volume2 className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>
          <audio ref={audioRef} autoPlay loop>
            <source src="/audio.m4a" type="audio/mp4" />
          </audio>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

export default App;
