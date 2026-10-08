(function() {
  var filter = document.querySelector('.category-filter');

  if (!filter) {
    return;
  }

  var buttons = filter.querySelectorAll('.category-filter-button');
  var emptyTitle = document.querySelector('.products_empty-title');
  var emptyMessage = document.querySelector('.products_empty-message');
  var imageButtons = Array.prototype.filter.call(buttons, function(button) {
    return button.querySelector('.category-filter-image');
  });
  var categoryNames = {
    camaleones: 'Camaleones',
    terrarios: 'Terrarios',
    serpientes: 'Serpientes',
    geckos: 'Geckos',
    ranas: 'Ranas'
  };

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-scroll-reveal-pending');
          entry.target.classList.add('is-scroll-revealed');
          imageObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    imageButtons.forEach(function(button, index) {
      button.classList.add('is-scroll-reveal-pending');
      button.style.setProperty('--reveal-delay', (index * 80) + 'ms');
      imageObserver.observe(button);
    });
  }

  filter.addEventListener('click', function(event) {
    var button = event.target.closest('.category-filter-button');

    if (!button) {
      return;
    }

    var category = button.getAttribute('data-category');

    buttons.forEach(function(filterButton) {
      var isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (category === 'todo') {
      emptyTitle.textContent = 'Próximamente';
      emptyMessage.textContent = 'Estamos preparando nuestro Catálogo. Pronto encontrarás aquí todo nuestro Catálogo.';
      return;
    }

    emptyTitle.textContent = categoryNames[category];
    emptyMessage.textContent = 'El catálogo de ' + categoryNames[category].toLowerCase() + ' estará disponible pronto. Estamos preparando esta sección para ti.';
  });
})();
