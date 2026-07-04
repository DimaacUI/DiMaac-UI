(() => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveals */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* scroll progress */
  const prog = document.getElementById('prog');
  addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max ? scrollY / max : 0})`;
  }, { passive: true });

  /* marquee duplicate for seamless loop */
  const marq = document.getElementById('marq');
  marq.innerHTML += marq.innerHTML;

  if (rm) return;

  /* cursor dot */
  const cur = document.getElementById('cur');
  let cx = -100, cy = -100, tx = cx, ty = cy;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop(){
    cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
    cur.style.left = cx + 'px'; cur.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cur.classList.remove('is-link'));
  });

  /* floating project preview */
  const peek = document.getElementById('peek');
  const peekL = document.getElementById('peekL');
  let px = 0, py = 0, pxT = 0, pyT = 0;
  addEventListener('mousemove', e => { pxT = e.clientX + 28; pyT = e.clientY - 90; });
  (function ploop(){
    px += (pxT - px) * 0.12; py += (pyT - py) * 0.12;
    peek.style.transform = '';
    peek.style.left = px + 'px'; peek.style.top = py + 'px';
    requestAnimationFrame(ploop);
  })();
  document.querySelectorAll('[data-peek]').forEach(row => {
    row.addEventListener('mouseenter', () => {
      peek.className = 'peek show ' + row.dataset.peek;
      peekL.textContent = row.dataset.letter;
    });
    row.addEventListener('mouseleave', () => peek.classList.remove('show'));
  });
})();
