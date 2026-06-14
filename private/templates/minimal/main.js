(() => {
  const el = document.getElementById('clock');
  function tick() {
    el.textContent = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
    }).replace(',', '');
  }
  tick();
  setInterval(tick, 30000);
})();
