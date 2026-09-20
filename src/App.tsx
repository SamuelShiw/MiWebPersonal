import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const whatsappNumber = '51901036216'
const whatsappMessage =
  'Hola J. Samuel, vi tu portafolio y me gustaría conversar contigo sobre un proyecto.'

const systems = [
  {
    id: '01',
    name: 'BRACKET',
    type: 'Business software',
    line1: 'Real clinic workflows.',
    line2: 'Security, audit and product thinking.',
    status: 'IN DEVELOPMENT',
  },
  {
    id: '02',
    name: 'ACCOUNTING',
    type: 'Domain system',
    line1: 'Accounting logic and modules.',
    line2: 'Backend rules before interface decoration.',
    status: 'PROTOTYPE',
  },
  {
    id: '03',
    name: 'SIGET-ML',
    type: 'ML workflow',
    line1: 'Process prioritization.',
    line2: 'Prediction inside a useful business flow.',
    status: 'EXPERIMENT',
  },
]

const scenes = [
  ['01', 'ARCHITECTURE', 'Boundaries, responsibilities and trade-offs.'],
  ['02', 'PRODUCT', 'Solve the operation before adding features.'],
  ['03', 'SECURITY', 'Permissions, auditability and data integrity.'],
  ['04', 'AI', 'Use intelligence where it changes the workflow.'],
  ['05', 'DATA', 'Model information so decisions become visible.'],
  ['06', 'BUILD', 'Small, verifiable and maintainable increments.'],
]

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSystem, setActiveSystem] = useState(0)

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      lerp: 0.08,
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
  }, [])

  useLayoutEffect(() => {
    if (!root.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const intro = gsap.timeline()

      intro
        .from('.entry-letter', {
          yPercent: 120,
          opacity: 0,
          stagger: 0.055,
          duration: 0.85,
          ease: 'power4.out',
        })
        .from('.hero-small, .hero-index, .hero-scroll', {
          opacity: 0,
          y: 14,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.42')
        .from('.hero-orbit', {
          scale: 0.72,
          opacity: 0,
          rotate: -22,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=0.75')

      gsap.to('.hero-orbit', {
        rotate: 55,
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.hero-title', {
        yPercent: -15,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((line) => {
        gsap.from(line, {
          yPercent: 110,
          opacity: 0,
          duration: 0.95,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 86%',
          },
        })
      })

      gsap.from('.concept-copy p', {
        y: 24,
        opacity: 0,
        stagger: 0.11,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.concept-copy',
          start: 'top 74%',
        },
      })

      const philosophyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.philosophy',
          start: 'top top',
          end: '+=210%',
          pin: '.philosophy-pin',
          scrub: 1,
          anticipatePin: 1,
        },
      })

      philosophyTl
        .fromTo('.philosophy-ring-a',
          { scale: 0.55, rotate: -50, opacity: 0.2 },
          { scale: 1, rotate: 40, opacity: 1, duration: 0.35 }
        )
        .fromTo('.philosophy-ring-b',
          { scale: 0.42, rotate: 45, opacity: 0.18 },
          { scale: 1, rotate: -38, opacity: 1, duration: 0.35 },
          0.05
        )
        .fromTo('.philosophy-core',
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.24 },
          0.18
        )
        .to('.philosophy-copy-a', { opacity: 0, y: -36, duration: 0.22 }, 0.42)
        .fromTo('.philosophy-copy-b',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.24 },
          0.46
        )
        .to('.philosophy-ring-a', { xPercent: -22, scale: 1.25, duration: 0.3 }, 0.7)
        .to('.philosophy-ring-b', { xPercent: 28, scale: 1.18, duration: 0.3 }, 0.7)

      gsap.utils.toArray<HTMLElement>('.system-panel').forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 52%',
          end: 'bottom 52%',
          onEnter: () => setActiveSystem(index),
          onEnterBack: () => setActiveSystem(index),
        })
      })

      gsap.from('.scene-card', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scene-grid',
          start: 'top 78%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const selectedSystem = systems[activeSystem]

  return (
    <div ref={root} className="zeroz-shell">
      <header className="site-nav">
        <a href="#top" className="site-logo">J. SAMUEL</a>
        <div className="site-nav-mid">SOFTWARE ENGINEERING / PUNO, PERÚ</div>
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-label="Open navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>Menu</span>
          <i />
          <i />
        </button>
      </header>

      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <button className="menu-close" type="button" onClick={() => setMenuOpen(false)}>Close</button>
        <nav>
          <a href="#about" onClick={() => setMenuOpen(false)}>About <span>001</span></a>
          <a href="#philosophy" onClick={() => setMenuOpen(false)}>Philosophy <span>002</span></a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>003</span></a>
          <a href="#scene" onClick={() => setMenuOpen(false)}>Practice <span>004</span></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>005</span></a>
        </nav>
        <div className="menu-foot">QITIAN / 齐天 · 2026</div>
      </div>

      <aside className="page-counter" aria-hidden="true">
        <span>01</span>
        <i />
        <span>11</span>
      </aside>

      <main>
        <section className="hero" id="top">
          <div className="hero-small">/ Personal Portfolio</div>

          <h1 className="hero-title" aria-label="J. Samuel">
            {'J.SAMUEL'.split('').map((letter, index) => (
              <span className="entry-mask" key={index}>
                <span className="entry-letter">{letter === ' ' ? '\u00A0' : letter}</span>
              </span>
            ))}
          </h1>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="orbit-core">JS</div>
          </div>

          <div className="hero-index">
            <span>Software</span>
            <span>Systems</span>
            <span>Product</span>
          </div>

          <div className="hero-scroll">SCROLL / 001 ↓</div>
        </section>

        <section className="about-section" id="about">
          <div className="chapter-head">
            <span className="chapter-number">001</span>
            <div>
              <span className="chapter-slash">/</span>
              <h2>A b o u t</h2>
            </div>
          </div>

          <div className="about-stage">
            <div className="about-sculpture" aria-hidden="true">
              <span className="sculpture-dot dot-1" />
              <span className="sculpture-dot dot-2" />
              <span className="sculpture-dot dot-3" />
              <span className="sculpture-line line-a" />
              <span className="sculpture-line line-b" />
              <span className="sculpture-line line-c" />
              <strong>REALITY</strong>
            </div>

            <div className="about-copy">
              <span className="sub-index">001 / Concept</span>
              <div className="large-statement">
                <div className="line-mask"><span className="reveal-line">Understand</span></div>
                <div className="line-mask"><span className="reveal-line">the system</span></div>
                <div className="line-mask"><span className="reveal-line accent">before the code.</span></div>
              </div>

              <div className="concept-copy">
                <p>
                  I am J. Samuel, a software engineering student from Puno building my path
                  around architecture, product development and real business problems.
                </p>
                <p>
                  My work starts by observing how people actually operate: where time is lost,
                  where information is repeated and which rules hold the process together.
                </p>
                <p>
                  Then I translate that reality into software that can be maintained, audited
                  and improved instead of becoming another fragile tool.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy" id="philosophy">
          <div className="philosophy-pin">
            <div className="chapter-head chapter-head-dark">
              <span className="chapter-number">002</span>
              <div>
                <span className="chapter-slash">/</span>
                <h2>S y s t e m &<br />P r o c e s s</h2>
              </div>
            </div>

            <div className="philosophy-visual" aria-hidden="true">
              <div className="philosophy-ring philosophy-ring-a" />
              <div className="philosophy-ring philosophy-ring-b" />
              <div className="philosophy-core">01</div>
            </div>

            <div className="philosophy-copy philosophy-copy-a">
              <span>01 / INPUT</span>
              <h3>Real operations are noisy.</h3>
              <p>People, paper, data, exceptions, time and business rules collide every day.</p>
            </div>

            <div className="philosophy-copy philosophy-copy-b">
              <span>02 / OUTPUT</span>
              <h3>Good software gives that reality structure.</h3>
              <p>Process → rules → data → architecture → product.</p>
            </div>

            <div className="philosophy-footer">
              <span>UNDERSTAND</span>
              <span>MODEL</span>
              <span>DESIGN</span>
              <span>BUILD</span>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="chapter-head">
            <span className="chapter-number">003</span>
            <div>
              <span className="chapter-slash">/</span>
              <h2>W o r k</h2>
            </div>
          </div>

          <div className="work-intro">
            <div>
              <span className="sub-index">Selected systems</span>
              <h3>Built to learn.<br />Built around reality.</h3>
            </div>
            <p>
              Projects are not shown as technology checklists. Each one is a different
              attempt to understand a domain and turn it into a useful system.
            </p>
          </div>

          <div className="work-layout">
            <aside className="work-sticky">
              <div className="work-preview">
                <span className="preview-id">{selectedSystem.id} /03</span>
                <div className="preview-graphic" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <b>{selectedSystem.id}</b>
                </div>
                <div>
                  <span>{selectedSystem.type}</span>
                  <strong>{selectedSystem.name}</strong>
                </div>
                <em>{selectedSystem.status}</em>
              </div>
            </aside>

            <div className="system-list">
              {systems.map((system) => (
                <article className="system-panel" key={system.id}>
                  <span className="system-number">{system.id}</span>
                  <span className="system-type">{system.type}</span>
                  <h4>{system.name}</h4>
                  <p>{system.line1}<br />{system.line2}</p>
                  <span className="system-status">{system.status}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scene-section" id="scene">
          <div className="chapter-head">
            <span className="chapter-number">004</span>
            <div>
              <span className="chapter-slash">/</span>
              <h2>P r a c t i c e</h2>
            </div>
          </div>

          <div className="scene-intro">
            <h3>
              The areas I am learning to connect<br />
              into one engineering practice.
            </h3>
          </div>

          <div className="scene-grid">
            {scenes.map(([id, title, copy]) => (
              <article className="scene-card" key={id}>
                <span>{id}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
                <i>↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="chapter-head chapter-head-dark">
            <span className="chapter-number">005</span>
            <div>
              <span className="chapter-slash">/</span>
              <h2>C o n t a c t</h2>
            </div>
          </div>

          <div className="contact-copy">
            <span>Have a problem worth solving?</span>
            <h3>Let&apos;s turn it<br />into a system.</h3>
          </div>

          <a
            className="contact-button"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>START ON WHATSAPP</span>
            <span>+51 901 036 216 ↗</span>
          </a>

          <div className="contact-foot">
            <span>J. SAMUEL / PUNO, PERÚ</span>
            <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <span>QITIAN / 齐天</span>
          </div>
        </section>
      </main>
    </div>
  )
}
