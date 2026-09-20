import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const whatsappNumber = '51901036216'
const whatsappMessage =
  'Hola J. Samuel, vi tu portafolio y me gustaría conversar contigo sobre un proyecto.'

const chapterLinks = [
  ['001', 'Concept', '#concept'],
  ['002', 'Process & Systems', '#systems'],
  ['003', 'Scene', '#scene'],
]

const processStories = [
  {
    id: '01',
    title: 'Observar el trabajo real.',
    body:
      'Antes de decidir tecnología, documento personas, tiempos, documentos, errores, esperas, decisiones y puntos donde la información se pierde.',
    tag: 'FIELD / AS-IS',
  },
  {
    id: '02',
    title: 'Convertir realidad en reglas.',
    body:
      'El proceso se traduce en estados, permisos, datos, restricciones, responsabilidades y excepciones. Esa estructura es la materia prima de la arquitectura.',
    tag: 'MODEL / RULES',
  },
  {
    id: '03',
    title: 'Construir un sistema útil.',
    body:
      'La interfaz, la seguridad, la arquitectura y el producto se conectan para entregar software que pueda verificarse, mantenerse y evolucionar.',
    tag: 'BUILD / PRODUCT',
  },
]

const buildItems = [
  ['Business Software', 'BRACKET', 'Flujos clínicos, agenda, caja y trazabilidad.'],
  ['Architecture', 'System Design', 'Límites, responsabilidades y contratos.'],
  ['Security', 'Access & Audit', 'Permisos, integridad y auditoría.'],
  ['Product', 'Real Users', 'Priorizar fricción real antes que features decorativas.'],
]

