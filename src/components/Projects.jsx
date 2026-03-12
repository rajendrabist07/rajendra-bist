import React, { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

// ── Rich SVG Project Previews ──────────────────────────────────

const PortfolioPreview = () => (
  <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="560" height="340" fill="#050508"/>
    {/* Ambient orb */}
    <circle cx="400" cy="100" r="140" fill="rgba(0,212,255,0.07)"/>
    <circle cx="150" cy="240" r="100" fill="rgba(168,85,247,0.07)"/>
    {/* Grid */}
    <pattern id="pg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
    </pattern>
    <rect width="560" height="340" fill="url(#pg)"/>
    {/* Navbar */}
    <rect x="0" y="0" width="560" height="44" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
    <circle cx="22" cy="22" r="7" fill="#00d4ff"/>
    <text x="34" y="26" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="white" opacity="0.9">RB.</text>
    {/* Nav links */}
    {['About','Skills','Projects','Contact'].map((l,i) => (
      <text key={l} x={240+i*72} y="26" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.4)">{l}</text>
    ))}
    <rect x="488" y="14" width="54" height="16" rx="5" fill="#00d4ff" opacity="0.9"/>
    <text x="497" y="25" fontFamily="monospace" fontSize="7" fill="#000" fontWeight="bold">GitHub</text>
    {/* Hero text */}
    <text x="40" y="85" fontFamily="sans-serif" fontSize="8" fill="rgba(0,212,255,0.7)" letterSpacing="2">HELLO, I'M</text>
    <text x="38" y="118" fontFamily="sans-serif" fontSize="28" fontWeight="bold" fill="white" letterSpacing="-1">Rajendra</text>
    <text x="38" y="148" fontFamily="sans-serif" fontSize="28" fontWeight="bold" letterSpacing="-1">
      <tspan fill="#00d4ff">Bist</tspan>
    </text>
    <text x="40" y="168" fontFamily="monospace" fontSize="7" fill="rgba(0,212,255,0.6)" letterSpacing="1">FULL-STACK DEVELOPER · SYSTEMS-FIRST</text>
    <text x="40" y="188" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="300">I build web applications by focusing on fundamentals first</text>
    <text x="40" y="200" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="300">— structure, constraints, and predictable behavior.</text>
    {/* Chips */}
    {['⬡ Interfaces that scale','⬡ Clean code','⬡ Full-stack'].map((c,i) => (
      <g key={c}>
        <rect x={40+i*120} y="214" width={112} height="16" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        <text x={44+i*120} y="225" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.4)">{c}</text>
      </g>
    ))}
    {/* CTA buttons */}
    <rect x="40" y="242" width="110" height="28" rx="7" fill="#00d4ff"/>
    <text x="62" y="260" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#000">View Projects</text>
    <rect x="160" y="242" width="110" height="28" rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
    <text x="178" y="260" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,0.6)">Explore Work →</text>
    {/* Photo circle placeholder */}
    <circle cx="440" cy="190" r="90" fill="rgba(0,212,255,0.03)" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
    <circle cx="440" cy="190" r="70" fill="rgba(0,212,255,0.08)"/>
    <circle cx="440" cy="178" r="28" fill="rgba(168,85,247,0.3)"/>
    <ellipse cx="440" cy="218" rx="42" ry="22" fill="rgba(168,85,247,0.2)"/>
    {/* React badge */}
    <rect x="490" y="128" width="54" height="18" rx="5" fill="rgba(0,0,0,0.7)" stroke="rgba(97,218,251,0.3)" strokeWidth="0.5"/>
    <text x="497" y="140" fontFamily="monospace" fontSize="7" fill="#61dafb">React</text>
    {/* Node badge */}
    <rect x="370" y="270" width="56" height="18" rx="5" fill="rgba(0,0,0,0.7)" stroke="rgba(104,160,99,0.3)" strokeWidth="0.5"/>
    <text x="374" y="282" fontFamily="monospace" fontSize="7" fill="#68a063">Node.js</text>
    {/* Scroll indicator */}
    <rect x="270" y="318" width="1" height="14" rx="0.5" fill="rgba(0,212,255,0.3)"/>
    <text x="256" y="327" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.2)">SCROLL</text>
  </svg>
)

