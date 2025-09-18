// Lightweight navigation loader and scroll effect
(function() {
  var BREADCRUMB_SEPARATOR = '›';
  function loadNav() {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    // If jQuery is available and page expects it, prefer its .load for compatibility
    if (window.jQuery && typeof window.jQuery.fn.load === 'function') {
      try {
        window.jQuery('#nav-placeholder').load('nav.html', function() {
          attachScrollEffect();
          updateNavHeightVar();
          normalizeBreadcrumbSeparators();
        });
        return;
      } catch (e) {
        // fall through to fetch-based loader
      }
    }

    // Fetch-based loader (no jQuery dependency)
    fetch('nav.html')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        // Only inject if still empty (avoid double-insert)
        if (!placeholder.innerHTML.trim()) {
          placeholder.innerHTML = html;
        }
        attachScrollEffect();
        updateNavHeightVar();
        normalizeBreadcrumbSeparators();
      })
      .catch(function(err) {
        console.warn('Failed to load nav.html:', err);
      });
  }

  function attachScrollEffect() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function normalizeBreadcrumbSeparators() {
    try {
      var seps = document.querySelectorAll('.breadcrumb-separator');
      seps.forEach(function(sep){ sep.textContent = BREADCRUMB_SEPARATOR; sep.setAttribute('aria-hidden', 'true'); });
    } catch (e) {
      // no-op
    }
  }

  function updateNavHeightVar() {
    try {
      var nav = document.querySelector('nav');
      if (!nav) return;
      var h = nav.offsetHeight || 80;
      document.documentElement.style.setProperty('--nav-height', h + 'px');
    } catch (e) {
      // no-op
    }
  }

  function ensureGlobalStyles() {
    try {
      var head = document.head || document.getElementsByTagName('head')[0];
      if (!head) return;
      var hasStyle = !!document.querySelector('link[rel="stylesheet"][href$="css/style.css"], link[rel="stylesheet"][href="css/style.css"]');
      if (!hasStyle) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/style.css';
        head.appendChild(link);
      }
    } catch (e) {
      // no-op
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      ensureGlobalStyles();
      loadNav();
      updateNavHeightVar();
      normalizeBreadcrumbSeparators();
    });
    window.addEventListener('resize', updateNavHeightVar);
  } else {
    ensureGlobalStyles();
    loadNav();
    updateNavHeightVar();
    normalizeBreadcrumbSeparators();
    window.addEventListener('resize', updateNavHeightVar);
  }
  // Force proper breadcrumb separator regardless of prior encoding
  try {
    document.querySelectorAll('.breadcrumb-separator').forEach(function(sep){ sep.textContent = BREADCRUMB_SEPARATOR; sep.setAttribute('aria-hidden', 'true'); });
  } catch (e) { /* no-op */ }
})();

