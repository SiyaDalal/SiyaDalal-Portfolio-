(function () {
  const cv = document.getElementById('bg');
  if (!cv) return;
  const ctx = cv.getContext('2d'), html = document.documentElement;
  let W, H, dots = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    const n = Math.min(90, Math.floor(W * H / 15000));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6
    }));
  }
  addEventListener('resize', resize);
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function line(x1, y1, x2, y2, a) {
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    const color = getComputedStyle(html).getPropertyValue('--accent').trim();
    ctx.fillStyle = color; ctx.strokeStyle = color;
    dots.forEach((d, i) => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.globalAlpha = .6;
      ctx.beginPath(); ctx.arc(d.x, d.y, 2, 0, 6.28); ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const o = dots[j], dist = Math.hypot(d.x - o.x, d.y - o.y);
        if (dist < 120) line(d.x, d.y, o.x, o.y, (1 - dist / 120) * .35);
      }
      const m = Math.hypot(d.x - mouse.x, d.y - mouse.y);
      if (m < 160) line(d.x, d.y, mouse.x, mouse.y, (1 - m / 160) * .6);
    });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(animate);
  }
  resize(); animate();
})();