const EcommercePreview = () => (
  <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="560" height="340" fill="#0a0a14"/>
    {/* Sidebar */}
    <rect x="0" y="0" width="140" height="340" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <text x="16" y="28" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#a855f7" letterSpacing="-0.5">ShopUI</text>
    {/* Sidebar nav */}
    {['Dashboard','Products','Cart','Orders','Settings'].map((item,i) => (
      <g key={item}>
        <rect x="10" y={46+i*38} width="120" height="28" rx="6" fill={i===1?'rgba(168,85,247,0.15)':'transparent'} stroke={i===1?'rgba(168,85,247,0.3)':'transparent'} strokeWidth="0.5"/>
        <circle cx="24" cy={46+i*38+14} r="4" fill={i===1?'#a855f7':'rgba(255,255,255,0.15)'}/>
        <text x="34" y={46+i*38+18} fontFamily="sans-serif" fontSize="8" fill={i===1?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.35)'}>{item}</text>
      </g>
    ))}
    {/* Cart badge */}
    <rect x="510" y="10" width="36" height="24" rx="6" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5"/>
    <text x="518" y="26" fontFamily="monospace" fontSize="9" fill="#a855f7">🛒 3</text>
    {/* Search bar */}
    <rect x="155" y="10" width="200" height="24" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
    <text x="165" y="25" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.25)">🔍 Search products...</text>
    {/* Filter chips */}
    {['All','Electronics','Fashion','Books','Sports'].map((f,i) => (
      <g key={f}>
        <rect x={155+i*74} y="44" width="68" height="18" rx="9" fill={i===0?'#a855f7':'rgba(255,255,255,0.04)'} stroke={i===0?'none':'rgba(255,255,255,0.07)'} strokeWidth="0.5"/>
        <text x={163+i*74} y="56" fontFamily="sans-serif" fontSize="7" fill={i===0?'white':'rgba(255,255,255,0.4)'}>{f}</text>
      </g>
    ))}
    {/* Product grid */}
    {[0,1,2,3,4,5,6,7].map(i => {
      const col = i % 4, row = Math.floor(i / 4)
      const colors = ['rgba(168,85,247,0.25)','rgba(0,212,255,0.2)','rgba(34,211,164,0.2)','rgba(245,158,11,0.2)']
      const prices = ['$49.99','$129.00','$24.99','$89.50','$19.99','$199.00','$59.99','$34.99']
      return (
        <g key={i}>
          <rect x={155+col*100} y={72+row*124} width="92" height="114" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
          <rect x={163+col*100} y={80+row*124} width="76" height="54" rx="5" fill={colors[i%4]}/>
          {/* Product icon */}
          <text x={188+col*100} y={112+row*124} fontSize="18" textAnchor="middle">
            {['💻','📱','👕','📚','🎮','⌚','🎧','👟'][i]}
          </text>
          <text x={163+col*100} y={148+row*124} fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.7)" fontWeight="500">{['MacBook Pro','iPhone 15','T-Shirt','React Book','PlayStation','Apple Watch','AirPods','Sneakers'][i]}</text>
          <text x={163+col*100} y={159+row*124} fontFamily="monospace" fontSize="8" fill="#a855f7" fontWeight="bold">{prices[i]}</text>
          <rect x={163+col*100} y={166+row*124} width="76" height="14" rx="4" fill="rgba(168,85,247,0.7)"/>
          <text x={181+col*100} y={176+row*124} fontFamily="sans-serif" fontSize="7" fill="white" fontWeight="500">Add to Cart</text>
        </g>
      )
    })}
  </svg>
)

