// Dark / light mode (remembers choice)
const root = document.documentElement, themeBtn = document.getElementById('theme');
function setTheme(t){ root.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '🌙' : '☀️'; localStorage.setItem('theme', t); }
setTheme(localStorage.getItem('theme') || 'dark');
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

// Mobile menu
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.onclick = () => menu.classList.remove('open');

// Typing effect in hero
const words = ['Computer Engineering Student', 'Web Developer Intern', 'UI / Graphic Designer'];
let w = 0, c = 0, del = false;
function type(){
  const word = words[w];
  document.getElementById('typed').textContent = word.slice(0, c);
  if(!del && c === word.length){ del = true; return setTimeout(type, 1400); }
  if(del && c === 0){ del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
}
type();

// Reveal sections + fill skill bars on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting){
    e.target.classList.add('show');
    e.target.querySelectorAll('[data-level]').forEach(b => b.style.width = b.dataset.level + '%');
  }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(s => io.observe(s));

// Contact form opens the visitor's email app (no backend needed)
document.getElementById('form').onsubmit = e => {
  e.preventDefault();
  const n = fname.value, m = fmsg.value + '\n\nFrom: ' + n + ' (' + femail.value + ')';
  location.href = 'mailto:dalalsiya1305@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + n) + '&body=' + encodeURIComponent(m);
};
document.getElementById('year').textContent = new Date().getFullYear();
// Live background animation (particle network)
const cv = document.getElementById('bg'), ctx = cv.getContext('2d');
let W, H, dots = [], mouse = { x: -999, y: -999 };

function resize(){
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const n = Math.min(90, Math.floor(W * H / 15000));   // fewer dots on small screens
  dots = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6
  }));
}
addEventListener('resize', resize);
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function line(x1, y1, x2, y2, alpha){
  ctx.globalAlpha = alpha;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

function animate(){
  ctx.clearRect(0, 0, W, H);
  const color = getComputedStyle(root).getPropertyValue('--accent').trim();
  ctx.fillStyle = color; ctx.strokeStyle = color;
  dots.forEach((d, i) => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;
    ctx.globalAlpha = .6;
    ctx.beginPath(); ctx.arc(d.x, d.y, 2, 0, 6.28); ctx.fill();
    for (let j = i + 1; j < dots.length; j++){
      const o = dots[j], dist = Math.hypot(d.x - o.x, d.y - o.y);
      if (dist < 120) line(d.x, d.y, o.x, o.y, (1 - dist / 120) * .35);
    }
    const m = Math.hypot(d.x - mouse.x, d.y - mouse.y);
    if (m < 160) line(d.x, d.y, mouse.x, mouse.y, (1 - m / 160) * .6);
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(animate);
}
resize(); animate();
