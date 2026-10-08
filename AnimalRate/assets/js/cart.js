(function() {
  var trigger = document.querySelector('.cart-trigger');

  if (!trigger) {
    return;
  }

  var layer = document.createElement('div');
  layer.id = 'shopping-cart-layer';
  layer.hidden = true;
  layer.innerHTML = [
    '<button class="cart-backdrop" type="button" data-cart-close aria-label="Cerrar carrito" tabindex="-1"></button>',
    '<aside class="cart-panel" id="shopping-cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-panel-title" tabindex="-1">',
    '  <header class="cart-panel-header">',
    '    <h2 id="cart-panel-title">Tu carrito</h2>',
    '    <button class="cart-close" type="button" data-cart-close aria-label="Cerrar carrito"><i class="ti-close" aria-hidden="true"></i></button>',
    '  </header>',
    '  <div class="cart-empty-state">',
    '    <i class="ti-shopping-cart" aria-hidden="true"></i>',
    '    <h3>Tu carrito está vacío</h3>',
    '    <p>Cuando publiquemos el catálogo, aquí podrás consultar los productos disponibles.</p>',
    '  </div>',
    '</aside>'
  ].join('');

  document.body.appendChild(layer);

  var closeButton = layer.querySelector('.cart-close');
  var isOpen = false;

  function closeCart() {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    layer.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cart-open');
    window.setTimeout(function() {
      if (!isOpen) {
        layer.hidden = true;
      }
    }, 250);
    trigger.focus();
  }

  function openCart() {
    if (isOpen) {
      return;
    }

    isOpen = true;
    layer.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cart-open');
    window.requestAnimationFrame(function() {
      layer.classList.add('is-open');
      closeButton.focus();
    });
  }

  trigger.addEventListener('click', openCart);

  layer.addEventListener('click', function(event) {
    if (event.target.closest('[data-cart-close]')) {
      closeCart();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isOpen) {
      closeCart();
      return;
    }

    if (event.key === 'Tab' && isOpen) {
      var focusable = layer.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
