import { useState } from "react";
import "./editorial.css";

const links = [{label:"PROFILE",id:"profile"},{label:"PROJECTS",id:"projects"},{label:"CONTACT",id:"contact"}];
export function EditorialHome(){
 const [menu,setMenu]=useState(false);
 const jump=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenu(false)};
 return <div className="jm-experience">
  <section id="intro" className="jm-panel jm-cover" aria-label="Portada">
   <div className="jm-mark" aria-label="JMael">JM<span>.</span></div>
   <div className="jm-cover-main"><div className="jm-cover-portrait" role="img" aria-label="Retrato provisional de perfil"/><div className="jm-cover-heading"><h1>PORTFOLIO</h1><span>2026</span><p><i/> CREATIVE DEVELOPER</p></div></div>
   <nav className="jm-start-menu" aria-label="Menú de entrada"><button onClick={()=>jump("profile")}>START</button><button onClick={()=>jump("profile")}>OPTIONS</button><button onClick={()=>jump("contact")}>CONTACT</button></nav>
  </section>
  <section id="profile" className="jm-panel jm-profile">
   <header className="jm-panel-nav"><a className="jm-mini-mark" href="#intro">JM.</a><button className="jm-mobile-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu}>MENU</button><nav className={menu?"is-open":""}>{links.map(l=><button key={l.id} className={l.id==="profile"?"active":""} onClick={()=>jump(l.id)}>{l.label}</button>)}</nav></header>
   <div className="jm-profile-grid"><div className="jm-person"><span>HELLO, I AM</span><h2>J. SAMUEL</h2><div className="jm-photo jm-photo-profile" role="img" aria-label="Fotografía de perfil provisional"/></div>
   <div className="jm-bio"><h2>ABOUT ME</h2><p>Soy J. Samuel, desarrollador full-stack y creador digital de Puno, Perú. Diseño soluciones, construyo productos y comparto el proceso de convertir problemas reales en software.</p><h3>SOFTWARE SKILLS</h3><div className="jm-skills"><span>TS</span><span>REACT</span><span>NODE</span><span>SQL</span><span>UI</span></div><div className="jm-details"><div><h3>EDUCATION</h3><p>SENATI<br/>Ingeniería de Software con IA<br/>En formación</p></div><div><h3>EXPERIENCE</h3><p>Desarrollo de productos<br/>Sistemas para negocios<br/>Proyectos de datos</p></div></div><h3>LANGUAGE</h3><p>Español · Inglés en aprendizaje</p></div></div>
  </section>
  <section id="projects" className="jm-panel jm-projects">
   <header className="jm-panel-nav"><a className="jm-mini-mark" href="#intro">JM.</a><nav>{links.map(l=><button key={l.id} className={l.id==="projects"?"active":""} onClick={()=>jump(l.id)}>{l.label}</button>)}</nav></header>
   <h2>RECAP PROJECT 2026 <small>NO. 01</small></h2><div className="jm-project-grid">{Array.from({length:8},(_,i)=><div className="jm-project-empty" key={i} aria-label={`Espacio para proyecto ${i+1}`}><span>+</span></div>)}</div>
  </section>
  <section id="contact" className="jm-panel jm-contact">
   <header className="jm-panel-nav"><a className="jm-mini-mark" href="#intro">JM.</a><nav>{links.map(l=><button key={l.id} className={l.id==="contact"?"active":""} onClick={()=>jump(l.id)}>{l.label}</button>)}</nav></header>
   <div className="jm-contact-grid"><div className="jm-contact-person"><div className="jm-photo jm-photo-circle" role="img" aria-label="Retrato provisional"/><strong>J. SAMUEL</strong><small>PUNO, PERÚ</small></div><div className="jm-social"><h2>CONTACT ME</h2><a href="https://github.com/SamuelShiw" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/j-samuell/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:sumailqm10@gmail.com">EMAIL ↗</a><a href="https://wa.me/51901036216" target="_blank" rel="noreferrer">WHATSAPP ↗</a></div><div className="jm-thanks">THANK YOU<br/><span>2026</span></div></div>
   <div className="jm-footer-art" aria-hidden="true"><span className="jm-disc"/><span className="jm-film">▣ ▣ ▣ ▣ ▣ ▣</span></div>
   <footer>JMAEL © 2026 <a href="#intro">BACK TO TOP ↑</a></footer>
  </section>
 </div>
}