const LandingPreview = () => (
  <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="bg-land" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#050508"/>
        <stop offset="100%" stopColor="#0d0820"/>
      </linearGradient>
      <linearGradient id="btn-land" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00d4ff"/>
        <stop offset="100%" stopColor="#a855f7"/>
      </linearGradient>
    </defs>
    <rect width="560" height="340" fill="url(#bg-land)"/>
    {/* Orbs */}
    <circle cx="460" cy="80" r="120" fill="rgba(168,85,247,0.1)"/>
    <circle cx="100" cy="260" r="90" fill="rgba(0,212,255,0.08)"/>
    {/* Navbar */}
    <rect x="0" y="0" width="560" height="46" fill="rgba(5,5,8,0.85)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <circle cx="22" cy="23" r="8" fill="#a855f7" opacity="0.9"/>
    <text x="36" y="27" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="white" opacity="0.9">TechFlow</text>
    {['Features','Pricing','Docs','About'].map((l,i) => (
      <text key={l} x={220+i*72} y="28" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.45)">{l}</text>
    ))}
    <rect x="488" y="14" width="58" height="18" rx="9" fill="url(#btn-land)" opacity="0.9"/>
    <text x="498" y="26" fontFamily="sans-serif" fontSize="8" fill="white" fontWeight="bold">Get Started</text>
    {/* Hero badge */}
    <rect x="200" y="60" width="160" height="18" rx="9" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5"/>
    <circle cx="214" cy="69" r="3" fill="#a855f7"/>
    <text x="220" y="72" fontFamily="monospace" fontSize="7" fill="rgba(168,85,247,0.9)">✦ Launching v2.0 — Now Live</text>
    {/* Headline */}
    <text x="185" y="104" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" letterSpacing="-0.5" textAnchor="middle">
      Build Faster,
    </text>
    <text x="280" y="104" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" letterSpacing="-0.5" textAnchor="middle">Build Faster,</text>
    <text x="280" y="128" fontFamily="sans-serif" fontSize="20" fontWeight="bold" textAnchor="middle" letterSpacing="-0.5">
      <tspan fill="url(#btn-land)">Ship Smarter</tspan>
    </text>
    <text x="280" y="150" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontWeight="300">The modern platform for teams who ship production-grade</text>
    <text x="280" y="162" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontWeight="300">web applications with clarity and confidence.</text>
    {/* CTA buttons */}
    <rect x="185" y="176" width="110" height="28" rx="14" fill="url(#btn-land)" opacity="0.95"/>
    <text x="216" y="194" fontFamily="sans-serif" fontSize="9" fill="white" fontWeight="bold">Start for Free →</text>
    <rect x="304" y="176" width="90" height="28" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
    <text x="327" y="194" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,0.6)">Watch Demo</text>
    {/* Stats row */}
    {[['10K+','Users'],['99.9%','Uptime'],['50ms','Avg Load'],['4.9★','Rating']].map(([n,l],i) => (
      <g key={l}>
        <text x={80+i*110} y="232" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">{n}</text>
        <text x={80+i*110} y="246" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.35)" textAnchor="middle">{l}</text>
      </g>
    ))}
    {/* Feature cards */}
    {[
      ['⚡','Fast Deploy','One-click deploy to production'],
      ['🔒','Secure','Enterprise-grade security built in'],
      ['📊','Analytics','Real-time insights dashboard'],
    ].map(([icon,title,desc],i) => (
      <g key={title}>
        <rect x={40+i*168} y={264} width="154" height="62" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <text x={56+i*168} y={286} fontSize="14">{icon}</text>
        <text x={76+i*168} y={286} fontFamily="sans-serif" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.85)">{title}</text>
        <text x={56+i*168} y={300} fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.35)">{desc}</text>
        <rect x={56+i*168} y={310} width="44" height="10" rx="3" fill="rgba(168,85,247,0.2)"/>
        <text x={62+i*168} y={318} fontFamily="monospace" fontSize="6" fill="#a855f7">Learn more →</text>
      </g>
    ))}
  </svg>
)

