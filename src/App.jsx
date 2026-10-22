import { useEffect, useRef, useState } from 'react'

// Add real project URLs here when they are ready. GitHub and LinkedIn are
// intentionally blank until Sahana provides her profile links.
const portfolio = {
  email: 'sahanan2468@gmail.com',
  links: { goldenGrind: 'https://cafe-eosin-psi.vercel.app/', insightFlow: '', resume: '/resume.pdf', github: '', linkedin: '' },
  projects: [
    {
      id: 'golden', number: '01', name: 'Golden Grind', kind: 'WEB DESIGN',
      description: 'A cafe website for The Golden Grind, designed to welcome visitors with a warm coffeehouse feel and make the menu easy to explore.',
      focus: ['Hero section with welcome message and menu call to action', 'Navigation for Home, About, Menu, and Contact', 'Featured coffee and dessert cards with descriptions and prices', 'Warm, image led layout with a clear path to the full menu'],
      technologies: ['HTML', 'CSS', 'JavaScript'], backend: 'No backend details were provided; the screenshot shows the front end.',
      linkKey: 'goldenGrind', visual: 'visual-cafe', status: 'PROJECT ENTRY',
    },
    {
      id: 'insight', number: '02', name: 'InsightFlow AI', kind: 'DATA / AI',
      description: 'A data and AI project exploring data preparation, analysis, visualization, and machine learning concepts.',
      focus: ['Data cleaning and preparation', 'Statistics and visualization', 'Machine learning concepts'],
      technologies: ['Python', 'Data analysis', 'ML concepts'],
      linkKey: 'insightFlow', visual: 'visual-data', status: 'IN PROGRESS',
    },
  ],
}

// These entries reflect the short descriptions Sahana supplied. Confirm each
// certificate's exact title and issuer before switching `verified` to true.
// Remove an entry from this list if it should not appear on the portfolio.
const certificates = [
  { id: 'ai', subject: 'AI fundamentals', issuer: 'Adobe (reported)', date: '', verificationUrl: '', verified: false },
  { id: 'full-stack', subject: 'Full Stack', issuer: 'Web Gen (reported)', date: '', verificationUrl: '', verified: false },
]

const worldLinks = [
  { id: 'about', index: '01 / PERSON', title: 'About me', hint: 'The person behind the pixels', icon: '◉', style: 'card-about' },
  { id: 'skills', index: '02 / TOOLKIT', title: 'My skills', hint: 'Things I’m learning to do', icon: '⌘', style: 'card-skills' },
  { id: 'projects', index: '03 / IN PRACTICE', title: 'My projects', hint: 'Ideas made tangible', icon: '✳', style: 'card-projects' },
  { id: 'certificates', index: '04 / MILESTONES', title: 'Certificates', hint: 'Details to confirm', icon: '✧', style: 'card-certificates' },
  { id: 'resume', index: '05 / THE DETAILS', title: 'Resume', hint: 'View my resume', icon: '↗', style: 'card-resume' },
  { id: 'contact', index: '06 / SAY HELLO', title: 'Contact me', hint: 'Good things start here', icon: '✉', style: 'card-contact' },
]

const skillGroups = [
  { label: '01 — WEB DEVELOPMENT', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { label: '02 — PROGRAMMING & DATA', skills: ['Python', 'Java', 'SQL', 'C'] },
  { label: '03 — DATA & AI', skills: ['Data analysis', 'Data visualization', 'Introductory AI / ML concepts'] },
  { label: '04 — AI TOOLS', skills: ['ChatGPT', 'OpenAI Codex', 'Claude', 'Replit', 'Canva', 'Lovable'] },
  { label: '05 — TOOLS', skills: ['VS Code', 'GitHub', 'Microsoft PowerPoint', 'Microsoft Excel'] },
  { label: '06 — CORE IT KNOWLEDGE', skills: ['DBMS', 'DSA', 'OOP', 'OS', 'Software Engineering', 'Computer Networks', 'PST'] },
]

function playKeyClick(contextRef) {
  try {
    const context = contextRef.current || new window.AudioContext()
    contextRef.current = context
    if (context.state === 'suspended') context.resume()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 760
    gain.gain.setValueAtTime(0.022, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.035)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.04)
  } catch {
    // The intro works normally when a browser does not provide Web Audio.
  }
}

