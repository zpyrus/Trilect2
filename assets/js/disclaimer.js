/* Bar Council of India disclaimer: shown once per visitor (remembered for 30 days on this device). */
(function () {
  var root = document.documentElement;
  if (root.hasAttribute('data-no-gate')) return;
  var KEY = 'trilect_disclaimer_accepted';
  /* Shown at the start of every visit; remembered only while this tab/window stays open. */
  function accepted() {
    try { if (sessionStorage.getItem(KEY) === '1') return true; } catch (e) {}
    return false;
  }
  function remember() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    try { localStorage.removeItem(KEY); } catch (e) {}
  }
  if (accepted()) return;

  root.classList.add('disc-pending');
  var _me=document.currentScript, CREST='../assets/images/crest.webp';
  if(_me&&_me.src) CREST=_me.src.replace(/js\/disclaimer\.js.*$/,'')+'images/crest.webp';

  var TEXT = [
    'The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, www.trilectassociates.com, you acknowledge and confirm that you are seeking information relating to Trilect Associates of your own accord and that there has been no form of solicitation, advertisement or inducement by Trilect Associates or its members.',
    'The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material or information provided on this website should be construed as legal advice. Trilect Associates shall not be liable for consequences of any action taken by relying on the material or information provided on this website. The contents of this website are the intellectual property of Trilect Associates.'
  ];

  function build() {
    var g = document.createElement('div');
    g.id = 'discGate'; g.setAttribute('role', 'dialog'); g.setAttribute('aria-modal', 'true');
    g.setAttribute('aria-labelledby', 'discTitle'); g.setAttribute('aria-describedby', 'discText');
    g.innerHTML =
      '<div class="disc-card">' +
        '<div class="disc-brand"><img src="' + CREST + '" alt="" width="44" height="46"><div>TRILECT <span>ASSOCIATES</span></div></div>' +
        '<h2 id="discTitle">Disclaimer</h2>' +
        '<div class="disc-text" id="discText"><p>' + TEXT[0] + '</p><p>' + TEXT[1] + '</p></div>' +
        '<label class="disc-check"><input type="checkbox" id="discAgree"> <span>I accept the above.</span></label>' +
        '<button type="button" class="disc-go" id="discGo" disabled>Proceed to website</button>' +
      '</div>';
    document.body.appendChild(g);

    var others = [].filter.call(document.body.children, function (el) { return el !== g && el.tagName !== 'SCRIPT'; });
    others.forEach(function (el) { el.setAttribute('inert', ''); });
    var agree = g.querySelector('#discAgree'), go = g.querySelector('#discGo');
    agree.addEventListener('change', function () { go.disabled = !agree.checked; });
    go.addEventListener('click', function () {
      if (!agree.checked) return;
      remember();
      g.classList.add('closing');
      others.forEach(function (el) { el.removeAttribute('inert'); });
      root.classList.remove('disc-pending');
      setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, 600);
    });
    g.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = [agree, go].filter(function (x) { return !x.disabled; });
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    });
    agree.focus();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
