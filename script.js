// ===== Easy edits: fill these in later =====
var CFG={
 date:"December 6, 2026 00:00:00",
 time:"—",      // e.g. "3:00 PM"
 venue:"",      // e.g. "Venue name, Street, City"
 mapUrl:"",     // paste a Google Maps link here
 phone:"", email:""
};
var T=[
 {id:"bills",ico:"💙",t:"7 Blue Bills",v:"gives a blue bill",
  p:"Seven special guests each share a blue bill, wishing Yvanna a bright and blessed year ahead.",
  g:["Sofia Reyes","Althea Cruz","Camille Santos","Bianca Flores","Mika Domingo","Jasmine Ramos","Lara Mendoza"]},
 {id:"gifts",ico:"🎁",t:"7 Gifts",v:"presents a gift",
  p:"Seven wrapped surprises, each handed over with a big smile.",
  g:["Isabelle Tan","Nathalie Lim","Corinne Bautista","Patricia Gomez","Hannah Aquino","Kyla Navarro","Trisha Valdez"]},
 {id:"candles",ico:"🕯️",t:"7 Candles",v:"lights a candle",
  p:"Seven glowing candles, each lit with a wish for Yvanna.",
  g:["Marielle Castro","Erika Pascual","Dianne Torres","Janelle Rivera","Andrea Salazar","Chloe Villanueva","Francine Lopez"]},
 {id:"bags",ico:"🛍️",t:"7 Bags",v:"hands out a party bag",
  p:"Seven pretty bags packed with sweet treats and little surprises.",
  g:["Gabrielle Ortiz","Ria Fernandez","Selene Dizon","Monique Garcia","Bea Soriano","Paolo Dela Cruz","Elena Mercado"]},
 {id:"balloons",ico:"🎈",t:"7 Balloons",v:"releases a balloon",
  p:"Seven balloons floating up with wishes for Yvanna’s happiest year.",
  g:["Liam Alvarez","Noah Cabrera","Zoe Magsaysay","Ava Enriquez","Ethan Legaspi","Mia Padilla","Kian Robles"]},
 {id:"roses",ico:"🌹",t:"7 Roses",v:"presents a rose",
  p:"Seven roses for our little princess, each with a heartfelt message.",
  g:["Tita Joy","Tita Grace","Ate Bella","Ate Nina","Tita Lyn","Ate Clarisse","Tita Mae"]},
 {id:"cupcakes",ico:"🧁",t:"7 Cupcakes",v:"serves a cupcake",
  p:"Seven sweet cupcakes shared with everyone who loves Yvanna.",
  g:["Rina Abad","Kristine Uy","Joanna Chua","Pia Villareal","Denise Ong","Faith Guevarra","Aubrey Santiago"]}
];
var order=["home"].concat(T.map(function(x){return x.id}));
var $=function(i){return document.getElementById(i)};

// ---- build tiles, pages, pagers ----
$("tiles").innerHTML=T.map(function(x){return '<a href="#'+x.id+'"><i>'+x.ico+'</i>'+x.t+'</a>'}).join("")+
 '<a href="#contact"><i>💌</i>Contact</a>';
function pager(k){var i=order.indexOf(k),p=order[i-1],n=order[i+1];
 return (p?'<a class="btn" href="#'+p+'">← Back</a>':'<span></span>')+'<a class="btn" href="#home">🏠 Home</a>'+(n?'<a class="btn main" href="#'+n+'">Next →</a>':'<span></span>')}
$("themes").innerHTML=T.map(function(x){
 return '<section class="page" id="'+x.id+'"><div class="theme"><div class="badge"><span>'+x.ico+'</span></div><h1 class="script">'+x.t+'</h1><p class="in">'+x.p+'</p><div class="guests">'+
 x.g.map(function(n,i){return '<div class="g"><div class="n">'+(i+1)+'</div><div><b>'+n+'</b><small>'+x.v+'</small></div></div>'}).join("")+
 '</div><div class="pager">'+pager(x.id)+'</div></div></section>'}).join("");

// ---- router (first page is the envelope) ----
function route(){var k=(location.hash||"#envelope").slice(1);
 var contactRequested=k==="contact";
 if(contactRequested)k="home";
 if(k!=="envelope"&&order.indexOf(k)<0)k="envelope";
 document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("show",s.id===k)});
 document.querySelector("footer").style.display=k==="envelope"?"none":"block";
 if(contactRequested)window.scrollTo(0,$("contact").offsetTop);else window.scrollTo(0,0)}
window.addEventListener("hashchange",route);route();

// ---- music ----
var bgm=$("bgm"),mb=$("music");bgm.volume=.6;
function setMusic(on){mb.classList.toggle("playing",on);mb.classList.toggle("muted",!on);
 mb.setAttribute("aria-pressed",on);mb.setAttribute("aria-label",on?"Stop music":"Play music")}
function playMusic(){var p=bgm.play();if(p&&p.then)p.then(function(){setMusic(true)}).catch(function(){setMusic(false)});else setMusic(true)}
mb.addEventListener("click",function(){if(bgm.paused)playMusic();else{bgm.pause();setMusic(false)}});

// ---- envelope animation ----
var stage=$("stage"),openBtn=$("openBtn"),goBtn=$("goBtn");
function showGo(){openBtn.style.display="none";goBtn.style.display="inline-flex"}
openBtn.addEventListener("click",function(){
 openBtn.classList.add("hide");playMusic();
 stage.classList.add("open");
 setTimeout(showGo,1200)});
goBtn.addEventListener("click",function(){location.hash="#home"});

// ---- video autoplay safety ----
var v=$("bgv");v.muted=true;var vp=v.play();if(vp&&vp.catch)vp.catch(function(){});

// ---- details ----
$("time").textContent=CFG.time;
if(CFG.venue)$("venue").textContent=CFG.venue;
if(CFG.phone)$("phone").textContent=CFG.phone;
if(CFG.email)$("email").textContent=CFG.email;
$("mapBtn").href=CFG.mapUrl||"https://www.google.com/maps";

// ---- countdown ----
var target=new Date(CFG.date).getTime();
function tick(){var d=target-Date.now();
 if(d<=0){$("count").style.display="none";$("done").style.display="block";return}
 $("d").textContent=Math.floor(d/864e5);$("h").textContent=Math.floor(d%864e5/36e5);
 $("m").textContent=Math.floor(d%36e5/6e4);$("s").textContent=Math.floor(d%6e4/1e3)}
tick();setInterval(tick,1000);
