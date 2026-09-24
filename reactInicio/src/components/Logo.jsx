

export default function Logo({ width = 200, height = 50 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 240 60" 
      width={width} 
      height={height} 
      fill="none"
      className="object-contain"
    >
      <defs>
        <linearGradient id="logoSproutGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00DBEB" />
          <stop offset="100%" stopColor="#F5009B" />
        </linearGradient>
        <linearGradient id="badgeBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F4FF" />
          <stop offset="100%" stopColor="#E1E7FE" />
        </linearGradient>
      </defs>
      <g transform="translate(10, 8)">
        <rect width="44" height="44" rx="14" fill="url(#badgeBgGrad)" stroke="#00DBEB" strokeWidth="2"/>
        <path d="M22 34C17 34 14 30 14 26C14 20 22 13 22 13C22 13 30 20 30 26C30 30 27 34 22 34Z" fill="#00DBEB" opacity="0.25"/>
        <path d="M22 32V20M22 20C22 16 16 15 15 15C15 19 19 21 22 21ZM22 23C23 19 28 17 29 18C29 22 25 24 22 24Z" stroke="url(#logoSproutGrad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="13" r="2.5" fill="#F5009B"/>
      </g>
      <text x="66" y="32" fontFamily="Plus Jakarta Sans, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1A103C" letterSpacing="-0.5">
        Monte<tspan fill="#F5009B">kids</tspan>
      </text>
      <text x="67" y="44" fontFamily="Plus Jakarta Sans, system-ui, sans-serif" fontWeight="700" fontSize="9.5" fill="#4E00DE" letterSpacing="1.2">
        ESTIMULACIÓN TEMPRANA
      </text>
    </svg>
  );
}