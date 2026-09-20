import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const whatsappNumber = '51901036216'
const whatsappMessage =
  'Hola J. Samuel, vi tu portafolio y me gustaría conversar contigo sobre un proyecto.'

const pageIndex = [
  ['001', 'Concept', 'Quién soy y cómo pienso'],
  ['002', 'Process & Systems', 'Cómo convierto problemas en software'],
  ['003', 'Scene', 'Dónde aplico lo que aprendo'],
]

const processSteps = [
  {
    id: '01',
    title: 'Primero observo el trabajo real.',
    copy:
      'Antes de decidir tecnologías, entiendo a las personas, los tiempos, los documentos, los errores frecuentes y los puntos donde la información se rompe.',
    tag: 'FIELD / AS-IS',
  },
  {
    id: '02',
    title: 'Después convierto la realidad en reglas.',
    copy:
      'Flujos, estados, permisos, datos, restricciones y excepciones dejan de ser conversaciones sueltas y pasan a convertirse en un modelo que se puede construir.',
    tag: 'MODEL / RULES',
  },
  {
    id: '03',
    title: 'Finalmente construyo el sistema.',
    copy:
      'Arquitectura, seguridad, interfaz y producto se conectan para entregar software útil, verificable y capaz de evolucionar sin perder estructura.',
    tag: 'BUILD / PRODUCT',
  },
]

const buildScenes = [
  ['Business Software', 'BRACKET', 'Flujos clínicos, agenda, caja, permisos y auditoría.'],
  ['Architecture', 'System Design', 'Límites, responsabilidades, contratos y decisiones técnicas.'],
  ['Security', 'Access & Audit', 'Autorización, integridad, trazabilidad y reglas de acceso.'],
  ['Product', 'Real Users', 'Priorizar lo que reduce fricción antes que acumular funciones.'],
]

