import { Link } from "react-router-dom";import { useTranslation } from "react-i18next";
export function WorkPage(){const {t}=useTranslation();return <main className="work-page">
<section className="work-index-hero"><p className="section-label">WORK / SELECTED + OTHER</p><h1>{t("workPage.hero")}</h1><p>{t("workPage.intro")}</p></section>
<section className="work-featured"><p className="section-label">01 / {t("workPage.selected")}</p>
<article className="work-entry"><span>01</span><div><h2 translate="no">BRACKET</h2><p>Dental Clinic Management System</p><p>Healthcare · Product Engineering · Full Stack</p><Link className="text-link underline-link" to="/work/bracket">VIEW CASE STUDY ↗</Link></div></article>
<article className="work-entry"><span>02</span><div><h2>MINING OPERATIONS INTELLIGENCE</h2><p>Decision-Support Web Application</p><p>Mining · Data · Decision Support</p><Link className="text-link underline-link" to="/work/mining-operations">VIEW CASE STUDY ↗</Link></div></article>
</section>
<section className="work-other dark-page-section"><p className="section-label">02 / {t("workPage.other")}</p><h2>MORE SYSTEMS.<br/>MORE QUESTIONS.</h2><div className="work-other-grid">
<article><span>01</span><h3>SIGET-ML</h3><p>Machine Learning · FastAPI</p></article>
<article><span>02</span><h3>ROAD ACCIDENT ANALYSIS / PUNO</h3><p>Data · Machine Learning</p></article>
<article><span>03</span><h3>INTELLIGENT SURVEILLANCE</h3><p>Computer Vision · Experimental</p></article>
</div></section>
<section className="work-next"><p className="section-label">03 / NEXT</p><h2>{t("workPage.next")}</h2><Link className="text-link underline-link" to="/about">{t("workPage.about")} ↗</Link></section>
</main>}