const DashboardPreview = () => (
  <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="560" height="340" fill="#07070f"/>
    {/* Sidebar */}
    <rect x="0" y="0" width="150" height="340" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
    <text x="16" y="26" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#00d4ff" letterSpacing="-0.3">Analytics Pro</text>
    <text x="16" y="36" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.25)">v2.4.1</text>
    {['Overview','Revenue','Users','Reports','Settings'].map((item,i) => (
      <g key={item}>
        <rect x="10" y={52+i*38} width="130" height="28" rx="6" fill={i===0?'rgba(0,212,255,0.12)':'transparent'} stroke={i===0?'rgba(0,212,255,0.25)':'transparent'} strokeWidth="0.5"/>
        <circle cx="24" cy={52+i*38+14} r="3.5" fill={i===0?'#00d4ff':i===1?'#a855f7':i===2?'#22d3a4':i===3?'#f59e0b':'rgba(255,255,255,0.2)'}/>
        <text x="34" y={52+i*38+18} fontFamily="sans-serif" fontSize="8" fill={i===0?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.35)'}>{item}</text>
        {i===0 && <text x="118" y={52+i*38+18} fontFamily="monospace" fontSize="6" fill="#00d4ff">→</text>}
      </g>
    ))}
    {/* User avatar bottom */}
    <circle cx="25" cy="318" r="12" fill="rgba(0,212,255,0.2)"/>
    <text x="18" y="322" fontSize="10">😊</text>
    <text x="42" y="315" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.6)">Rajendra</text>
    <text x="42" y="325" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.25)">Admin</text>
    {/* Header */}
    <rect x="155" y="0" width="405" height="42" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <text x="166" y="26" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="rgba(255,255,255,0.85)">Overview</text>
    <text x="255" y="22" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.2)">Last 30 days</text>
    <rect x="438" y="10" width="60" height="22" rx="6" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.25)" strokeWidth="0.5"/>
    <text x="446" y="24" fontFamily="monospace" fontSize="7" fill="#00d4ff">⬇ Export</text>
    {/* KPI cards */}
    {[
      {label:'Total Revenue',val:'$84,240',change:'+12.4%',color:'#00d4ff',icon:'💰'},
      {label:'Active Users',val:'24,891',change:'+8.1%',color:'#a855f7',icon:'👥'},
      {label:'Conversion',val:'3.42%',change:'+0.8%',color:'#22d3a4',icon:'📈'},
      {label:'Avg Session',val:'4m 22s',change:'-2.1%',color:'#f59e0b',icon:'⏱'},
    ].map((k,i) => (
      <g key={k.label}>
        <rect x={160+i*98} y="50" width="90" height="60" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        <text x={168+i*98} y="68" fontSize="10">{k.icon}</text>
        <text x={168+i*98} y="82" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.35)">{k.label}</text>
        <text x={168+i*98} y="96" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="rgba(255,255,255,0.9)">{k.val}</text>
        <text x={228+i*98} y="66" fontFamily="monospace" fontSize="6" fill={k.change.startsWith('+')?'#22d3a4':'#f87171'}>{k.change}</text>
      </g>
    ))}
    {/* Bar chart */}
    <rect x="160" y="122" width="230" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <text x="170" y="138" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.7)">Revenue Trend</text>
    {[58,80,42,95,68,87,55,96,73,90,62,100].map((h,i) => (
      <g key={i}>
        <rect x={170+i*17} y={230-h*0.72} width="12" height={h*0.72} rx="3"
          fill={i===11?'#00d4ff':i===7?'#00d4ff':'rgba(0,212,255,0.3)'}/>
      </g>
    ))}
    {['Jan','Apr','Jul','Oct'].map((m,i) => (
      <text key={m} x={170+i*51} y="245" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.25)">{m}</text>
    ))}
    {/* Line chart */}
    <rect x="400" y="122" width="155" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <text x="410" y="138" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.7)">User Growth</text>
    <polyline points="410,220 430,205 450,210 470,190 490,195 510,175 530,165 545,155"
      fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
    <polygon points="410,225 410,220 430,205 450,210 470,190 490,195 510,175 530,165 545,155 545,225"
      fill="rgba(168,85,247,0.1)"/>
    {/* Recent activity table */}
    <rect x="160" y="252" width="392" height="76" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    <text x="170" y="268" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.7)">Recent Transactions</text>
    {[
      ['Sarah K.','E-comm purchase','$129.00','✅'],
      ['Mike R.','Subscription plan','$49.99','✅'],
      ['Ana P.','Premium upgrade','$199.00','⏳'],
    ].map(([name,type,amt,status],i) => (
      <g key={name}>
        <line x1="170" y1={277+i*18} x2="540" y2={277+i*18} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <text x="170" y={288+i*18} fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.6)">{name}</text>
        <text x="260" y={288+i*18} fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.3)">{type}</text>
        <text x="440" y={288+i*18} fontFamily="monospace" fontSize="7" fill="#22d3a4">{amt}</text>
        <text x="510" y={288+i*18} fontSize="8">{status}</text>
      </g>
    ))}
  </svg>
)

// ── Live Demo Modal ─────────────────────────────────────────────

