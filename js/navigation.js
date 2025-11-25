// Lightweight navigation loader and scroll effect
(function () {
  var BREADCRUMB_SEPARATOR = '›';
  function loadNav() {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    // If jQuery is available and page expects it, prefer its .load for compatibility
    if (window.jQuery && typeof window.jQuery.fn.load === 'function') {
      try {
        window.jQuery('#nav-placeholder').load('nav.html', function () {
          attachScrollEffect();
          updateNavHeightVar();
          normalizeBreadcrumbSeparators();
          setActiveNavLink();
          injectLessonIndicator();
        });
        return;
      } catch (e) {
        // fall through to fetch-based loader
      }
    }

    // Fetch-based loader (no jQuery dependency)
    fetch('nav.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        // Only inject if still empty (avoid double-insert)
        if (!placeholder.innerHTML.trim()) {
          placeholder.innerHTML = html;
        }
        attachScrollEffect();
        updateNavHeightVar();
        normalizeBreadcrumbSeparators();
        setActiveNavLink();
        injectLessonIndicator();
      })
      .catch(function (err) {
        console.warn('Failed to load nav.html:', err);
      });
  }

  function setActiveNavLink() {
    try {
      var currentPath = window.location.pathname;
      var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

      // Remove any existing active classes
      var navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });

      // Determine which link should be active
      var activeLink = null;

      // Check for courses pages (courses.html, courses-a1.html, courses-a2.html, courses-b1.html, lesson*.html)
      if (currentPage === 'courses.html' ||
        currentPage.startsWith('courses-') ||
        currentPage.startsWith('lesson')) {
        activeLink = document.querySelector('.nav-links a[href="courses.html"]');
      }
      // Check for vocabulary game
      else if (currentPage === 'vocabulary-game.html') {
        activeLink = document.querySelector('.nav-links a[href="vocabulary-game.html"]');
      }
      // Check for dictionary
      else if (currentPage === 'dictionary.html') {
        activeLink = document.querySelector('.nav-links a[href="dictionary.html"]');
      }

      if (activeLink) {
        activeLink.classList.add('active');
      }
    } catch (e) {
      console.warn('Failed to set active nav link:', e);
    }
  }

  function injectLessonIndicator() {
    try {
      var currentPath = window.location.pathname;
      var filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

      // Only proceed if we are on a lesson page
      if (!filename.startsWith('lesson')) return;

      // Extract lesson number
      var lessonMatch = filename.match(/lesson(\d+)\.html/);
      if (!lessonMatch) return;
      var lessonNum = lessonMatch[1];

      // Extract course level from breadcrumbs
      // Look for link to courses-*.html
      var courseLevel = 'A1'; // Default fallback
      var breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
      breadcrumbLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('courses-')) {
          var match = href.match(/courses-([a-z0-9]+)\.html/i);
          if (match) {
            courseLevel = match[1].toUpperCase();
          }
        }
      });

      // Construct indicator text
      var indicatorText = courseLevel + '.' + lessonNum;

      // Create indicator element
      var indicator = document.createElement('span');
      indicator.className = 'lesson-indicator';
      indicator.textContent = indicatorText;

      // Inject after logo
      var logo = document.querySelector('.logo');
      if (logo && logo.parentNode) {
        logo.parentNode.insertBefore(indicator, logo.nextSibling);
      }

    } catch (e) {
      console.warn('Failed to inject lesson indicator:', e);
    }
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
      seps.forEach(function (sep) { sep.textContent = BREADCRUMB_SEPARATOR; sep.setAttribute('aria-hidden', 'true'); });
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
    document.addEventListener('DOMContentLoaded', function () {
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
    document.querySelectorAll('.breadcrumb-separator').forEach(function (sep) { sep.textContent = BREADCRUMB_SEPARATOR; sep.setAttribute('aria-hidden', 'true'); });
  } catch (e) { /* no-op */ }
})();