function Intro({ onEnter }) {
  const [stage, setStage] = useState('egg')
  const [cracked, setCracked] = useState(false)
  const [typed, setTyped] = useState('')
  const [sound, setSound] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const soundRef = useRef(false)
  const crackTimer = useRef(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener?.('change', updatePreference)
    return () => preference.removeEventListener?.('change', updatePreference)
  }, [])

  // The particle canvas is intentionally low density and pauses when the intro closes.
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    resize()
    const dust = Array.from({ length: Math.min(80, Math.floor(window.innerWidth / 16)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.34 + 0.1,
      drift: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
    }))
    let frame = 0
    const draw = (time = 0) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      dust.forEach((particle) => {
        particle.x = (particle.x + particle.drift + window.innerWidth) % window.innerWidth
        const pulse = reducedMotion ? 1 : 0.72 + Math.sin(time / 1100 + particle.phase) * 0.28
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(222, 185, 106, ${particle.alpha * pulse})`
        context.fill()
      })
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (stage !== 'reveal') return undefined
    const name = 'SAHANA'
    if (reducedMotion) return undefined
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTyped(name.slice(0, index))
      if (soundRef.current) playKeyClick(audioRef)
      if (index >= name.length) window.clearInterval(timer)
    }, 190)
    return () => window.clearInterval(timer)
  }, [stage, reducedMotion])

  useEffect(() => () => window.clearTimeout(crackTimer.current), [])

  function crackEgg() {
    if (cracked) return
    setCracked(true)
    crackTimer.current = window.setTimeout(() => setStage('reveal'), reducedMotion ? 0 : 560)
  }

  function skipIntro() {
    window.clearTimeout(crackTimer.current)
    onEnter()
  }

  return (
    <div className={`intro ${stage === 'reveal' ? 'is-open' : ''}`} id="intro" aria-label="Welcome">
      <canvas className="particles" ref={canvasRef} aria-hidden="true" />
      <div className="intro-orb intro-orb-one" aria-hidden="true" />
      <div className="intro-orb intro-orb-two" aria-hidden="true" />
      <div className="river-scene" aria-hidden="true">
        <div className="river-bank river-bank-back" />
        <svg className="river-water" viewBox="0 0 1600 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="river-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#172e2b" /><stop offset=".48" stopColor="#23433d" /><stop offset="1" stopColor="#132824" /></linearGradient>
            <pattern id="river-ripples" width="180" height="48" patternUnits="userSpaceOnUse"><path d="M-20 20 Q20 5 60 20 T140 20 T220 20 M20 41 Q55 27 95 41 T175 41" fill="none" stroke="#d0b875" strokeOpacity=".18" strokeWidth="1" /></pattern>
          </defs>
          <path d="M-100 175 C170 55 355 125 535 245 C765 397 905 390 1080 260 C1260 125 1435 112 1710 250 L1710 700 L-100 700Z" fill="url(#river-fill)" />
          <path className="river-shimmer" d="M-100 175 C170 55 355 125 535 245 C765 397 905 390 1080 260 C1260 125 1435 112 1710 250 L1710 700 L-100 700Z" fill="url(#river-ripples)" />
          <path d="M-100 175 C170 55 355 125 535 245 C765 397 905 390 1080 260 C1260 125 1435 112 1710 250" fill="none" stroke="#b59b61" strokeOpacity=".38" strokeWidth="2" />
        </svg>
        <div className="river-bank river-bank-front" />
        <span className="river-reed reed-one" /><span className="river-reed reed-two" /><span className="river-reed reed-three" />
      </div>
      <p className="intro-welcome">WELCOME TO MY WORLD</p>
      {stage === 'egg' || stage === 'cracking' ? (
        <button className={`egg ${cracked ? 'is-cracked' : ''}`} type="button" onClick={crackEgg} aria-label="Tap the floating egg to discover Sahana">
          <span className="egg-shell"><span className="egg-glint" /><svg className="egg-crack" viewBox="0 0 120 170" aria-hidden="true"><path d="M62 19 52 43 65 54 47 75 63 88 48 107 61 120 54 148" /><path d="m52 43-15-7m28 18 15-9m-33 30-14 1m30 12 14-7m-29 26-15 8m28 5 15 4" /></svg></span>
          <span className="egg-prompt"><span>START HERE</span><b>Tap the egg to enter</b></span>
        </button>
      ) : null}
      <div className="intro-reveal" aria-live="polite">
        <p className="eyebrow">HELLO, I’M</p>
        <h1><span className="sr-only">SAHANA</span><span className="typed-visible" aria-hidden="true">{reducedMotion ? 'SAHANA' : typed}</span><span className="caret" aria-hidden="true" /></h1>
        <p className="intro-tagline">BCA student. Web, data, and AI enthusiast.<br />Creative problem solver.</p>
        <button className="enter-button" type="button" onClick={onEnter}>Enter the portfolio <span>↗</span></button>
      </div>
      <div className="intro-controls">
        <button className="sound-toggle" type="button" aria-pressed={sound} onClick={() => { const nextSound = !sound; soundRef.current = nextSound; setSound(nextSound); if (nextSound) playKeyClick(audioRef) }} aria-label={sound ? 'Mute typing sound' : 'Enable typing sound'}>◖)) <span>Sound {sound ? 'on' : 'off'}</span></button>
        <button className="skip-button" type="button" onClick={skipIntro}>Skip intro <span>↗</span></button>
      </div>
      <p className="intro-footnote">A SMALL WINDOW INTO MY WORLD</p>
    </div>
  )
}

function WorldCard({ item }) {
  const drag = useRef(null)
  const wasDragged = useRef(false)

  function startDrag(event) {
    if (event.pointerType !== 'mouse') return
    drag.current = { x: event.clientX, y: event.clientY, dx: 0, dy: 0 }
    wasDragged.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event) {
    if (!drag.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    const deltaX = event.clientX - drag.current.x
    const deltaY = event.clientY - drag.current.y
    if (!wasDragged.current && Math.hypot(deltaX, deltaY) < 8) return
    wasDragged.current = true
    const card = event.currentTarget
    const parent = card.parentElement.getBoundingClientRect()
    const rect = card.getBoundingClientRect()
    const baseLeft = rect.left - drag.current.dx
    const baseTop = rect.top - drag.current.dy
    drag.current.dx = Math.max(parent.left - baseLeft, Math.min(parent.right - rect.width - baseLeft, deltaX))
    drag.current.dy = Math.max(parent.top - baseTop, Math.min(parent.bottom - rect.height - baseTop, deltaY))
    card.style.translate = `${drag.current.dx}px ${drag.current.dy}px`
    card.style.zIndex = '2'
  }

  function finishDrag(event) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (wasDragged.current) {
      const card = event.currentTarget
      window.setTimeout(() => { card.style.zIndex = '' }, 450)
    }
  }

  return (
    <a className={`world-card ${item.style}`} href={`#${item.id}`} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag} onClick={(event) => { if (wasDragged.current) { event.preventDefault(); wasDragged.current = false } }}>
      <span className="card-index">{item.index}</span><span className="world-icon">{item.icon}</span><span className="world-title">{item.title}</span><span className="world-hint">{item.hint}<b>↗</b></span>
    </a>
  )
}

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual ${project.visual}`} aria-hidden="true">
      {project.id === 'golden' ? <img className="cafe-screenshot" src="/golden-grind.png" alt="Screenshot of The Golden Grind cafe website" /> : <img className="insight-screenshot" src="/insightflow-ai.png" alt="Screenshot of the InsightFlow AI data analysis interface" />}
      <span className="visual-number">{project.number}</span><span className="visual-caption">{project.id === 'golden' ? 'WARMTH IN EVERY DETAIL' : 'FIND THE SIGNAL'}</span>
    </div>
  )
}

function ProjectDialog({ item, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    if (item) ref.current?.showModal()
    else if (ref.current?.open) ref.current.close()
  }, [item])

  return (
    <dialog className="project-dialog" ref={ref} aria-labelledby="dialog-title" onClose={onClose} onClick={(event) => { if (event.target === ref.current) onClose() }}>
      <button className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
      <p className="eyebrow">{item?.id === 'resume' ? 'RESUME' : 'PROJECT NOTES'}</p>
      <h2 id="dialog-title">{item?.id === 'resume' ? 'Resume' : item?.name}</h2>
      <p className="dialog-description">{item?.id === 'resume' ? 'View my resume.' : item?.description}</p>
      <div className={`dialog-screenshots ${item?.id === 'golden' ? 'dialog-golden-screenshot' : ''}`}>{item?.id === 'golden' ? <><img className="dialog-project-image" src="/golden-grind.png" alt="Full screenshot of The Golden Grind cafe website, including its welcome section and featured menu" /><a className="button button-outline screenshot-open" href="/golden-grind.png" target="_blank" rel="noreferrer">View full screenshot <span>↗</span></a></> : <div className="dialog-screenshot-placeholder">{item?.id === 'resume' ? 'Open the resume to view it.' : 'Project screenshots are not available yet.'}</div>}</div>
      {item?.id !== 'resume' && <><div className="dialog-block"><span className="dialog-label">WHAT I BUILT</span><ul>{item?.focus.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="dialog-block"><span className="dialog-label">FRONT END TECHNOLOGIES</span><div className="tech-list">{item?.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>{item?.backend && <div className="dialog-block"><span className="dialog-label">BACK END</span><p className="dialog-detail">{item.backend}</p></div>}<p className="dialog-message">The project image shows the website design. A live demo, source repository, and video are not currently linked.</p></>}
      {item?.id === 'resume' && <p className="dialog-message">The resume opens in a new tab.</p>}
    </dialog>
  )
}

async function readResumeDocx() {
  const response = await fetch('/Sahana_Resume_OnePage.docx')
  if (!response.ok) throw new Error('The resume file could not be loaded.')
  const buffer = await response.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const view = new DataView(buffer)
  let endRecord = -1
  for (let offset = bytes.length - 22; offset >= Math.max(0, bytes.length - 65_557); offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) { endRecord = offset; break }
  }
  if (endRecord < 0) throw new Error('The resume file could not be read.')
  const entryCount = view.getUint16(endRecord + 10, true)
  let entryOffset = view.getUint32(endRecord + 16, true)
  let xmlBytes
  const decoder = new TextDecoder()
  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(entryOffset, true) !== 0x02014b50) break
    const method = view.getUint16(entryOffset + 10, true)
    const compressedSize = view.getUint32(entryOffset + 20, true)
    const nameLength = view.getUint16(entryOffset + 28, true)
    const extraLength = view.getUint16(entryOffset + 30, true)
    const commentLength = view.getUint16(entryOffset + 32, true)
    const localOffset = view.getUint32(entryOffset + 42, true)
    const name = decoder.decode(bytes.subarray(entryOffset + 46, entryOffset + 46 + nameLength))
    if (name === 'word/document.xml') {
      const localNameLength = view.getUint16(localOffset + 26, true)
      const localExtraLength = view.getUint16(localOffset + 28, true)
      const dataOffset = localOffset + 30 + localNameLength + localExtraLength
      const compressed = bytes.slice(dataOffset, dataOffset + compressedSize)
      if (method === 0) xmlBytes = compressed
      else if (method === 8 && 'DecompressionStream' in window) {
        const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
        xmlBytes = new Uint8Array(await new Response(stream).arrayBuffer())
      } else throw new Error('This browser cannot display the resume file.')
      break
    }
    entryOffset += 46 + nameLength + extraLength + commentLength
  }
  if (!xmlBytes) throw new Error('Resume text was not found in the document.')
  const xml = new DOMParser().parseFromString(decoder.decode(xmlBytes), 'application/xml')
  const wordNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
  const paragraphs = Array.from(xml.getElementsByTagNameNS(wordNs, 'p')).map((paragraph) => {
    const style = paragraph.getElementsByTagNameNS(wordNs, 'pStyle')[0]?.getAttributeNS(wordNs, 'val') || ''
    const text = Array.from(paragraph.getElementsByTagNameNS(wordNs, 't')).map((node) => node.textContent).join('')
    const runs = Array.from(paragraph.getElementsByTagNameNS(wordNs, 'r')).filter((run) => run.getElementsByTagNameNS(wordNs, 't').length)
    const underlined = runs.length > 0 && runs.every((run) => run.getElementsByTagNameNS(wordNs, 'u').length > 0)
    return { style, text, underlined }
  }).filter((paragraph) => paragraph.text.trim())
  if (!paragraphs.length) throw new Error('No readable resume text was found.')
  return paragraphs
}

function ResumeViewer({ open, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    dialogRef.current?.showModal()
    return () => { if (dialogRef.current?.open) dialogRef.current.close() }
  }, [open])

  return (
    <dialog className="project-dialog resume-viewer" ref={dialogRef} aria-labelledby="resume-viewer-title" onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose() }}>
      <button className="dialog-close" type="button" onClick={onClose} aria-label="Close resume">×</button>
      <p className="eyebrow">RESUME</p>
      <h2 id="resume-viewer-title">Sahana’s resume</h2>
      <iframe className="resume-viewer-frame" src="/resume.pdf#toolbar=0&navpanes=0" title="Sahana’s professional resume" />
    </dialog>
  )
}

function App() {
  const [entered, setEntered] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showResume, setShowResume] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [emailCopyStatus, setEmailCopyStatus] = useState('')

  useEffect(() => {
    if (entered) document.body.classList.add('entered')
    return () => document.body.classList.remove('entered')
  }, [entered])

  useEffect(() => {
    const skipOnEscape = (event) => {
      if (event.key === 'Escape' && !entered && !selectedProject) setEntered(true)
    }
    window.addEventListener('keydown', skipOnEscape)
    return () => window.removeEventListener('keydown', skipOnEscape)
  }, [entered, selectedProject])

  function handleContact(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if (!portfolio.email) {
      setFormStatus('Your details look good. Add your email in src/App.jsx to prepare an email draft. Nothing has been sent.')
      return
    }
    const formData = new FormData(form)
    const subject = `Portfolio message from ${formData.get('name')}`
    const body = `From: ${formData.get('name')} (${formData.get('email')})\n\n${formData.get('message')}`
    setFormStatus('Your email app should open with the message ready. Nothing has been sent yet.')
    window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email)
      setEmailCopyStatus('Email copied to clipboard.')
    } catch {
      try {
        const fallback = document.createElement('textarea')
        fallback.value = portfolio.email
        fallback.setAttribute('readonly', '')
        fallback.style.position = 'fixed'
        fallback.style.opacity = '0'
        document.body.appendChild(fallback)
        fallback.select()
        const copied = document.execCommand('copy')
        fallback.remove()
        setEmailCopyStatus(copied ? 'Email copied to clipboard.' : 'Could not copy email. Please select and copy the address.')
      } catch {
        setEmailCopyStatus('Could not copy email. Please select and copy the address.')
      }
    }
  }

  function openProject(project) {
    const link = portfolio.links[project.linkKey]
    if (link) {
      if (/^https?:\/\//i.test(link)) window.open(link, '_blank', 'noopener,noreferrer')
      else window.location.href = link
      return
    }
    setSelectedProject(project)
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {!entered && <Intro onEnter={() => setEntered(true)} />}
      <div className={`site ${entered ? 'is-visible' : ''}`} id="site" inert={!entered}>
        <header className="topbar">
          <a href="#home" className="wordmark" aria-label="Sahana home"><img src="/sahana-mark.svg" alt="" aria-hidden="true" /><strong>SAHANA<span>.</span></strong></a>
          <nav className="main-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#resume">Resume</a><a href="#contact">Contact</a></nav>
          <a className="availability" href="#contact"><span className="status-dot" /> Open to opportunities</a>
        </header>

        <main id="home">
          <section className="hero section-wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="tiny-star">✳</span> BCA STUDENT · ASPIRING DEVELOPER</p>
              <h1 id="hero-title">Curious mind.<br /><em>Thoughtful code.</em></h1>
              <p className="hero-intro">I explore web development, data science, and AI through coursework and personal projects.</p>
              <div className="hero-actions"><a className="button button-gold" href="#projects">Explore my work <span>↘</span></a><a className="text-link" href="#about">A little about me <span>↗</span></a></div>
              <div className="hero-meta"><span><i /> AREAS OF INTEREST</span><span>WEB · DATA · AI</span></div>
            </div>
            <div className="hero-art creative-art" role="img" aria-label="Illustration of a creative girl wearing headphones and working on a laptop with data charts"><div className="art-grid" /><img className="creative-girl-illustration" src="/creative-girl-tech.svg" alt="" /><span className="art-label label-top">CURIOSITY IN CREATION</span><span className="art-label label-bottom">FIG. 01 — BUILD WHAT’S NEXT</span></div>
            <a href="#explore" className="scroll-cue"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
          </section>

          <section className="explore section-wrap" id="explore">
            <div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Choose a <em>doorway.</em></h2></div><p className="section-note">A few places to begin.<br />Take your time.</p></div>
            <div className="world-grid">{worldLinks.map((item) => <WorldCard item={item} key={item.id} />)}</div>
            <p className="drag-note"><span>✳</span> Explore a little of what I do.</p>
          </section>

          <section className="about section-wrap content-section" id="about">
            <div className="section-marker"><span>01</span><span className="marker-rule" /><span>ABOUT</span></div>
            <div className="about-layout"><div className="about-lead"><p className="eyebrow">A LITTLE CONTEXT</p><h2>Making<br /><em>the digital feel human.</em></h2></div><div className="about-body"><p className="large-copy">I’m a BCA student interested in web development, data science, and AI.</p><p>I enjoy building thoughtful interfaces and exploring how technology can make everyday experiences clearer and more useful.</p><p>Based in India, this portfolio brings together my projects and the areas I’m exploring.</p><a className="text-link" href="#contact">Let’s connect <span>↗</span></a></div></div>
            <div className="about-caption"><span>BASED IN INDIA</span><span>COURSEWORK, PROJECTS, AND CURIOSITY</span></div>
          </section>

          <section className="skills section-wrap content-section" id="skills">
            <div className="section-marker"><span>02</span><span className="marker-rule" /><span>SKILLS</span></div>
            <div className="section-heading"><div><p className="eyebrow">MY TOOLKIT</p><h2>Curiosity, <em>with a stack.</em></h2></div><p className="section-note">Web, programming,<br />data, and AI.</p></div>
            <div className="skills-layout">{skillGroups.map((group) => <div className="skill-group" key={group.label}><p className="skill-label">{group.label}</p><div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
            <p className="skills-footnote"><span>✳</span> These are the tools and topics I’m building experience with.</p>
          </section>

          <section className="projects section-wrap content-section" id="projects">
            <div className="section-marker"><span>03</span><span className="marker-rule" /><span>SELECTED WORK</span></div>
            <div className="section-heading"><div><p className="eyebrow">SELECTED PROJECTS</p><h2>Small ideas, <em>real momentum.</em></h2></div><p className="section-note">Web, data, and AI<br />in practice.</p></div>
            <div className="project-grid">{portfolio.projects.map((project) => <article className={`project-card project-${project.id}`} key={project.id}>
              <ProjectVisual project={project} />
              <div className="project-info"><div className="project-topline"><span>{project.kind}</span><span className="project-status"><i /> {project.status}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions">{portfolio.links[project.linkKey] ? <><button className="button button-outline project-view" type="button" onClick={() => openProject(project)}>Open project <span>↗</span></button><button className="details-link" type="button" onClick={() => setSelectedProject(project)}>View details</button></> : <button className="button button-outline project-view" type="button" onClick={() => setSelectedProject(project)}>Project details <span>↗</span></button>}</div></div>
            </article>)}</div>
          </section>

          <section className="certificates section-wrap content-section" id="certificates">
            <div className="section-marker"><span>04</span><span className="marker-rule" /><span>CERTIFICATIONS</span></div>
            <div className="certificate-panel"><div className="certificate-heading"><p className="eyebrow">CERTIFICATE DETAILS TO CONFIRM</p><h2>Credentials,<br /><em>carefully represented.</em></h2><p className="certificate-note">These entries use the short descriptions you supplied. Confirm each exact title and issuer before marking it verified.</p></div><div className="certificate-list">{certificates.map((certificate, index) => <article className="certificate-item" key={certificate.id}><span className="certificate-icon" aria-hidden="true">{certificate.id === 'ai' ? '✳' : '⌘'}</span><div><h3>{certificate.subject}</h3><p>{certificate.issuer} <span>·</span> {certificate.verified ? 'Verified' : 'Details to verify'}{certificate.date && <><span>·</span>{certificate.date}</>}</p>{certificate.verified && certificate.verificationUrl && <a className="certificate-link" href={certificate.verificationUrl} target="_blank" rel="noreferrer">View credential ↗</a>}</div><span className="certificate-index">0{index + 1}</span></article>)}</div><span className="certificate-star" aria-hidden="true">✳</span></div>
          </section>

          <section className="resume section-wrap content-section" id="resume">
            <div className="section-marker"><span>05</span><span className="marker-rule" /><span>RESUME</span></div>
            <div className="resume-panel"><div><p className="eyebrow">RESUME</p><h2>My experience,<br /><em>at a glance.</em></h2></div><div><p>View my resume here.</p>{portfolio.links.resume ? <button className="button button-outline" type="button" onClick={() => setShowResume(true)}>View resume <span>↗</span></button> : <button className="button button-outline" type="button" onClick={() => setSelectedProject({ id: 'resume' })}>Resume setup <span>↗</span></button>}</div></div>
          </section>

          <section className="contact section-wrap content-section" id="contact">
            <div className="section-marker"><span>06</span><span className="marker-rule" /><span>CONTACT</span></div>
            <div className="contact-layout"><div className="contact-copy"><p className="eyebrow">YOUR TURN</p><h2>Have a good<br /><em>idea in mind?</em></h2><p>I’m open to freelance projects, collaboration, and opportunities to grow. Have an idea in mind? Let’s make something meaningful together.</p><div className="contact-links">{portfolio.email ? <><a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}</a><button type="button" className="copy-email" onClick={copyEmail}>Copy email ↗</button><span className="copy-status" aria-live="polite">{emailCopyStatus}</span></> : <span className="contact-email">Add your email in <code>src/App.jsx</code></span>}{portfolio.links.github && <a href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{portfolio.links.linkedin && <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}</div></div>
              <form className="contact-form" onSubmit={handleContact}><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="How should I call you?" required /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /><label htmlFor="message">Your message</label><textarea id="message" name="message" rows="4" placeholder="Tell me a little about it…" required /><button className="button button-gold form-submit" type="submit">Prepare email <span>↗</span></button><p className="form-note" aria-live="polite">{formStatus}</p></form>
            </div>
          </section>
        </main>
        <footer className="footer section-wrap"><span className="footer-credit">S. — MADE WITH CURIOSITY BY SAHANA</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
      </div>
      <ProjectDialog item={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeViewer open={showResume} onClose={() => setShowResume(false)} />
    </>
  )
}

export default App
