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
        .from('.intro-kicker', { opacity: 0, y: 12, duration: 0.5 })
        .from('.intro-line span', { scaleX: 0, duration: 0.85, ease: 'power3.inOut' }, '-=0.18')
        .from('.intro-mark', { opacity: 0, scale: 0.82, duration: 0.45 }, '-=0.3')
        .to('.intro-screen', {
          opacity: 0,
          duration: 0.65,
          delay: 0.18,
          pointerEvents: 'none',
          onComplete: () => gsap.set('.intro-screen', { display: 'none' }),
        })
        .from(
          ['.hero-kicker', '.hero-title .line', '.hero-copy', '.hero-actions', '.hero-meta', '.hero-signature'],
          {
            opacity: 0,
            y: 34,
            stagger: 0.065,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.2',
        )

      gsap.to('.hero-copy-layer', {
        yPercent: -14,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.system-legend', {
        yPercent: -24,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      gsap.from('.origin-line', {
        yPercent: 108,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin',
          start: 'top 76%',
          end: 'center 48%',
          scrub: 0.8,
        },
      })

      gsap.from('.principle-card', {
        y: 42,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.principles',
          start: 'top 72%',
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
        <div className="intro-mark">齐天</div>
        <p className="intro-kicker">SAMUEL QUISPE / QITIAN SYSTEMS LAB</p>
        <div className="intro-line"><span /></div>
        <p className="intro-status">FROM REAL PROBLEMS TO DIGITAL SYSTEMS</p>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Samuel home">
          SQ <span>/</span> QITIAN
        </a>
        <div className="header-status">
          <span className="status-dot" />
          BUILDING · LEARNING · ITERATING
        </div>
        <a className="header-link" href="#contact">CONTACT</a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="scene-layer" aria-hidden="true">
            <SystemScene reducedMotion={reducedMotion} />
          </div>

          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-axis" aria-hidden="true" />

          <div className="hero-copy-layer">
            <p className="hero-kicker">
              SOFTWARE ENGINEERING / ARCHITECTURE / PRODUCT · PUNO, PERÚ
            </p>

            <h1 className="hero-title">
              <span className="line">UNDERSTAND.</span>
              <span className="line outline">DESIGN.</span>
              <span className="line">BUILD.</span>
            </h1>

            <p className="hero-copy">
              I turn real operational problems into software systems by understanding
              the process first, designing the structure, and only then writing code.
            </p>

            <div className="hero-actions">
              <a className="primary-action" href="#origin">
                <span>ENTER THE SYSTEM</span>
                <span aria-hidden="true">↘</span>
              </a>
              <span className="micro-note">STILL LEARNING · ALREADY BUILDING</span>
            </div>

            <div className="hero-signature" aria-hidden="true">
              <span className="signature-seal">齐天</span>
              <span>QITIAN / 001</span>
            </div>

            <div className="hero-meta">
              <span>01 / PERSONAL SYSTEM</span>
              <span>SCROLL TO DECOMPOSE</span>
            </div>
          </div>

          <div className="system-legend" aria-hidden="true">
            <span>01 · PROBLEM</span>
            <span>02 · PROCESS</span>
            <span>03 · DATA</span>
            <span>04 · ARCHITECTURE</span>
            <span>05 · PRODUCT</span>
          </div>
        </section>

        <section className="origin" id="origin">
          <div className="section-index">02 / ORIGIN</div>

          <div className="origin-copy" aria-label="Real problems first. Software second.">
            <div className="origin-mask"><span className="origin-line">REAL PROBLEMS</span></div>
            <div className="origin-mask"><span className="origin-line jade">FIRST.</span></div>
            <div className="origin-mask"><span className="origin-line">SOFTWARE SECOND.</span></div>
          </div>

          <div className="origin-foot">
            <p>
              My path into software did not begin in a design studio. It came through
              field work, mining, study, and building tools for real businesses.
              That taught me to look at the system before reaching for the code.
            </p>
            <div className="origin-coordinates">
              <span>PUNO / PERÚ</span>
              <span>ENGINEERING IN PROGRESS</span>
              <span>PRODUCT MINDSET</span>
            </div>
          </div>
        </section>

        <section className="principles">
          <div className="section-index">03 / HOW I THINK</div>

          <div className="principles-grid">
            <article className="principle-card">
              <span className="principle-number">01</span>
              <h2>Understand the process.</h2>
              <p>
                Before choosing a framework, I want to know the workflow, the people,
                the constraints, the data and what can actually go wrong.
              </p>
            </article>

            <article className="principle-card">
              <span className="principle-number">02</span>
              <h2>Design the system.</h2>
              <p>
                Responsibilities, boundaries, business rules, security and trade-offs
                should be visible before the codebase becomes a maze.
              </p>
            </article>

            <article className="principle-card accent-card">
              <span className="principle-number">03</span>
              <h2>Build what matters.</h2>
              <p>
                Useful software is not the one with the most features. It is the one
                that removes friction and survives contact with real users.
              </p>
            </article>
          </div>
        </section>

        <section className="project-teaser" id="work">
          <div className="section-index">04 / CURRENT SYSTEM</div>

          <div className="project-heading">
            <p>CASE STUDY / 001 · IN DEVELOPMENT</p>
            <h2>BRACKET</h2>
            <p className="project-subtitle">
              Dental operations software shaped from real workflows in Puno, Perú.
            </p>
          </div>

          <div className="project-data">
            <span>REAL WORKFLOWS</span>
            <span>BUSINESS RULES</span>
            <span>SECURITY + AUDIT</span>
            <span>PRODUCT IN PROGRESS</span>
          </div>

          <div className="project-philosophy">
            <span>PROBLEM</span>
            <i>→</i>
            <span>PROCESS</span>
            <i>→</i>
            <span>SYSTEM</span>
            <i>→</i>
            <span>PRODUCT</span>
          </div>
        </section>

        <footer id="contact">
          <div>
            <span className="footer-mark">齐天 / QITIAN</span>
            <p>BUILD WITH PURPOSE.</p>
          </div>
          <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </footer>
      </main>
    </div>
  )
}
