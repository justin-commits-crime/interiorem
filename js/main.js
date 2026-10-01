(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.contact h2').forEach(el=>io.observe(el));

window.setHero=h=>{document.body.dataset.hero=h;
const el=$('.hero-'+{manifesto:'a',editorial:'b',slash:'c',index:'d',annotated:'e',signal:'f'}[h]);el.classList.remove('in');void el.offsetWidth;setTimeout(()=>el.classList.add('in'),30);tick()};

// manifesto words
const m=$('#mText');
const wrapWords=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.append(w);else{const s=document.createElement('span');s.textContent=w;f.append(s)}});n.replaceWith(f)}else if(n.classList&&n.classList.contains('hl')){}});};
wrapWords(m);const words=[...m.querySelectorAll('span')];

let sp=0,mx=0,my=0,ax=0,ay=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
(function t3(now){ax+=(mx-ax)*.05;ay+=(my-ay)*.05;const ci=$('#cIn'),s=(now||0)/1000;
if(ci&&document.body.dataset.hero==='slash'){const f=lerp(1,.45,sp),bx=Math.sin(s*.6)*14*f,by=Math.sin(s*.9)*18*f,rz=Math.sin(s*.45)*2.2*f,rx=Math.cos(s*.7)*3*f,ry=Math.sin(s*.5)*4*f;
ci.style.transform=`translate3d(${bx-ax*40}px,${by-ay*30+lerp(60,0,sp)}px,${lerp(-320,0,sp)}px) rotateX(${lerp(18,0,sp)+rx-ay*14}deg) rotateY(${lerp(-24,0,sp)+ry+ax*18}deg) rotateZ(${lerp(-6,0,sp)+rz}deg) scale(${innerWidth>600?lerp(1.4,1.14,sp):lerp(1.2,1.08,sp)})`;
ci.style.filter=`blur(${lerp(3,0,Math.min(1,sp*2.5))}px)`}requestAnimationFrame(t3)})();
const hdr=$('#hdr');
const navLinks=$$('.hdr nav a'),navSecs=navLinks.map(a=>a.dataset.sec);
// menu button opens the full menu panel under the header (at every width)
const menuBtn=$('#menuBtn');
const setMenu=o=>{hdr.classList.toggle('open',o);menuBtn.setAttribute('aria-expanded',o);menuBtn.setAttribute('aria-label',o?'Close menu':'Open menu')};
menuBtn.onclick=()=>setMenu(!hdr.classList.contains('open'));
navLinks.forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&hdr.classList.contains('open')){setMenu(false);menuBtn.focus()}});
document.addEventListener('click',e=>{if(hdr.classList.contains('open')&&!hdr.contains(e.target))setMenu(false)});
function tick(){const y=scrollY,vh=innerHeight;
// highlight the nav link for the section under the header; the hero counts as About
let cur='manifesto',best=-Infinity;[...navSecs,'contact'].forEach(id=>{const el=document.getElementById(id),t=el?el.getBoundingClientRect().top:Infinity;if(t<=vh*.4&&t>best){best=t;cur=id}});
navLinks.forEach(a=>a.dataset.sec===cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'));

const hero=document.body.dataset.hero;
if(hero==='manifesto'){const s=$('#strip');s.style.transform=`translateX(${-y*.35}px)`}
if(hero==='editorial'){$('#bImg').style.transform=`scale(${lerp(1.18,1,clamp(y/vh))}) translateY(${y*.06}px)`}
if(hero==='slash'){const c=$('#heroC'),p=clamp((y-c.offsetTop)/(c.offsetHeight-vh)),e=1-Math.pow(1-p,3);sp=e;
// resting slash: the original shape scaled to 65% around the centre (keep in sync with .hero-c .img in the CSS)
const tl=lerp(51.3,0,e),tr=lerp(53.25,100,e),br=lerp(48.7,100,e),bl=lerp(46.75,0,e),ty=lerp(25.3,0,e),by=lerp(74.7,100,e);
const img=$('#cImg');img.style.clipPath=`polygon(${tl}% ${ty}%,${tr}% ${ty}%,${br}% ${by}%,${bl}% ${by}%)`;img.style.setProperty('--dim',lerp(0,.45,e));
// words part sideways on wide screens; on narrow ones that pushes them off-screen, so they part vertically
if(innerWidth>600){$('#w1').style.transform=`translateY(-50%) translateX(${-e*18}vw)`;$('#w2').style.transform=`translateY(-50%) translateX(${e*18}vw)`}
else{$('#w1').style.transform=`translateY(calc(-50% - ${e*5}svh))`;$('#w2').style.transform=`translateY(calc(-50% + ${e*5}svh))`}
$('#cHint').style.opacity=1-p*4}
const ms=$('#manifesto'),r=ms.getBoundingClientRect(),mp=clamp(-r.top/(ms.offsetHeight-vh)*1.15);
const lit=Math.round(mp*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<lit));}
addEventListener('scroll',()=>requestAnimationFrame(tick),{passive:true});addEventListener('resize',tick);

setHero(new URLSearchParams(location.search).get('hero')||document.body.dataset.hero);
})();
