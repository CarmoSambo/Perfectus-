
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });
// Troca automática da imagem do header a cada 10 segundos
document.addEventListener('DOMContentLoaded', function () {
  const headerLogo = document.querySelector('.hero.section img');
  const hero = document.getElementById('hero');
  if (!headerLogo || !hero) return;
  // Slides com opções de cor e padrão de fonte/tamanho
  const slides = [
    {
      img: 'assets/img/nothing-like-positivity-boost-productivity-portrait-young-businessman-working-his-desk-modern-office.jpg',
      h1: 'Perfectus',
      h2: 'Impulsionando negócio',
      p: 'Impulsionando o seu crescimento focados em excelência',
      color: '#1a2a4e',
      bg: '#fff'
    },
    {
      img: 'assets/img/PORTRA~1.jpg',
      h1: 'Transformação Digital',
      h2: 'Tecnologia para PMEs',
      p: 'Soluções sob medida para o seu negócio crescer.',
      color: '#1a2a4e',
      bg: '#1a2a4e'
    },
    {
      img: 'assets/img/two.jpg',
      h1: 'Consultoria Especializada',
      h2: 'Resultados Concretos',
      p: 'Apoiando empresas a inovar e prosperar.',
      color: '#1a2a4e',
      bg: '#eaf3fa'
    },
    {
      img: 'assets/img/BLACK-~1.jpg',
      h1: 'Equipe Humana',
      h2: 'Suporte próximo e eficiente',
      p: 'Conte com a Perfectus para cada etapa da sua jornada.',
      color: '#1a2a4e',
      bg: '#469fdf'
    }
  ];
  let idx = 0;

  // Adiciona classes de transição se não existirem
  headerLogo.style.transition = 'opacity 0.7s';
  hero.style.transition = 'background 0.7s';
  const h1 = hero.querySelector('h1');
  const h2 = hero.querySelector('h2');
  const p = hero.querySelector('p');
  if (h1) h1.style.transition = 'color 0.7s';
  if (h2) h2.style.transition = 'color 0.7s';
  if (p) p.style.transition = 'color 0.7s';

  // Função para atualizar imagem, textos, cor e fonte com fade
  function updateHero(idx) {
    // Fade out
    headerLogo.style.opacity = 0;
    if (h1) h1.style.opacity = 0;
    if (h2) h2.style.opacity = 0;
    if (p) p.style.opacity = 0;

    setTimeout(() => {
      headerLogo.src = slides[idx].img;
      // Padrão de fonte e tamanho
      const fontFamily = 'Inter, Poppins, Arial, sans-serif';
      const h1Size = '2.8rem';
      const h2Size = '2rem';
      const pSize = '1.25rem';
      if (h1 && h2 && p) {
        h1.textContent = slides[idx].h1;
        h2.textContent = slides[idx].h2;
        p.textContent = slides[idx].p;
        h1.style.fontFamily = fontFamily;
        h2.style.fontFamily = fontFamily;
        p.style.fontFamily = fontFamily;
        h1.style.fontSize = h1Size;
        h2.style.fontSize = h2Size;
        p.style.fontSize = pSize;
        h1.style.fontWeight = '700';
        h2.style.fontWeight = '600';
        p.style.fontWeight = '500';
        h1.style.letterSpacing = '1px';
        h2.style.letterSpacing = '0.5px';
        h1.style.color = slides[idx].color;
        h2.style.color = slides[idx].color;
        p.style.color = slides[idx].color;
        hero.style.background = slides[idx].bg;
      }
      // Fade in
      headerLogo.style.opacity = 1;
      if (h1) h1.style.opacity = 1;
      if (h2) h2.style.opacity = 1;
      if (p) p.style.opacity = 1;
    }, 700);
  }

  // Inicializa o primeiro slide
  updateHero(idx);
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    updateHero(idx);
  }, 10000);
});



  /*
  Efeito da escrita tipo máquina de escrever no #hero
  `*/

   // Typewriter effect for #hero section
    document.addEventListener('DOMContentLoaded', function () {
      function typeEffect(element, speed, callback) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        function type() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          } else if (callback) {
            callback();
          }
        }
        type();
      }
      const hero = document.getElementById('hero');
      if (hero) {
        const h1 = hero.querySelector('h1');
        const h2 = hero.querySelector('h2');
        const p = hero.querySelector('p');
        if (h1 && h2 && p) {
          typeEffect(h1, 70, function () {
            typeEffect(h2, 50, function () {
              typeEffect(p, 25);
            });
          });
        }
      }
    });
  /**
   * Navmenu Scrollspy
   */
 let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})

();