const exploreItems = [
  ['Artificial Intelligence', 'Applied AI', 'IA integrada cuando mejora una decisión concreta.'],
  ['Data', 'Analytics', 'Modelado y transformación de información.'],
  ['Computer Vision', 'Vision Systems', 'Detección y monitoreo visual.'],
  ['Creative Tech', 'QITIAN Lab', 'Motion, 3D e interfaces experimentales.'],
]

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      cancelAnimationFrame(rafId)
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
        .from('.hero-title-char', {
          yPercent: 115,
          stagger: 0.04,
          duration: 0.9,
          ease: 'power4.out',
        })
        .from('.hero-chapter-row', {
          opacity: 0,
          y: 18,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.5')
        .from('.hero-art-inner', {
          scale: 0.85,
          opacity: 0,
          rotate: -8,
          duration: 1.1,
          ease: 'power3.out',
        }, '-=0.65')

      gsap.to('.hero-title-line', {
        yPercent: -10,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.hero-art-inner', {
        rotate: 18,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.section-heading').forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          x: -24,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 84%',
          },
        })
      })

      gsap.from('.concept-lead-line', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.concept-lead',
          start: 'top 82%',
        },
      })

      gsap.from('.concept-copy p', {
        opacity: 0,
        y: 22,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.concept-copy',
          start: 'top 78%',
        },
      })

      gsap.to('.concept-art-core', {
        rotate: 100,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.concept-art',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.process-story').forEach((story) => {
        gsap.from(story.querySelectorAll('.story-reveal'), {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: story,
            start: 'top 76%',
          },
        })

        const art = story.querySelector('.story-art-inner')
        if (art) {
          gsap.fromTo(
            art,
            { yPercent: -7, scale: 1.06 },
            {
              yPercent: 7,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: story,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }
      })

      gsap.from('.scene-card', {
        opacity: 0,
        y: 42,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scene-mosaic',
          start: 'top 76%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="zeroz-page">
      <header className="topbar">
        <a className="brand" href="#top">J. SAMUEL</a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>Menu</span>
          <i />
          <i />
        </button>
      </header>

      <aside className="side-progress" aria-hidden="true">
        <span>01</span>
        <i />
        <span>11</span>
      </aside>

      <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`}>
        <button className="menu-close" type="button" onClick={() => setMenuOpen(false)}>
          Close
        </button>

        <nav>
          {chapterLinks.map(([number, label, href]) => (
            <a href={href} key={number} onClick={() => setMenuOpen(false)}>
              <span>{label}</span>
              <small>{number}</small>
            </a>
          ))}
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>Contact</span>
            <small>004</small>
          </a>
        </nav>

        <div className="menu-meta">
          <span>PUNO, PERÚ</span>
          <span>QITIAN / 齐天</span>
        </div>
      </div>

      <main>
        <section className="about-hero" id="top">
          <div className="hero-chapter-list">
            {chapterLinks.map(([number, label, href]) => (
              <a className="hero-chapter-row" href={href} key={number}>
                <span>{number}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </div>

          <div className="hero-title-line">
            <span className="hero-slash">/</span>
            <h1 aria-label="About">
              {'About'.split('').map((char, index) => (
                <span className="hero-title-mask" key={index}>
                  <span className="hero-title-char">{char}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-inner">
              <span className="hero-ring hero-ring-a" />
              <span className="hero-ring hero-ring-b" />
              <span className="hero-ring hero-ring-c" />
              <span className="hero-dot hero-dot-a" />
              <span className="hero-dot hero-dot-b" />
              <b>JS</b>
            </div>
          </div>

          <div className="hero-foot">
            <span>J. SAMUEL / SOFTWARE SYSTEMS</span>
            <span>SCROLL ↓</span>
          </div>
        </section>

        <section className="chapter concept-chapter" id="concept">
          <header className="section-heading">
            <span className="section-number">001</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>C o n c e p t</h2>
                <small>(Enfoque)</small>
              </div>
            </div>
          </header>

          <div className="concept-lead">
            <div className="line-mask"><span className="concept-lead-line">Entender el sistema</span></div>
            <div className="line-mask"><span className="concept-lead-line">antes de escribir</span></div>
            <div className="line-mask"><span className="concept-lead-line accent">el código.</span></div>
          </div>

          <div className="concept-copy">
            <p>
              Soy J. Samuel. Estudio Ingeniería de Software con IA y estoy construyendo mi
              camino alrededor de software de negocio, arquitectura, seguridad, producto y datos.
            </p>
            <p>
              Mi punto de partida no es el framework. Primero observo cómo funciona el trabajo
              real: quién participa, dónde se pierde tiempo, qué información se repite y qué
              reglas no pueden romperse.
            </p>
            <p>
              Cuando esa realidad se vuelve comprensible, recién empieza la arquitectura.
              Procesos, estados, permisos, datos y decisiones dejan de ser piezas sueltas y
              empiezan a formar un sistema.
            </p>
            <p>
              Ese enfoque guía BRACKET y también la forma en la que quiero construir productos
              y una futura consultora de software.
            </p>
          </div>

          <div className="concept-art" aria-hidden="true">
            <div className="art-top">
              <span>ACTIVE SYSTEM THINKING</span>
              <span>001</span>
            </div>

            <div className="concept-art-core">
              <span className="concept-ring concept-ring-a" />
              <span className="concept-ring concept-ring-b" />
              <span className="concept-ring concept-ring-c" />
              <span className="concept-node node-a" />
              <span className="concept-node node-b" />
              <span className="concept-node node-c" />
              <strong>SYSTEM</strong>
            </div>

            <div className="art-bottom">
              <span>REALITY</span>
              <span>STRUCTURE</span>
            </div>
          </div>
        </section>

        <section className="chapter systems-chapter" id="systems">
          <header className="section-heading section-heading-light">
            <span className="section-number">002</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>P r o c e s s &<br />S y s t e m s</h2>
                <small>(Proceso y sistemas)</small>
              </div>
            </div>
          </header>

          <div className="systems-lead">
            <h3>
              El software útil empieza<br />
              mucho antes del código.
            </h3>
            <div>
              <p>
                Un proceso real mezcla personas, documentos, tiempos, reglas, decisiones y
                excepciones. Si esa complejidad no se entiende, la interfaz solo la esconde.
              </p>
              <p>
                Por eso trabajo en tres movimientos: observar, modelar y construir.
              </p>
            </div>
          </div>

          <div className="process-overview" aria-hidden="true">
            <div className="overview-thumb thumb-02">
              <span>02</span>
              <i />
            </div>
            <div className="overview-thumb thumb-03">
              <span>03</span>
              <i />
            </div>
            <div className="overview-thumb thumb-01">
              <span>01</span>
              <i />
            </div>
          </div>

          <div className="process-story-list">
            {processStories.map((story, index) => (
              <article className="process-story" key={story.id}>
                <div className={`story-art story-art-${index + 1}`} aria-hidden="true">
                  <div className="story-art-inner">
                    <span className="story-ring story-ring-a" />
                    <span className="story-ring story-ring-b" />
                    <span className="story-ring story-ring-c" />
                    <span className="story-node story-node-a" />
                    <span className="story-node story-node-b" />
                    <b>{story.id}</b>
                  </div>
                </div>

                <div className="story-copy">
                  <span className="story-count story-reveal">{story.id} /03</span>
                  <h4 className="story-reveal">{story.title}</h4>
                  <p className="story-reveal">{story.body}</p>
                  <span className="story-tag story-reveal">{story.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="chapter scene-chapter" id="scene">
          <header className="section-heading">
            <span className="section-number">003</span>
            <div className="section-name">
              <span>/</span>
              <div>
                <h2>S c e n e</h2>
                <small>(Escenarios)</small>
              </div>
            </div>
          </header>

          <div className="scene-lead">
            <h3>
              Construir y explorar<br />
              forman una sola práctica.
            </h3>
            <p>
              Hay una parte de mi trabajo enfocada en sistemas para organizaciones y otra
              dedicada a explorar herramientas, IA, datos e interfaces. Ambas se alimentan.
            </p>
          </div>

          <div className="scene-mosaic">
            <div className="scene-column">
              <div className="scene-for">For /</div>
              <div className="scene-cards">
                {buildItems.map(([eyebrow, title, copy], index) => (
                  <article className="scene-card" key={title}>
                    <div className={`scene-visual visual-${index + 1}`} aria-hidden="true">
                      <span />
                      <span />
                      <i />
                      <b>{String(index + 1).padStart(2, '0')}</b>
                    </div>
                    <span>{eyebrow}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>

              <div className="scene-group-name">BUILD</div>

              <ul className="scene-list">
                {buildItems.map(([eyebrow, title, copy]) => (
                  <li key={title}>
                    <strong>{eyebrow}</strong>
                    <span>{copy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="scene-column">
              <div className="scene-for">For /</div>
              <div className="scene-cards">
                {exploreItems.map(([eyebrow, title, copy], index) => (
                  <article className="scene-card" key={title}>
                    <div className={`scene-visual visual-${index + 5}`} aria-hidden="true">
                      <span />
                      <span />
                      <i />
                      <b>{String(index + 5).padStart(2, '0')}</b>
                    </div>
                    <span>{eyebrow}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>

              <div className="scene-group-name accent">EXPLORE</div>

              <ul className="scene-list">
                {exploreItems.map(([eyebrow, title, copy]) => (
                  <li key={title}>
                    <strong>{eyebrow}</strong>
                    <span>{copy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-nav">
            <a href="#concept">
              <span>About</span>
              <small>Quién soy y cómo pienso</small>
            </a>
            <a href="#systems">
              <span>Process & Systems</span>
              <small>Cómo convierto problemas en software</small>
            </a>
            <a href="#scene">
              <span>Scene</span>
              <small>Dónde aplico lo que aprendo</small>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>WhatsApp ↗</span>
              <small>+51 901 036 216</small>
            </a>
          </div>

          <div className="footer-meta">
            <a href="#top">Home</a>
            <a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">GitHub ↗</a>
            <span>J. SAMUEL / PUNO, PERÚ</span>
            <span>© 2026</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
