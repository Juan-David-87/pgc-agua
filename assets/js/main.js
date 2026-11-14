"use strict";
const sections=[
 ["inicio","Inicio","index.html"],["identificacion","Identificación","pages/identificacion.html"],
 ["problema","Problema","pages/problema.html"],["justificacion","Justificación","pages/justificacion.html"],
 ["objetivos","Objetivos","pages/objetivos.html"],["marco","Marco referencial","pages/marco.html"],
 ["metodologia","Metodología","pages/metodologia.html"],["solucion","Solución","pages/solucion.html"],
 ["datos","Datos y ETL","pages/datos.html"],["resultados","Resultados","pages/resultados.html"],
 ["conocimientos","Conocimientos","pages/conocimientos.html"],["decisiones","Decisiones","pages/decisiones.html"],
 ["dashboard","Dashboard","pages/dashboard.html"],["conclusiones","Conclusiones","pages/conclusiones.html"]
];
const page=document.body.dataset.page||"inicio";
const prefix=page==="inicio"?"":"../";
const path=id=>prefix+sections.find(x=>x[0]===id)[2];
const header=document.querySelector("#app-header");
if(header){
 const links=sections.map(([id,label])=>`<a href="${path(id)}" ${id===page?'aria-current="page"':''}>${label}</a>`).join("");
 header.innerHTML=`<header class="site-header"><div class="container header-inner"><a class="brand" href="${path('inicio')}" aria-label="Inicio PGC Agua"><span class="brand-mark" aria-hidden="true">◈</span><span>PGC<em> / AGUA</em></span></a><button type="button" class="nav-toggle" aria-controls="site-nav" aria-expanded="false">☰ Menú</button><nav class="nav" id="site-nav" aria-label="Navegación principal">${links}</nav></div><div class="progress" id="reading-progress"></div></header>`;
 const menu=header.querySelector(".nav-toggle"),nav=header.querySelector(".nav");
 menu.addEventListener("click",()=>{const active=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(active));menu.textContent=active?"✕ Cerrar":"☰ Menú";});
 nav.addEventListener("click",e=>{if(e.target.closest("a")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.focus();}});
}
const footer=document.querySelector("#app-footer");
if(footer)footer.innerHTML=`<footer class="site-footer"><div class="container footer-inner"><div><strong>PGC · Sistema de monitoreo de almacenamiento y calidad del agua</strong><p>Ingeniería en Sistemas y Computación · Universidad de Cundinamarca · Sede Chía</p></div><a href="${path('dashboard')}">Explorar Power BI ↗</a></div></footer>`;
if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 const io=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}});},{threshold:.09});
 document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
const progress=document.querySelector("#reading-progress");
const update=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?Math.min(100,100*scrollY/max):100)+"%";};
window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();
