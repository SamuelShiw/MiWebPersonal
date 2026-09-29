import { Link } from "react-router-dom";
export function WorkPage(){return <main className="work-page">
<section className="work-index-hero"><p className="section-label">WORK / SELECTED + OTHER</p><h1>PROBLEMS.<br/>SYSTEMS.<br/>PRODUCTS.</h1><p>A curated selection of software products, data work and experiments built around real problems.</p></section>
<section className="work-featured"><p className="section-label">01 / SELECTED WORK</p>
<article className="work-entry"><span>01</span><div><h2 translate="no">BRACKET</h2><p>Dental Clinic Management System</p><p>Healthcare · Product Engineering · Full Stack</p><Link className="text-link underline-link" to="/work/bracket">VIEW CASE STUDY ↗</Link></div></article>
<article className="work-entry"><span>02</span><div><h2>MINING OPERATIONS INTELLIGENCE</h2><p>Decision-Support Web Application</p><p>Mining · Data · Decision Support</p><Link className="text-link underline-link" to="/work/mining-operations">VIEW CASE STUDY ↗</Link></div></article>
</section>
<section className="work-other dark-page-section"><p className="section-label">02 / OTHER WORK</p><h2>MORE SYSTEMS.<br/>MORE QUESTIONS.</h2><div className="work-other-grid">
<article><span>01</span><h3>SIGET-ML</h3><p>Machine Learning · FastAPI</p></article>
<article><span>02</span><h3>ROAD ACCIDENT ANALYSIS / PUNO</h3><p>Data · Machine Learning</p></article>
<article><span>03</span><h3>INTELLIGENT SURVEILLANCE</h3><p>Computer Vision · Experimental</p></article>
</div></section>
<section className="work-next"><p className="section-label">03 / NEXT</p><h2>THE WORK IS STILL EVOLVING.</h2><Link className="text-link underline-link" to="/about">ABOUT J. SAMUEL ↗</Link></section>
</main>}