function DemoModal({ project, onClose }) {
  const [viewMode, setViewMode] = useState(project.initialView || 'preview')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  const PreviewComponents = {
    portfolio: PortfolioPreview,
    ecommerce: EcommercePreview,
    landing:   LandingPreview,
    dashboard: DashboardPreview,
  }
  const Preview = PreviewComponents[project.type]

  // Mock code content
  const codeSnippet = `import React from 'react';
import { useStore } from '@store';
import { Analytics } from '@monitoring';

export default function ${project.title.replace(/\s+/g,'')}Core() {
  const { data, loading } = useStore();

  React.useEffect(() => {
    Analytics.trackView('${project.title}');
  }, []);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="system-wrapper">
      {/* 
        Scalable ${project.type} architecture 
        Feature sets:
        ${project.features.map(f => `// - ${f}`).join('\n        ')}
      */}
      <SystemRenderer data={data} theme="glassmorphism" />
    </div>
  );
}`

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'modal-in 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 60px ${project.accent}20`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)',
        }}>
          {/* Browser chrome dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1, margin: '0 16px',
            padding: '6px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}>
            🔒 rajendrabist.vercel.app/{project.type}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '4px',
              borderRadius: '6px',
              transition: 'color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-card)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Preview area */}
        <div style={{
          flex: 1, overflow: 'auto',
          background: viewMode === 'code' ? '#0d0d14' : '#000',
          display: 'flex', alignItems: viewMode === 'code' ? 'flex-start' : 'center', justifyContent: viewMode === 'code' ? 'flex-start' : 'center',
        }}>
          {viewMode === 'preview' ? (
            <Preview />
          ) : (
            <div style={{ padding: '30px', width: '100%', height: '100%', boxSizing: 'border-box' }}>
               <pre style={{
                 margin: 0,
                 fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                 color: 'var(--text-secondary)',
                 lineHeight: 1.6,
                 whiteSpace: 'pre-wrap',
               }}>
                 <code dangerouslySetInnerHTML={{__html: codeSnippet.replace(/span/g, 'span').replace(/import|from|export|default|function|const|return|if/g, match => `<span style="color:${project.accent}">${match}</span>`)}} />
               </pre>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-primary)',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '0.95rem',
              color: 'var(--text-primary)',
              marginRight: '8px',
            }}>{project.title}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: project.accent, opacity: 0.8,
            }}>{project.subtitle}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {viewMode === 'preview' ? (
              <button onClick={() => setViewMode('code')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 14px', border: 'none' }}>
                <GithubIcon /> View Source Code
              </button>
            ) : (
              <button onClick={() => setViewMode('preview')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '7px 14px', border: 'none' }}>
                👁️ View Live Demo
              </button>
            )}
            <button onClick={onClose}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '7px 14px' }}>
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ── Project data ───────────────────────────────────────────────

const projects = [
  {
    id: 1,
    type: 'portfolio',
    number: '01',
    title: 'Developer Portfolio',
    subtitle: 'UI Engineering & Component Architecture',
    description: 'A personal portfolio built to demonstrate UI engineering discipline — not just what I build, but how I think about component architecture, design systems, and frontend performance under real constraints.',
    features: [
      'Dark/Light glassmorphism theme system',
      'Smooth IntersectionObserver reveal animations',
      'Zero-rerender CSS-driven theme switching',
      'Lazy-loaded sections for instant First Paint',
    ],
    stack: ['React', 'Vite', 'CSS Custom Props', 'IntersectionObserver'],
    accent: '#00d4ff',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 2,
    type: 'ecommerce',
    number: '02',
    title: 'E-Commerce UI',
    subtitle: 'State Management & API Integration',
    description: 'A production-quality e-commerce interface with real API data fetching, shopping cart state management, and dynamic filter/search systems. Designed to handle real-world product catalog complexity.',
    features: [
      'Product listing with live REST API integration',
      'Shopping cart with persistent state logic',
      'Multi-criteria filter & search system',
      'Optimistic UI with loading skeletons',
    ],
    stack: ['React', 'Context API', 'REST API', 'TypeScript'],
    accent: '#a855f7',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 3,
    type: 'landing',
    number: '03',
    title: 'Landing Page Engineering',
    subtitle: 'Layout Precision & Micro-interactions',
    description: 'A high-fidelity product landing page inspired by top-tier tech companies. Every layout decision, visual hierarchy choice, and micro-interaction is intentional — demonstrating frontend layout mastery.',
    features: [
      'Pixel-perfect layout with visual hierarchy',
      'Scroll-triggered CSS micro-interactions',
      'Performance-first critical CSS path',
      'Responsive from 320px to 4K displays',
    ],
    stack: ['React', 'Tailwind CSS', 'CSS Animations', 'Vite'],
    accent: '#22d3a4',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 4,
    type: 'dashboard',
    number: '04',
    title: 'Analytics Dashboard',
    subtitle: 'Complex UI Systems & Data Visualization',
    description: 'An analytics dashboard with interactive charts, real-time stat cards, sortable data tables, and multi-dimensional KPI visualization. Built to scale to hundreds of data points without losing performance.',
    features: [
      'Interactive bar & line chart components',
      'Real-time KPI cards with trend indicators',
      'Sortable, filterable data tables',
      'Responsive sidebar navigation system',
    ],
    stack: ['React', 'SVG Charts', 'TypeScript', 'Tailwind CSS'],
    accent: '#f59e0b',
    github: 'https://github.com/rajendrabist07',
  },
]

