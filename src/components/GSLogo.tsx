import React from 'react';

interface GSLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  className?: string;
  customLogoUrl?: string;
}

export const GSLogo: React.FC<GSLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showTagline = true,
  className = '',
  customLogoUrl
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // If a custom logo image URL is provided and valid, show the uploaded logo with proper aspect ratio
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="GS COMPUTER"
          className={`${currentSize.icon} object-contain rounded-md shadow-sm`}
        />
        <div className="flex flex-col">
          <span
            className={`font-black tracking-wider uppercase leading-none font-['Space_Grotesk'] ${currentSize.text} ${
              variant === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            GS <span className="text-blue-600">COMPUTER</span>
          </span>
          {showTagline && (
            <span
              className={`font-semibold tracking-widest uppercase mt-0.5 ${currentSize.sub} ${
                variant === 'dark' ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              Your Tech Partner
            </span>
          )}
        </div>
      </div>
    );
  }

  // Official high-definition vector badge logo matching Blue, Dark Navy, Black, White brand palette
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Brand Icon Badge */}
      <div
        className={`${currentSize.icon} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-1.5 shadow-md shadow-blue-900/25 border border-blue-400/30 shrink-0 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Hexagonal / Shield Frame */}
          <polygon
            points="50,4 92,25 92,75 50,96 8,75 8,25"
            stroke="url(#blueGrad)"
            strokeWidth="5"
            fill="#091428"
          />
          {/* Inner Circuit nodes */}
          <line x1="50" y1="12" x2="50" y2="28" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="12" r="3" fill="#60a5fa" />
          <line x1="16" y1="30" x2="30" y2="38" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="84" y1="30" x2="70" y2="38" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* GS Letters Emblem */}
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fill="#ffffff"
            fontWeight="900"
            fontSize="36"
            fontFamily="Space Grotesk, sans-serif"
            letterSpacing="-1"
          >
            GS
          </text>

          {/* Micro laptop outline base */}
          <path
            d="M32 72 L68 72 L74 78 L26 78 Z"
            fill="#3b82f6"
          />

          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="0.5" stopColor="#2563eb" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tiny pulsing power led */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight font-['Space_Grotesk'] uppercase ${currentSize.text} ${
              variant === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            GS <span className="text-blue-600 font-black">COMPUTER</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-semibold tracking-[0.2em] uppercase mt-0.5 text-blue-600 ${currentSize.sub}`}
          >
            Your Tech Partner
          </span>
        )}
      </div>
    </div>
  );
};
