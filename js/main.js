(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.contact h2').forEach(el=>io.observe(el));

window.setHero=h=>{document.body.dataset.hero=h;document.body.classList.toggle('dark-top',h==='slash'||h==='signal');
const el=$('.hero-'+{manifesto:'a',editorial:'b',slash:'c',index:'d',annotated:'e',signal:'f'}[h]);el.classList.remove('in');void el.offsetWidth;setTimeout(()=>el.classList.add('in'),30);tick()};

// manifesto words
const m=$('#mText');
const wrapWords=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.append(w);else{const s=document.createElement('span');s.textContent=w;f.append(s)}});n.replaceWith(f)}else if(n.classList&&n.classList.contains('hl')){}});};
wrapWords(m);const words=[...m.querySelectorAll('span')];

let sp=0,mx=0,my=0,ax=0,ay=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
(function t3(now){ax+=(mx-ax)*.05;ay+=(my-ay)*.05;const ci=$('#cIn'),s=(now||0)/1000;
if(ci&&document.body.dataset.hero==='slash'){const f=lerp(1,.45,sp),bx=Math.sin(s*.6)*14*f,by=Math.sin(s*.9)*18*f,rz=Math.sin(s*.45)*2.2*f,rx=Math.cos(s*.7)*3*f,ry=Math.sin(s*.5)*4*f;
ci.style.transform=`translate3d(${bx-ax*40}px,${by-ay*30+lerp(60,0,sp)}px,${lerp(-320,0,sp)}px) rotateX(${lerp(18,0,sp)+rx-ay*14}deg) rotateY(${lerp(-24,0,sp)+ry+ax*18}deg) rotateZ(${lerp(-6,0,sp)+rz}deg) scale(${lerp(1.4,1.14,sp)})`;
ci.style.filter=`blur(${lerp(3,0,Math.min(1,sp*2.5))}px)`}requestAnimationFrame(t3)})();
const hdr=$('#hdr');let lastY=0;
function tick(){const y=scrollY,vh=innerHeight;
hdr.classList.toggle('solid',document.body.dataset.hero==='slash'?y>$('#heroC').offsetHeight-90:y>40);
hdr.classList.toggle('hide',y>lastY&&y>600);lastY=y;
const hero=document.body.dataset.hero;
if(hero==='manifesto'){const s=$('#strip');s.style.transform=`translateX(${-y*.35}px)`}
if(hero==='editorial'){$('#bImg').style.transform=`scale(${lerp(1.18,1,clamp(y/vh))}) translateY(${y*.06}px)`}
if(hero==='slash'){const c=$('#heroC'),p=clamp((y-c.offsetTop)/(c.offsetHeight-vh)),e=1-Math.pow(1-p,3);sp=e;
const tl=lerp(52,0,e),tr=lerp(55,100,e),br=lerp(48,100,e),bl=lerp(45,0,e),ty=lerp(12,0,e),by=lerp(88,100,e);
const img=$('#cImg');img.style.clipPath=`polygon(${tl}% ${ty}%,${tr}% ${ty}%,${br}% ${by}%,${bl}% ${by}%)`;img.style.setProperty('--dim',lerp(0,.45,e));
$('#w1').style.transform=`translateY(-50%) translateX(${-e*18}vw)`;$('#w2').style.transform=`translateY(-50%) translateX(${e*18}vw)`;
$('#cHint').style.opacity=1-p*4}
const ms=$('#manifesto'),r=ms.getBoundingClientRect(),mp=clamp(-r.top/(ms.offsetHeight-vh)*1.15);
const lit=Math.round(mp*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<lit));}
addEventListener('scroll',()=>requestAnimationFrame(tick),{passive:true});addEventListener('resize',tick);

// work filters
$$('#filters button').forEach(b=>b.onclick=()=>{$$('#filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;$$('.proj').forEach(p=>p.classList.toggle('off',f!=='all'&&p.dataset.cat!==f))});
const cur=$('#cursor');let cx=0,cy=0,tx=0,ty=0;
addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
(function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(loop)})();
$$('.proj').forEach(p=>{p.onmouseenter=()=>matchMedia('(min-width:861px)').matches&&cur.classList.add('on');p.onmouseleave=()=>cur.classList.remove('on');p.onclick=e=>e.preventDefault()});

const dp=$('#dprev');let px=0,py=0,pt=[0,0];
$$('.idx-row').forEach(r=>{r.onmouseenter=()=>{dp.style.backgroundImage='url(ds/assets/imagery/'+r.dataset.img+')';dp.classList.add('on')};r.onmouseleave=()=>dp.classList.remove('on')});
(function dl(){px+=(tx-px)*.12;py+=(ty-py)*.12;dp.style.left=px+'px';dp.style.top=py+'px';requestAnimationFrame(dl)})();
// services
$$('.svc button').forEach(b=>b.onclick=()=>{const s=b.parentElement,o=s.classList.contains('open');$$('.svc').forEach(x=>x.classList.remove('open'));if(!o)s.classList.add('open')});

// form
$$('.chips').forEach(c=>c.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(c.dataset.multi)b.classList.toggle('on');else[...c.children].forEach(x=>x.classList.toggle('on',x===b))}));
const enq=$('#enq');if(enq)enq.onsubmit=e=>{e.preventDefault();$('#cg').classList.add('sent')};

setHero(new URLSearchParams(location.search).get('hero')||document.body.dataset.hero);
})();
