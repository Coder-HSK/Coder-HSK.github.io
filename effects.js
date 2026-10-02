// Shared site effects: scroll-reveal animation + a light cursor particle trail.
// Both respect prefers-reduced-motion and fail silently if anything's missing.

document.addEventListener('DOMContentLoaded', () => {
  // ── Scroll reveal: items translate up + fade in as they enter the viewport ──
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }
});

// ── Cursor particle trail: a handful of tiny fading dots that follow the mouse ──
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (prefersReducedMotion || isCoarsePointer) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  let particles = [];
  let lastX = null;
  let lastY = null;

  window.addEventListener('mousemove', (e) => {
    const dx = lastX !== null ? e.clientX - lastX : 0;
    const dy = lastY !== null ? e.clientY - lastY : 0;
    const moved = Math.hypot(dx, dy);
    if (moved > 5) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        r: Math.random() * 1.3 + 0.6,
        life: 1,
      });
      if (particles.length > 60) particles.shift();
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.life -= 0.035;
      p.y -= 0.25;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(47,111,78,${Math.max(p.life, 0) * 0.45})`;
      ctx.fill();
    });
    particles = particles.filter((p) => p.life > 0);
    requestAnimationFrame(tick);
  }
  tick();
})();