const PreviewComponents = {
  portfolio: PortfolioPreview,
  ecommerce: EcommercePreview,
  landing:   LandingPreview,
  dashboard: DashboardPreview,
}

export default function Projects() {
  const sectionRef = useScrollReveal()
  const [modal, setModal] = useState(null)

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-label">03 — Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="section-subtitle" style={{ marginBottom: '60px' }}>
            Each project is a deliberate exercise in engineering thinking — not just functionality, but structure, performance, and maintainability.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {projects.map((project, idx) => {
            const Preview = PreviewComponents[project.type]
            const isEven = idx % 2 === 0
            return (
              <div
                key={project.id}
                className="reveal glass-card proj-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: isEven ? '1fr 1.15fr' : '1.15fr 1fr',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = project.accent + '50'
                  e.currentTarget.style.boxShadow = `0 8px 48px ${project.accent}12`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Preview on left for even, content on left for odd */}
                {!isEven && (
                  <div
                    onClick={() => setModal(project)}
                    style={{
                      background: 'var(--bg-secondary)',
                      borderRight: '1px solid var(--glass-border)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <Preview />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; e.currentTarget.querySelector('.play-btn').style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('.play-btn').style.opacity = '0' }}
                    >
                      <div className="play-btn" style={{
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px',
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${project.accent}50`,
                        borderRadius: '10px',
                        color: project.accent,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                        Preview
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: project.accent, opacity: 0.7 }}>{project.number}</span>
                    <div style={{ flex: 1, height: '1px', background: project.accent + '20' }} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem', fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px', letterSpacing: '-0.02em',
                  }}>{project.title}</h3>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem', color: project.accent,
                    marginBottom: '16px', opacity: 0.85, letterSpacing: '0.04em',
                  }}>{project.subtitle}</p>

                  <p style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)',
                    lineHeight: 1.75, fontWeight: 300, marginBottom: '20px',
                  }}>{project.description}</p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '22px' }}>
                    {project.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: project.accent, opacity: 0.7, fontSize: '0.55rem', marginTop: '4px', flexShrink: 0 }}>◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}>
                    {project.stack.map(tech => (
                      <span key={tech} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                        padding: '4px 10px',
                        border: `1px solid ${project.accent}28`,
                        borderRadius: '5px',
                        color: 'var(--text-muted)',
                        background: project.accent + '08',
                      }}>{tech}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setModal(project)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '10px 20px',
                        background: project.accent, color: '#000',
                        border: 'none', borderRadius: '8px',
                        fontSize: '0.82rem', fontWeight: 600,
                        fontFamily: 'var(--font-body)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${project.accent}40` }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <ExternalIcon /> Live Demo
                    </button>
                    <button
                      onClick={() => setModal({ ...project, initialView: 'code' })}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '10px 20px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        fontSize: '0.82rem', fontWeight: 500,
                        fontFamily: 'var(--font-body)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      <GithubIcon /> Source
                    </button>
                  </div>
                </div>

                {/* Preview on right for even */}
                {isEven && (
                  <div
                    onClick={() => setModal(project)}
                    style={{
                      background: 'var(--bg-secondary)',
                      borderLeft: '1px solid var(--glass-border)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <Preview />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; e.currentTarget.querySelector('.play-btn').style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('.play-btn').style.opacity = '0' }}
                    >
                      <div className="play-btn" style={{
                        opacity: 0, transition: 'opacity 0.2s ease',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px',
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${project.accent}50`,
                        borderRadius: '10px',
                        color: project.accent,
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                        Preview
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Live Demo Modal */}
      {modal && <DemoModal project={modal} onClose={() => setModal(null)} />}

      <style>{`
        @media (max-width: 768px) {
          .proj-card { grid-template-columns: 1fr !important; }
          .proj-card > div:first-child:not([style*="padding"]),
          .proj-card > div:last-child:not([style*="padding"]) { display: none !important; }
        }
      `}</style>
    </section>
  )
}
