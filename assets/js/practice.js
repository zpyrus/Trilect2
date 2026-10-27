(function () {
  document.documentElement.classList.add('js');
  var nav = document.getElementById('navbar');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 50); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  window.toggleMenu = function () { document.getElementById('mobileMenu').classList.toggle('open'); };

  /* cursor ring (same as the home page) */
  var ring = document.getElementById('cursorRing');
  if (ring && window.matchMedia('(pointer:fine)').matches) {
    var cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
    addEventListener('mousemove', function (e) { cx = e.clientX; cy = e.clientY; document.body.classList.add('cursor-active'); });
    (function loop() { rx += (cx - rx) * .16; ry += (cy - ry) * .16; ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
  }

  /* scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('visible'); }); }

  /* core services: left list switches the detail shown on the right */
  var tabs = [].slice.call(document.querySelectorAll('.pp-svc-list [role=tab]'));
  var panels = [].slice.call(document.querySelectorAll('.pp-panel'));
  function show(i, focus) {
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
    panels.forEach(function (p, k) { p.classList.toggle('active', k === i); p.hidden = k !== i; });
    if (focus) tabs[i].focus();
    if (history.replaceState) history.replaceState(null, '', '#service-' + (i + 1));
  }
  if (tabs.length) {
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (n !== null) { e.preventDefault(); show(n, true); }
      });
    });
    var m = /^#service-(\d+)$/.exec(location.hash), start = m ? Math.min(+m[1], tabs.length) - 1 : 0;
    show(Math.max(start, 0));
    if (m) setTimeout(function () { var s = document.getElementById('core-services'); if (s) s.scrollIntoView(); }, 60);
  }
})();
