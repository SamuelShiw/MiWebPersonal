import { useEffect, useRef } from "react";

export function SystemSculpture(){
  const stageRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const stage=stageRef.current;
    if(!stage||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const hero=stage.closest(".hero");
    if(!hero)return;
    const move=(event:Event)=>{
      const e=event as PointerEvent;
      const rect=hero.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      stage.style.setProperty("--pointer-x",String(x));
      stage.style.setProperty("--pointer-y",String(y));
    };
    const leave=()=>{stage.style.setProperty("--pointer-x","0");stage.style.setProperty("--pointer-y","0")};
    hero.addEventListener("pointermove",move);
    hero.addEventListener("pointerleave",leave);
    return()=>{hero.removeEventListener("pointermove",move);hero.removeEventListener("pointerleave",leave)};
  },[]);
  return <div ref={stageRef} className="system-stage" aria-hidden="true" data-parallax="8">
    <div className="system-ring ring-one"/><div className="system-ring ring-two"/>
    <div className="system-orbit">
      <div className="system-cube"><i className="face front"/><i className="face back"/><i className="face left"/><i className="face right"/><i className="face top"/><i className="face bottom"/><span className="cube-core">01</span></div>
      <span className="node n1"/><span className="node n2"/><span className="node n3"/><span className="node n4"/>
      <b className="axis a1"/><b className="axis a2"/><b className="axis a3"/>
      <span className="module-label ml1">UI</span><span className="module-label ml2">API</span><span className="module-label ml3">DATA</span>
    </div>
    <span className="system-signature" translate="no">JS.</span><small>SYSTEM / 2026</small>
  </div>
}