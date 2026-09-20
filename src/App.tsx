import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    id: '01',
    eyebrow: 'Problem',
    title: 'The work was already telling us what to build.',
    copy:
      'Appointments crossed, paper records slowed reception, balances lived on the back of physical files and daily reporting meant typing the same information again.',
    metric: 'AS-IS / FIELD OBSERVATION',
  },
  {
    id: '02',
    eyebrow: 'Field research',
    title: 'Before proposing software, I mapped the operation.',
    copy:
      'I documented the real flow, measured waiting times, identified handoffs and separated assumptions from validated rules. The system starts with the clinic, not with the framework.',
    metric: 'PROCESS / PEOPLE / TIME',
  },
  {
    id: '03',
    eyebrow: 'System design',
    title: 'Business rules became architecture.',
    copy:
      'Scheduling, permissions, clinical records, payments and auditability were treated as connected responsibilities. The goal was not more screens. It was less operational friction.',
    metric: 'RULES / BOUNDARIES / DATA',
  },
  {
    id: '04',
    eyebrow: 'Build',
    title: 'The product is still evolving with real constraints.',
    copy:
      'BRACKET is being developed iteratively, with security and maintainability treated as product requirements rather than cleanup tasks for the end.',
    metric: 'MVP / ITERATION / REAL USERS',
  },
]

const projects = [
  {
    number: '001',
    name: 'BRACKET',
    type: 'BUSINESS SOFTWARE',
    year: '2026',
    note: 'Dental operations / workflow / security',
  },
  {
    number: '002',
    name: 'ACCOUNTING SYSTEM',
    type: 'FULLSTACK / DOMAIN LOGIC',
    year: '2026',
    note: 'Accounting modules / audit / business rules',
  },
  {
    number: '003',
    name: 'SIGET-ML',
    type: 'ML / PROCESS AUTOMATION',
    year: '2026',
    note: 'Municipal workflow / prediction / prioritization',
  },
  {
    number: '004',
    name: 'VISION SYSTEM',
    type: 'COMPUTER VISION',
    year: '2026',
    note: 'Detection / monitoring / architecture',
  },
]

