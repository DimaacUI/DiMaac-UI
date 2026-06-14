(() => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveals */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.rv,.proc').forEach(el => io.observe(el));

  /* terminal typing */
  const lines = [...document.querySelectorAll('#term .ln[data-t]')];
  if (rm) {
    lines.forEach(ln => ln.innerHTML = (ln.hasAttribute('data-ps') ? '<span class="ps">$ </span>' : '') + ln.dataset.t.replace(/^\$ /, ''));
  } else {
    let li = 0;
    function typeLine() {
      if (li >= lines.length) return;
      const ln = lines[li], raw = ln.dataset.t, isPs = ln.hasAttribute('data-ps');
      const text = isPs ? raw.replace(/^\$ /, '') : raw;
      let ci = 0;
      if (isPs) ln.innerHTML = '<span class="ps">$ </span>';
      const speed = isPs ? 55 : 8;
      (function tick() {
        ci++;
        /* type by characters but keep entity/markup integrity by slicing rendered text */
        const tmp = document.createElement('span');
        tmp.innerHTML = text;
        const full = tmp.textContent;
        const part = full.slice(0, ci);
        if (isPs) ln.innerHTML = '<span class="ps">$ </span>' + part;
        else ln.innerHTML = ci >= full.length ? text : part;
        if (ci < full.length) setTimeout(tick, speed + Math.random() * speed);
        else { li++; setTimeout(typeLine, isPs ? 120 : 260); }
      })();
    }
    setTimeout(typeLine, 400);
  }

  /* metric counters */
  function count(id, target, dec, dur) {
    const el = document.getElementById(id);
    if (rm) { el.textContent = target.toFixed(dec); return; }
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = (target * (1 - Math.pow(1 - k, 3))).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const mio = new IntersectionObserver(es => {
    if (!es.some(e => e.isIntersecting)) return;
    count('m-req', 1.2, 1, 1400);
    count('m-p99', 12, 0, 1400);
    count('m-up', 99.99, 2, 1600);
    count('m-tb', 3, 0, 1200);
    mio.disconnect();
  }, { threshold: 0.4 });
  mio.observe(document.querySelector('.metrics'));

  /* endpoint accordion */
  document.querySelectorAll('[data-ep]').forEach(head => {
    head.addEventListener('click', () => {
      const row = head.closest('.ep__row');
      document.querySelectorAll('.ep__row.open').forEach(o => o !== row && o.classList.remove('open'));
      row.classList.toggle('open');
    });
  });
})();
