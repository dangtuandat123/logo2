export const showcaseLogos = [
    // 1. Neon Fox Mascot
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="foxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff7b00" />
                <stop offset="100%" stop-color="#ff0055" />
            </linearGradient>
            <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1a1a2e" />
                <stop offset="100%" stop-color="#16213e" />
            </linearGradient>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad1)"/>
        <g transform="translate(40, 45)" filter="url(#glow1)">
            <path d="M60 10 L10 50 L30 110 L60 90 L90 110 L110 50 Z" fill="url(#foxGrad)" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
            <path d="M60 90 L30 110 L60 130 L90 110 Z" fill="#ffffff" opacity="0.9"/>
            <circle cx="45" cy="70" r="6" fill="#1a1a2e"/>
            <circle cx="75" cy="70" r="6" fill="#1a1a2e"/>
            <path d="M55 85 Q60 90 65 85" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round" fill="none"/>
        </g>
    </svg>`,

    // 2. Cyberpunk Skull/Robot
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00f2fe" />
                <stop offset="100%" stop-color="#4facfe" />
            </linearGradient>
            <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0f2027" />
                <stop offset="50%" stop-color="#203a43" />
                <stop offset="100%" stop-color="#2c5364" />
            </linearGradient>
            <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad2)"/>
        <g transform="translate(50, 40)" filter="url(#neon)">
            <rect x="20" y="20" width="60" height="60" rx="15" fill="none" stroke="url(#cyberGrad)" stroke-width="8"/>
            <circle cx="35" cy="45" r="8" fill="#ff007c"/>
            <circle cx="65" cy="45" r="8" fill="#00f2fe"/>
            <path d="M30 70 L70 70" stroke="url(#cyberGrad)" stroke-width="6" stroke-linecap="round"/>
            <path d="M40 70 L40 85 M50 70 L50 85 M60 70 L60 85" stroke="url(#cyberGrad)" stroke-width="4" stroke-linecap="round"/>
            <path d="M10 50 L0 40 M90 50 L100 40" stroke="#ff007c" stroke-width="6" stroke-linecap="round"/>
        </g>
    </svg>`,

    // 3. Magical Potion / Abstract Flame
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="magicGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#a18cd1" />
                <stop offset="100%" stop-color="#fbc2eb" />
            </linearGradient>
            <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2a0845" />
                <stop offset="100%" stop-color="#6441A5" />
            </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad3)"/>
        <g transform="translate(60, 45)">
            <path d="M40 100 C 10 100, 10 60, 40 40 C 70 60, 70 100, 40 100 Z" fill="url(#magicGrad)" opacity="0.9"/>
            <path d="M40 10 C 30 30, 20 40, 40 60 C 60 40, 50 30, 40 10 Z" fill="#ff9a44" opacity="0.8"/>
            <circle cx="40" cy="75" r="10" fill="#ffffff" opacity="0.5"/>
            <circle cx="30" cy="55" r="4" fill="#ffffff" opacity="0.8"/>
            <circle cx="55" cy="65" r="6" fill="#ffffff" opacity="0.6"/>
            <circle cx="45" cy="20" r="3" fill="#ffffff" opacity="0.9"/>
            <circle cx="25" cy="15" r="5" fill="#fbc2eb" opacity="0.8"/>
            <circle cx="60" cy="30" r="4" fill="#a18cd1" opacity="0.8"/>
        </g>
    </svg>`,

    // 4. Golden Owl / Geometric Animal
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f6d365" />
                <stop offset="100%" stop-color="#fda085" />
            </linearGradient>
            <linearGradient id="bgGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#000000" />
                <stop offset="100%" stop-color="#434343" />
            </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad4)"/>
        <g transform="translate(45, 45)">
            <polygon points="55,20 20,40 55,60" fill="url(#goldGrad)" opacity="0.8"/>
            <polygon points="55,20 90,40 55,60" fill="url(#goldGrad)" opacity="1.0"/>
            <polygon points="20,40 55,100 55,60" fill="url(#goldGrad)" opacity="0.6"/>
            <polygon points="90,40 55,100 55,60" fill="url(#goldGrad)" opacity="0.9"/>
            <polygon points="10,20 20,40 30,10" fill="#ffffff" opacity="0.9"/>
            <polygon points="100,20 90,40 80,10" fill="#ffffff" opacity="0.9"/>
            <circle cx="40" cy="50" r="8" fill="#000000"/>
            <circle cx="70" cy="50" r="8" fill="#000000"/>
            <circle cx="42" cy="48" r="3" fill="#ffffff"/>
            <circle cx="72" cy="48" r="3" fill="#ffffff"/>
        </g>
    </svg>`,

    // 5. Retro Arcade / Gamepad Logo
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="retroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff0844" />
                <stop offset="100%" stop-color="#ffb199" />
            </linearGradient>
            <linearGradient id="bgGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#2b5876" />
                <stop offset="100%" stop-color="#4e4376" />
            </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad5)"/>
        <g transform="translate(30, 60)">
            <rect x="0" y="0" width="140" height="80" rx="40" fill="url(#retroGrad)"/>
            <rect x="0" y="0" width="140" height="80" rx="40" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.5"/>
            
            <!-- D-Pad -->
            <rect x="25" y="32" width="30" height="10" rx="2" fill="#2b5876"/>
            <rect x="35" y="22" width="10" height="30" rx="2" fill="#2b5876"/>
            
            <!-- Buttons -->
            <circle cx="100" cy="45" r="8" fill="#ffffff"/>
            <circle cx="115" cy="30" r="8" fill="#f9d423"/>
            
            <!-- Stripes -->
            <path d="M 60 0 L 80 80 M 70 0 L 90 80" stroke="#ffffff" stroke-width="6" opacity="0.3"/>
        </g>
    </svg>`,

    // 6. 3D Crystal / Diamond
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="crystal1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#84fab0" />
                <stop offset="100%" stop-color="#8fd3f4" />
            </linearGradient>
            <linearGradient id="crystal2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4facfe" />
                <stop offset="100%" stop-color="#00f2fe" />
            </linearGradient>
            <linearGradient id="bgGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#09203f" />
                <stop offset="100%" stop-color="#537895" />
            </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#bgGrad6)"/>
        <g transform="translate(50, 40)">
            <polygon points="50,0 100,30 50,120 0,30" fill="url(#crystal1)" opacity="0.9"/>
            <polygon points="50,0 100,30 50,45" fill="#ffffff" opacity="0.6"/>
            <polygon points="50,0 0,30 50,45" fill="url(#crystal2)" opacity="0.8"/>
            <polygon points="0,30 50,45 50,120" fill="url(#crystal2)" opacity="0.5"/>
            <polygon points="100,30 50,45 50,120" fill="url(#crystal1)" opacity="0.7"/>
            <circle cx="50" cy="-10" r="4" fill="#ffffff" opacity="0.8"/>
            <circle cx="110" cy="20" r="3" fill="#ffffff" opacity="0.6"/>
            <circle cx="-10" cy="20" r="5" fill="#ffffff" opacity="0.5"/>
        </g>
    </svg>`
]
