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