const exploreScenes = [
  ['Artificial Intelligence', 'Applied AI', 'IA integrada al flujo cuando realmente mejora una decisión.'],
  ['Data', 'Analytics', 'Modelado, transformación y lectura de información para decidir mejor.'],
  ['Computer Vision', 'Vision Systems', 'Detección, monitoreo y experimentos con visión artificial.'],
  ['Creative Tech', 'QITIAN Lab', 'Interfaces, 3D, motion y experimentos que amplían mi lenguaje digital.'],
]

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)

  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    [],
  )

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

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
  }, [])

  useLayoutEffect(() => {
    if (!root.current) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const context = gsap.context(() => {
      const intro = gsap.timeline()

      intro
        .from('.page-title-char', {
          yPercent: 115,
          stagger: 0.035,
          duration: 0.9,
          ease: 'power4.out',
        })
        .from('.hero-index-row', {
          opacity: 0,
          y: 18,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.5')
        .from('.hero-index-row::after', { scaleX: 0 })

      gsap.to('.page-title', {
        yPercent: -8,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.page-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.from('.concept-heading-line', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.concept-statement',
          start: 'top 82%',
        },
      })

      gsap.from('.concept-body p', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.concept-body',
          start: 'top 78%',
        },
      })

      gsap.to('.concept-visual-ring-a', {
        rotate: 95,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.concept-visual',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.concept-visual-ring-b', {
        rotate: -80,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: '.concept-visual',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveProcess(index),
          onEnterBack: () => setActiveProcess(index),
        })

        gsap.from(step.querySelectorAll('.process-reveal'), {
          opacity: 0,
          y: 28,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 76%',
          },
        })
      })

      gsap.from('.scene-card', {
        opacity: 0,
        y: 44,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scene-gallery',
          start: 'top 76%',
        },
      })

      gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          x: -24,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 84%',
          },
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  const active = processSteps[activeProcess]

  return (
    <div ref={root} className="site-shell">
      <header className="top-nav">
        <a className="brand" href="#top">J. SAMUEL</a>
        <div className="brand-note">SOFTWARE / SYSTEMS / PRODUCT</div>
        <button
          className="menu-trigger"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>Menu</span>
          <i />
          <i />
        </button>
      </header>

      <aside className="side-count" aria-hidden="true">
        <span>01</span>
        <i />
        <span>11</span>
      </aside>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <button className="menu-close" type="button" onClick={() => setMenuOpen(false)}>
          Close
        </button>

        <nav>
          <a href="#concept" onClick={() => setMenuOpen(false)}>
            <span>About</span><small>001</small>
          </a>
          <a href="#systems" onClick={() => setMenuOpen(false)}>
            <span>Process & Systems</span><small>002</small>
          </a>
          <a href="#scene" onClick={() => setMenuOpen(false)}>
            <span>Scene</span><small>003</small>
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            <span>Contact</span><small>004</small>
          </a>
        </nav>

        <div className="menu-meta">
          <span>PUNO, PERÚ</span>
          <span>QITIAN / 齐天</span>
        </div>
      </div>

      <main>
        <section className="page-hero" id="top">
          <div className="hero-index-list">
            {pageIndex.map(([number, title, description]) => (
              <a className="hero-index-row" href={number === '001' ? '#concept' : number === '002' ? '#systems' : '#scene'} key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <em>{description}</em>
              </a>
            ))}
          </div>

          <div className="page-title-wrap">
            <span className="page-slash">/</span>
            <h1 className="page-title" aria-label="About">
              {'About'.split('').map((char, index) => (
                <span className="page-title-mask" key={index}>
                  <span className="page-title-char">{char}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <b>JS</b>
          </div>

          <div className="hero-bottom">
            <span>J. SAMUEL / 2026</span>
            <span>SCROLL ↓</span>
          </div>
        </section>

        <section className="section concept-section" id="concept">
          <header className="section-title">
            <span className="section-number">001</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>C o n c e p t</h2>
                <small>(Identidad y enfoque)</small>
              </div>
            </div>
          </header>

          <div className="concept-layout">
            <div className="concept-statement">
              <div className="text-mask"><span className="concept-heading-line">Entender</span></div>
              <div className="text-mask"><span className="concept-heading-line">antes de</span></div>
              <div className="text-mask"><span className="concept-heading-line accent">construir.</span></div>
            </div>

            <div className="concept-body">
              <p>
                Soy J. Samuel. Estudio Ingeniería de Software con IA y estoy construyendo
                mi camino alrededor de software de negocio, arquitectura, seguridad,
                producto y datos.
              </p>
              <p>
                No quiero empezar una solución preguntando qué framework usar. Primero
                quiero entender cómo funciona el trabajo real: quién hace qué, dónde se
                pierde tiempo, qué información se duplica y qué reglas no pueden romperse.
              </p>
              <p>
                Esa forma de pensar es la base de lo que estoy construyendo hoy y también
                de la consultora de software que quiero desarrollar en el futuro.
              </p>
            </div>
          </div>

          <div className="concept-visual" aria-hidden="true">
            <div className="concept-visual-meta">
              <span>REALITY / PROCESS / SOFTWARE</span>
              <span>001</span>
            </div>
            <div className="concept-visual-ring concept-visual-ring-a" />
            <div className="concept-visual-ring concept-visual-ring-b" />
            <div className="concept-visual-ring concept-visual-ring-c" />
            <div className="concept-visual-core">SYSTEM</div>
            <div className="concept-visual-foot">
              <span>FIELD INPUT</span>
              <span>STRUCTURED OUTPUT</span>
            </div>
          </div>
        </section>

        <section className="section systems-section" id="systems">
          <header className="section-title">
            <span className="section-number">002</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>P r o c e s s &<br />S y s t e m s</h2>
                <small>(Cómo convierto problemas en software)</small>
              </div>
            </div>
          </header>

          <div className="systems-intro">
            <h3>
              El software útil empieza<br />
              mucho antes del código.
            </h3>
            <div>
              <p>
                Un proceso real tiene personas, documentos, tiempos, decisiones, excepciones
                y consecuencias. Mi objetivo es hacer visible esa complejidad antes de
                convertirla en pantallas.
              </p>
              <p>
                Por eso trabajo en tres movimientos: observar, modelar y construir.
              </p>
            </div>
          </div>

          <div className="process-layout">
            <aside className="process-visual-wrap">
              <div className="process-visual">
                <div className="process-tabs">
                  {processSteps.map((step, index) => (
                    <span className={activeProcess === index ? 'active' : ''} key={step.id}>
                      {step.id}
                    </span>
                  ))}
                </div>

                <div className={`process-art process-art-${activeProcess + 1}`} aria-hidden="true">
                  <div className="process-orbit orbit-one" />
                  <div className="process-orbit orbit-two" />
                  <div className="process-orbit orbit-three" />
                  <div className="process-core">{active.id}</div>
                  <span className="process-node node-one" />
                  <span className="process-node node-two" />
                  <span className="process-node node-three" />
                </div>

                <div className="process-visual-caption">
                  <span>{active.tag}</span>
                  <span>{active.id} /03</span>
                </div>
              </div>
            </aside>

            <div className="process-steps">
              {processSteps.map((step) => (
                <article className="process-step" key={step.id}>
                  <span className="process-count process-reveal">{step.id} /03</span>
                  <h4 className="process-reveal">{step.title}</h4>
                  <p className="process-reveal">{step.copy}</p>
                  <span className="process-tag process-reveal">{step.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section scene-section" id="scene">
          <header className="section-title">
            <span className="section-number">003</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>S c e n e</h2>
                <small>(Dónde aplico lo que aprendo)</small>
              </div>
            </div>
          </header>

          <div className="scene-intro">
            <h3>
              Construir, aprender<br />
              y volver a conectar.
            </h3>
            <p>
              Mi práctica no vive en una sola tecnología. Hay una parte enfocada en sistemas
              reales para organizaciones y otra dedicada a experimentar con nuevas herramientas,
              datos, IA y formas de interacción.
            </p>
          </div>

          <div className="scene-gallery">
            <div className="scene-group">
              <div className="scene-group-label">
                <span>For /</span>
                <strong>BUILD</strong>
              </div>

              <div className="scene-grid">
                {buildScenes.map(([eyebrow, title, copy], index) => (
                  <article className="scene-card" key={title}>
                    <div className={`scene-image scene-image-${index + 1}`} aria-hidden="true">
                      <span />
                      <span />
                      <b>{String(index + 1).padStart(2, '0')}</b>
                    </div>
                    <span>{eyebrow}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="scene-group scene-group-explore">
              <div className="scene-group-label">
                <span>For /</span>
                <strong>EXPLORE</strong>
              </div>

              <div className="scene-grid">
                {exploreScenes.map(([eyebrow, title, copy], index) => (
                  <article className="scene-card" key={title}>
                    <div className={`scene-image scene-image-${index + 5}`} aria-hidden="true">
                      <span />
                      <span />
                      <b>{String(index + 5).padStart(2, '0')}</b>
                    </div>
                    <span>{eyebrow}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-kicker">/ Contact</div>
          <h2>
            Hablemos de un problema<br />
            que valga la pena resolver.
          </h2>

          <a className="whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>START ON WHATSAPP</span>
            <strong>+51 901 036 216 ↗</strong>
          </a>
        </section>

        <footer className="site-footer">
          <div className="footer-links">
            <a href="#concept"><span>About</span><small>Quién soy y cómo pienso</small></a>
            <a href="#systems"><span>Process & Systems</span><small>Cómo convierto problemas en software</small></a>
            <a href="#scene"><span>Scene</span><small>Dónde aplico lo que aprendo</small></a>
            <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer"><span>GitHub ↗</span><small>Selected repositories</small></a>
          </div>

          <div className="footer-bottom">
            <span>J. SAMUEL / PUNO, PERÚ</span>
            <span>QITIAN / 齐天</span>
            <span>© 2026</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
