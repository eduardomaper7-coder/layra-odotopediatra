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
