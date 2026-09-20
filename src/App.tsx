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

function PointerCrosshair() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (event: PointerEvent) => {
      if (!cursor.current) return
      cursor.current.style.transform =
        'translate3d(' + (event.clientX - 18) + 'px,' + (event.clientY - 18) + 'px,0)'
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <div ref={cursor} className="crosshair" aria-hidden="true" />
}

const method = [
  {
    index: '01',
    code: 'OBSERVE',
    title: 'See the work as it is.',
    copy: 'Before software, understand people, delays, repeated tasks, handoffs and where information gets lost.',
  },
  {
    index: '02',
    code: 'MODEL',
    title: 'Turn reality into rules.',
    copy: 'Map flows, states, constraints, responsibilities and data before choosing abstractions or frameworks.',
  },
  {
    index: '03',
    code: 'DESIGN',
    title: 'Give the system structure.',
    copy: 'Define boundaries, permissions, failure paths, auditability and the trade-offs that matter.',
  },
  {
    index: '04',
    code: 'BUILD',
    title: 'Ship the useful part first.',
    copy: 'Implement small, verifiable pieces that remove friction for real users and can evolve without collapsing.',
  },
]

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
        gsap.set('.boot-screen', { display: 'none' })
        return
      }

      const boot = gsap.timeline()

      boot
        .from('.boot-code', { opacity: 0, duration: 0.25 })
        .from('.boot-row', { opacity: 0, x: -10, stagger: 0.09, duration: 0.28 })
        .from('.boot-progress span', { scaleX: 0, duration: 0.72, ease: 'power2.inOut' })
        .to('.boot-screen', {
          opacity: 0,
          duration: 0.45,
          delay: 0.18,
          pointerEvents: 'none',
          onComplete: () => gsap.set('.boot-screen', { display: 'none' }),
        })
        .from(
          ['.hero-eyebrow', '.hero-title-row', '.hero-lead', '.hero-controls', '.hero-data-strip'],
          {
            y: 30,
            opacity: 0,
            stagger: 0.055,
            duration: 0.75,
            ease: 'power3.out',
          },
          '-=0.08',
        )

      gsap.to('.hero-copy-block', {
        yPercent: -14,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.telemetry-panel', {
        yPercent: 18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom 18%',
          scrub: 1,
        },
      })

      gsap.from('.field-line', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.field-origin',
          start: 'top 78%',
          end: 'center 48%',
          scrub: 0.85,
        },
      })

      gsap.from('.method-row', {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.method',
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

      <PointerCrosshair />

      <div className="boot-screen" aria-hidden="true">
        <div className="boot-code">SQ_SYS / BUILD 0.3</div>
        <div className="boot-terminal">
          <div className="boot-row"><span>01</span> LOAD FIELD CONTEXT</div>
          <div className="boot-row"><span>02</span> MAP PROCESS STATES</div>
          <div className="boot-row"><span>03</span> VERIFY SYSTEM BOUNDARIES</div>
          <div className="boot-row"><span>04</span> READY</div>
        </div>
        <div className="boot-progress"><span /></div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Samuel home">
          SAMUEL QUISPE <b>//</b> SYS.ENG
        </a>

        <div className="header-center">
          <span className="live-indicator" />
          SYSTEM ONLINE
        </div>

        <a className="header-link" href="#contact">
          CONTACT [04]
        </a>
      </header>

      <aside className="side-rail" aria-hidden="true">
        <span>00</span>
        <i />
        <span>SQ</span>
        <i />
        <span>26</span>
      </aside>

      <main id="main">
        <section className="hero" id="top">
          <div className="scene-layer" aria-hidden="true">
            <SystemScene reducedMotion={reducedMotion} />
          </div>

          <div className="blueprint-grid" aria-hidden="true" />
          <div className="measurement measurement-x" aria-hidden="true">X / 1280</div>
          <div className="measurement measurement-y" aria-hidden="true">Y / 0720</div>

          <div className="hero-copy-block">
            <p className="hero-eyebrow">
              SOFTWARE ENGINEERING / PRODUCT SYSTEMS / PUNO, PERÚ
            </p>

            <h1 className="hero-title" aria-label="Engineer the system">
              <span className="hero-title-row solid">ENGINEER</span>
              <span className="hero-title-row stencil">THE</span>
              <span className="hero-title-row solid">SYSTEM.</span>
            </h1>

            <p className="hero-lead">
              I study how work actually happens, translate it into rules and structure,
              then build software that can survive contact with reality.
            </p>

            <div className="hero-controls">
              <a className="industrial-button" href="#field">
                OPEN SYSTEM MAP
                <span>↘</span>
              </a>

              <span className="hero-note">FIELD → LOGIC → SOFTWARE</span>
            </div>

            <div className="hero-data-strip">
              <span>PROCESS</span>
              <span>DATA</span>
              <span>RULES</span>
              <span>SECURITY</span>
              <span>FAILURE</span>
              <span>USERS</span>
            </div>
          </div>

          <div className="telemetry-panel" aria-hidden="true">
            <div className="telemetry-head">
              <span>ASSEMBLY / 001</span>
              <strong>LIVE</strong>
            </div>
            <div className="telemetry-row"><span>INPUT</span><b>REAL WORK</b></div>
            <div className="telemetry-row"><span>MODE</span><b>DECOMPOSE</b></div>
            <div className="telemetry-row"><span>STATE</span><b>BUILDING</b></div>
            <div className="telemetry-row"><span>LOC</span><b>PUNO_PE</b></div>
            <div className="telemetry-rule" />
            <p>MOVE POINTER / SCROLL TO EXPLODE ASSEMBLY</p>
          </div>

          <div className="hero-footer-code">
            <span>SECTION 01 / SYSTEM CORE</span>
            <span>SCROLL ↓</span>
          </div>
        </section>

        <section className="field-origin" id="field">
          <div className="section-marker">
            <span>02</span>
            <b>FIELD INPUT</b>
          </div>

          <div className="field-statement">
            <div className="field-mask"><span className="field-line">BEFORE CODE,</span></div>
            <div className="field-mask"><span className="field-line orange">READ THE FIELD.</span></div>
          </div>

          <div className="field-layout">
            <p>
              My route into software includes field work and mining before product
              development. That matters because real operations are noisy: people improvise,
              information gets repeated, time gets lost and edge cases are everywhere.
            </p>

            <div className="field-spec">
              <div><span>INPUT</span><b>OPERATIONS</b></div>
              <div><span>METHOD</span><b>OBSERVE + MODEL</b></div>
              <div><span>OUTPUT</span><b>SOFTWARE SYSTEM</b></div>
              <div><span>STATUS</span><b>LEARNING / BUILDING</b></div>
            </div>
          </div>
        </section>

        <section className="method">
          <div className="section-marker">
            <span>03</span>
            <b>OPERATING METHOD</b>
          </div>

          <div className="method-table">
            {method.map((item) => (
              <article className="method-row" key={item.index}>
                <span className="method-index">{item.index}</span>
                <span className="method-code">{item.code}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
                <span className="method-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="project" id="work">
          <div className="section-marker">
            <span>04</span>
            <b>FIELD PROJECT / ACTIVE</b>
          </div>

          <div className="project-topline">
            <span>CASE_001</span>
            <span>PUNO_PE</span>
            <span>STATUS / IN DEVELOPMENT</span>
          </div>

          <h2>BRACKET</h2>

          <div className="project-grid">
            <div className="project-description">
              <p>
                Dental operations software built from observed workflows instead of
                assumptions: appointments, clinical work, payments, permissions,
                auditability and the friction between them.
              </p>

              <a href="#contact" className="text-link">CASE STUDY IN CONSTRUCTION ↗</a>
            </div>

            <div className="project-specs">
              <div><span>TYPE</span><b>BUSINESS SOFTWARE</b></div>
              <div><span>USERS</span><b>REAL CLINIC TEAM</b></div>
              <div><span>FOCUS</span><b>WORKFLOW + SECURITY</b></div>
              <div><span>APPROACH</span><b>ITERATIVE MVP</b></div>
            </div>
          </div>

          <div className="process-ribbon" aria-hidden="true">
            <span>PROBLEM</span><i>01</i>
            <span>PROCESS</span><i>02</i>
            <span>RULES</span><i>03</i>
            <span>SYSTEM</span><i>04</i>
            <span>PRODUCT</span><i>05</i>
          </div>
        </section>

        <footer id="contact">
          <div className="footer-code">END / SQ_SYS_2026</div>

          <div className="footer-main">
            <p>BUILD FOR REALITY.</p>
            <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
