import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SystemScene from './components/SystemScene'

gsap.registerPlugin(ScrollTrigger)

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function PointerGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (event: PointerEvent) => {
      if (!glow.current) return
      glow.current.style.transform =
        'translate3d(' + (event.clientX - 180) + 'px,' + (event.clientY - 180) + 'px,0)'
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <div ref={glow} className="pointer-glow" aria-hidden="true" />
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (!root.current) return

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.intro-screen', { display: 'none' })
        return
      }

      const intro = gsap.timeline()
      intro
        .from('.intro-kicker', { opacity: 0, y: 12, duration: 0.55 })
        .from('.intro-line span', { scaleX: 0, duration: 0.9, ease: 'power3.inOut' }, '-=0.2')
        .to('.intro-screen', {
          opacity: 0,
          duration: 0.65,
          delay: 0.25,
          pointerEvents: 'none',
          onComplete: () => gsap.set('.intro-screen', { display: 'none' }),
        })
        .from(
          ['.hero-kicker', '.hero-title .line', '.hero-copy', '.hero-actions', '.hero-meta'],
          {
            opacity: 0,
            y: 34,
            stagger: 0.075,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.25',
        )

      gsap.to('.hero-copy-layer', {
        yPercent: -18,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.from('.manifesto-line', {
        yPercent: 105,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.manifesto',
          start: 'top 76%',
          end: 'center 50%',
          scrub: 0.8,
        },
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={root} className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <PointerGlow />

      <div className="intro-screen" aria-hidden="true">
        <p className="intro-kicker">SAMUEL / DIGITAL SYSTEMS LAB</p>
        <div className="intro-line"><span /></div>
        <p className="intro-status">INITIALIZING PERSONAL SYSTEM</p>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Samuel home">
          SQ<span>·</span>LAB
        </a>
        <div className="header-status">
          <span className="status-dot" />
          AVAILABLE FOR BUILDING
        </div>
        <a className="header-link" href="#contact">CONTACT</a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="scene-layer" aria-hidden="true">
            <SystemScene reducedMotion={reducedMotion} />
          </div>

          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-copy-layer">
            <p className="hero-kicker">SOFTWARE ENGINEERING / PRODUCT / ARCHITECTURE</p>

            <h1 className="hero-title">
              <span className="line">I BUILD</span>
              <span className="line outline">USEFUL</span>
              <span className="line">SYSTEMS.</span>
            </h1>

            <p className="hero-copy">
              I turn real operational problems into maintainable digital products,
              from architecture and business rules to the final interface.
            </p>

            <div className="hero-actions">
              <a className="primary-action" href="#work">
                <span>EXPLORE THE LAB</span>
                <span aria-hidden="true">↘</span>
              </a>
              <span className="micro-note">PUNO, PERÚ · 2026</span>
            </div>

            <div className="hero-meta">
              <span>01 / PERSONAL SYSTEM</span>
              <span>SCROLL TO ENTER</span>
            </div>
          </div>
        </section>

        <section className="manifesto" id="work">
          <div className="section-index">02 / ENGINEERING MINDSET</div>

          <div className="manifesto-copy" aria-label="I design systems, not just screens.">
            <div className="manifesto-mask"><span className="manifesto-line">I DESIGN</span></div>
            <div className="manifesto-mask"><span className="manifesto-line accent">SYSTEMS</span></div>
            <div className="manifesto-mask"><span className="manifesto-line">NOT JUST SCREENS.</span></div>
          </div>

          <div className="manifesto-foot">
            <p>
              Software is more than code. It is decisions, constraints, people,
              data and the consequences of connecting them.
            </p>
            <span>ARCHITECTURE → PRODUCT → EXPERIENCE</span>
          </div>
        </section>

        <section className="project-teaser">
          <div className="section-index">03 / SELECTED SYSTEM</div>

          <div className="project-heading">
            <p>CASE STUDY / 001</p>
            <h2>BRACKET</h2>
            <p className="project-subtitle">Dental operations system · Puno, Perú</p>
          </div>

          <div className="project-data">
            <span>REAL USERS</span>
            <span>CLINICAL WORKFLOWS</span>
            <span>SECURITY + AUDIT</span>
            <span>PRODUCT IN PROGRESS</span>
          </div>

          <p className="project-note">
            Full case study enters in the next build.
          </p>
        </section>

        <footer id="contact">
          <p>BUILD SOMETHING USEFUL.</p>
          <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </footer>
      </main>
    </div>
  )
}