const whatsappMessage =
  'Hola J. Samuel, vi tu portafolio y me gustaría conversar contigo sobre un proyecto.'

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? ''

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [activeProject, setActiveProject] = useState(0)

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage)

    return `https://wa.me/${whatsappNumber}?text=${text}`
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.92,
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

    const context = gsap.context(() => {
      const intro = gsap.timeline()

      intro
        .from('.loader-line span', {
          yPercent: 115,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power4.out',
        })
        .from('.loader-meta', {
          opacity: 0,
          y: 10,
          duration: 0.35,
        }, '-=0.32')
        .to('.motion-loader', {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          delay: 0.12,
          pointerEvents: 'none',
        })
        .from('.hero-word', {
          yPercent: 120,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.35')
        .from('.hero-meta > *', {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
        }, '-=0.55')
        .from('.hero-signature, .hero-foot', {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.5')

      gsap.to('.hero-title', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.set('.motion-card-a', { x: '-38vw', y: '-24vh', rotate: -18, scale: 0.72 })
      gsap.set('.motion-card-b', { x: '33vw', y: '-30vh', rotate: 15, scale: 0.78 })
      gsap.set('.motion-card-c', { x: '-34vw', y: '28vh', rotate: 12, scale: 0.76 })
      gsap.set('.motion-card-d', { x: '36vw', y: '25vh', rotate: -13, scale: 0.74 })
      gsap.set('.motion-card-e', { y: '38vh', rotate: 8, scale: 0.68 })
      gsap.set('.motion-core', { scale: 0.35, rotate: -24, opacity: 0 })

      const motionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.motion-stage',
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: '.motion-stage-pin',
          anticipatePin: 1,
        },
      })

      motionTimeline
        .to('.motion-card', {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.46,
          stagger: 0.035,
          ease: 'power3.out',
        }, 0)
        .to('.motion-core', {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.32,
          ease: 'back.out(1.5)',
        }, 0.22)
        .to('.motion-stage-copy', {
          yPercent: -8,
          opacity: 0.16,
          duration: 0.28,
        }, 0.66)
        .to('.motion-card-a', { x: '-17vw', y: '-12vh', rotate: -8, duration: 0.3 }, 0.69)
        .to('.motion-card-b', { x: '16vw', y: '-14vh', rotate: 7, duration: 0.3 }, 0.69)
        .to('.motion-card-c', { x: '-18vw', y: '14vh', rotate: 6, duration: 0.3 }, 0.69)
        .to('.motion-card-d', { x: '17vw', y: '13vh', rotate: -7, duration: 0.3 }, 0.69)
        .to('.motion-card-e', { y: '20vh', rotate: 4, duration: 0.3 }, 0.69)
        .to('.motion-core', { scale: 1.18, duration: 0.3 }, 0.69)

      gsap.from('.case-visual', {
        clipPath: 'inset(12% 12% 12% 12%)',
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: '.feature',
          start: 'top 78%',
          end: 'top 35%',
          scrub: 0.8,
        },
      })

      gsap.utils.toArray<HTMLElement>('.chapter').forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 48%',
          end: 'bottom 48%',
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        })

        gsap.from(chapter.querySelectorAll('.chapter-reveal'), {
          y: 32,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 72%',
          },
        })
      })

      gsap.from('.method-step', {
        y: 36,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.method-band',
          start: 'top 72%',
        },
      })

      gsap.from('.index-row', {
        y: 28,
        opacity: 0,
        stagger: 0.07,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-index',
          start: 'top 72%',
        },
      })

      gsap.from('.contact-main > *', {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 74%',
        },
      })
    }, root)

    return () => context.revert()
  }, [])

  const current = chapters[activeChapter]
  const currentProject = projects[activeProject]

  return (
    <div ref={root} className="site-shell">
      <div className="motion-loader" aria-hidden="true">
        <div className="loader-word">
          <span className="loader-line"><span>J.</span></span>
          <span className="loader-line"><span>SAMUEL</span></span>
        </div>
        <div className="loader-meta">
          <span>SOFTWARE / SYSTEMS / PRODUCT</span>
          <span>PUNO, PERÚ · 2026</span>
        </div>
      </div>

      <header className="topbar">
        <a href="#top" className="wordmark">J. SAMUEL</a>
        <div className="topbar-center">SOFTWARE / SYSTEMS / PRODUCT</div>
        <a href="#contact" className="topbar-link">CONTACT ↗</a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-index">PORTFOLIO / 2026</div>

          <h1 className="hero-title" aria-label="Software engineering and systems">
            <span className="hero-mask"><span className="hero-word">SOFTWARE</span></span>
            <span className="hero-mask"><span className="hero-word outline">ENGINEERING</span></span>
            <span className="hero-mask"><span className="hero-word">& SYSTEMS</span></span>
          </h1>

          <div className="hero-meta">
            <p>
              I study real operations, translate them into structure and build software
              around the rules that actually matter.
            </p>

            <div className="hero-facts">
              <span>PUNO, PERÚ</span>
              <span>STUDENT / BUILDER</span>
              <span>ARCHITECTURE / PRODUCT</span>
            </div>
          </div>

          <div className="hero-signature" aria-hidden="true">
            <span>QITIAN / 齐天</span>
            <i />
          </div>

          <div className="hero-foot">
            <span>SELECTED WORK ↓</span>
            <span>01 / 05</span>
          </div>
        </section>

        <section className="motion-stage" aria-label="From reality to system">
          <div className="motion-stage-pin">
            <div className="motion-stage-meta">
              <span>00 / MOTION SYSTEM</span>
              <span>SCROLL TO ASSEMBLE</span>
            </div>

            <div className="motion-stage-copy">
              <span className="motion-eyebrow">HOW I SEE SOFTWARE</span>
              <h2>
                <span>FROM</span>
                <span className="motion-outline">REALITY</span>
                <span>TO SYSTEM.</span>
              </h2>
            </div>

            <div className="motion-sculpture" aria-hidden="true">
              <div className="motion-card motion-card-a"><span>01</span><b>FIELD</b></div>
              <div className="motion-card motion-card-b"><span>02</span><b>PROCESS</b></div>
              <div className="motion-card motion-card-c"><span>03</span><b>RULES</b></div>
              <div className="motion-card motion-card-d"><span>04</span><b>DATA</b></div>
              <div className="motion-card motion-card-e"><span>05</span><b>PRODUCT</b></div>
              <div className="motion-core">JS</div>
            </div>

            <div className="motion-stage-foot">
              <span>J. SAMUEL / SYSTEM THINKING</span>
              <span>QITIAN · 齐天</span>
            </div>
          </div>
        </section>

        <div className="kinetic-marquee" aria-hidden="true">
          <div className="kinetic-track">
            <span>REAL PROBLEMS / DIGITAL SYSTEMS / PRODUCT THINKING / </span>
            <span>REAL PROBLEMS / DIGITAL SYSTEMS / PRODUCT THINKING / </span>
          </div>
        </div>

        <section className="feature" id="work">
          <div className="feature-intro">
            <span>01 / SELECTED WORK</span>
            <h2>One project.<br />Four decisions.</h2>
            <p>
              BRACKET is the project where I am learning to connect field research,
              architecture, product decisions and implementation.
            </p>
          </div>

          <div className="case-layout">
            <aside className="case-sticky">
              <div className="case-visual">
                <div className="case-visual-top">
                  <span>CASE STUDY 001</span>
                  <span>{current.id} / 04</span>
                </div>

                <div className="case-visual-core">
                  <span className="case-kicker">{current.eyebrow}</span>
                  <strong>BRACKET</strong>
                  <span className="case-status">IN DEVELOPMENT</span>
                </div>

                <div className="case-diagram" aria-hidden="true">
                  <span className="diagram-node node-a">FIELD</span>
                  <span className="diagram-node node-b">RULES</span>
                  <span className="diagram-node node-c">DATA</span>
                  <span className="diagram-node node-d">SYSTEM</span>
                  <span className="diagram-node node-e">PRODUCT</span>
                  <i className="diagram-line line-1" />
                  <i className="diagram-line line-2" />
                  <i className="diagram-line line-3" />
                  <i className="diagram-line line-4" />
                </div>

                <div className="case-visual-foot">
                  <span>{current.metric}</span>
                  <span>PUNO / PE</span>
                </div>
              </div>
            </aside>

            <div className="chapters">
              {chapters.map((chapter) => (
                <article className="chapter" key={chapter.id}>
                  <div className="chapter-number chapter-reveal">{chapter.id}</div>
                  <div className="chapter-copy">
                    <span className="chapter-eyebrow chapter-reveal">{chapter.eyebrow}</span>
                    <h3 className="chapter-reveal">{chapter.title}</h3>
                    <p className="chapter-reveal">{chapter.copy}</p>
                    <span className="chapter-metric chapter-reveal">{chapter.metric}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method-band">
          <div className="method-head">
            <span>02 / OPERATING SYSTEM</span>
            <p>HOW I APPROACH A REAL PROBLEM</p>
          </div>

          <div className="method-grid">
            <article className="method-step">
              <span>01</span>
              <strong>UNDERSTAND</strong>
              <p>Observe the work, people, delays and constraints before proposing a solution.</p>
            </article>
            <article className="method-step">
              <span>02</span>
              <strong>MODEL</strong>
              <p>Translate reality into flows, states, responsibilities, rules and data.</p>
            </article>
            <article className="method-step">
              <span>03</span>
              <strong>DESIGN</strong>
              <p>Choose boundaries, security, architecture and trade-offs deliberately.</p>
            </article>
            <article className="method-step accent-step">
              <span>04</span>
              <strong>BUILD</strong>
              <p>Ship the useful part, verify it, learn from it and iterate without losing structure.</p>
            </article>
          </div>

          <div className="method-flow" aria-hidden="true">
            <span>PROBLEM</span><i>→</i>
            <span>PROCESS</span><i>→</i>
            <span>RULES</span><i>→</i>
            <span>SYSTEM</span><i>→</i>
            <span>PRODUCT</span>
          </div>
        </section>

        <section className="statement">
          <div className="statement-label">03 / APPROACH</div>
          <p>
            I am not interested in collecting frameworks.
            <span> I want to understand the system well enough to choose them.</span>
          </p>
        </section>

        <section className="project-index">
          <div className="index-heading">
            <span>04 / PROJECT INDEX</span>
            <h2>Selected systems</h2>
          </div>

          <div className="project-index-layout">
            <div className="index-table">
              {projects.map((project, index) => (
                <button
                  type="button"
                  className="index-row"
                  key={project.number}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                  onClick={() => setActiveProject(index)}
                >
                  <span>{project.number}</span>
                  <strong>{project.name}</strong>
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                  <span className="index-arrow">↗</span>
                </button>
              ))}
            </div>

            <aside className="project-preview" aria-live="polite">
              <div className="preview-number">{currentProject.number}</div>
              <div className="preview-content">
                <span>{currentProject.type}</span>
                <strong>{currentProject.name}</strong>
                <p>{currentProject.note}</p>
              </div>
              <div className="preview-foot">
                <span>J. SAMUEL / SELECTED WORK</span>
                <span>{currentProject.year}</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="about">
          <div className="about-label">05 / ABOUT</div>

          <div className="about-grid">
            <h2>
              Still learning.<br />
              Already building.
            </h2>

            <div className="about-copy">
              <p>
                I am studying Software Engineering with AI while building business software
                and learning architecture, security, product development and data from the ground up.
              </p>
              <p>
                Long term, I want to build a software consultancy focused on useful, maintainable
                products for real organizations.
              </p>

              <div className="about-meta">
                <div><span>NOW</span><b>BUSINESS SOFTWARE</b></div>
                <div><span>LEARNING</span><b>ARCHITECTURE / SECURITY / AI</b></div>
                <div><span>NEXT</span><b>CONSULTING / PRODUCTS</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-label">06 / CONTACT</div>

          <div className="contact-main">
            <p>HAVE A PROBLEM<br />WORTH SOLVING?</p>

            <div className="contact-actions">
              <a
                className="whatsapp-button magnetic-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>START ON WHATSAPP</span>
                <span>↗</span>
              </a>

              <a
                className="secondary-contact"
                href="https://github.com/SamuelShiw"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>

              <span className="contact-number">+51 901 036 216</span>
            </div>
          </div>

          <div className="message-preview">
            <span>SUGGESTED MESSAGE</span>
            <p>“{whatsappMessage}”</p>
          </div>
        </section>

        <footer>
          <div className="footer-small">J. SAMUEL / PUNO, PERÚ / 2026</div>

          <div className="footer-main">
            <p>BUILD<br />WITH PURPOSE.</p>
            <span className="footer-mark">QITIAN / 齐天</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
