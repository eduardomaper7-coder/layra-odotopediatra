document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav-close');
  var overlayLinks = document.querySelectorAll('.mobile-nav a');

  function openNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (toggle) toggle.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  overlayLinks.forEach(function (a) { a.addEventListener('click', closeNav); });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 8) header.style.boxShadow = '0 6px 20px -12px rgba(0,50,60,.25)';
      else header.style.boxShadow = 'none';
    });
  }
});

// Lightbox para galerías (a[data-lightbox])
document.addEventListener('DOMContentLoaded', function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length) return;
  var ico = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Imagen ampliada');
  box.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">' + ico('M5 5l14 14M19 5 5 19') + '</button>' +
    '<button class="lightbox-prev" aria-label="Imagen anterior">' + ico('M14.5 5.5 8 12l6.5 6.5') + '</button>' +
    '<button class="lightbox-next" aria-label="Imagen siguiente">' + ico('M9.5 5.5 16 12l-6.5 6.5') + '</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('figcaption');
  var current = 0, lastFocus = null;
  function show(i) {
    current = (i + links.length) % links.length;
    var a = links[current], thumb = a.querySelector('img');
    img.src = a.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = a.getAttribute('data-caption') || '';
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    box.querySelector('.lightbox-close').focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});

/* Carrusel de fotos del hero (solo se activa en móvil/tablet) */
document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.hero-slider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.hero-slide');
  var dots = slider.querySelectorAll('.hero-dots span');
  var mq = window.matchMedia('(max-width: 980px)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var i = 0, timer = null;
  function go(n) {
    slides[i].classList.remove('is-active'); if (dots[i]) dots[i].classList.remove('is-active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active'); if (dots[i]) dots[i].classList.add('is-active');
  }
  function start() {
    if (timer || !mq.matches || reduce.matches) return;
    slides.forEach(function (s) { var im = s.querySelector('img'); if (im) im.loading = 'eager'; });
    timer = setInterval(function () { go(i + 1); }, 3500);
  }
  function stop() { clearInterval(timer); timer = null; }
  start();
  (mq.addEventListener ? mq.addEventListener('change', function () { mq.matches ? start() : stop(); }) : mq.addListener(function () { mq.matches ? start() : stop(); }));
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
});
