(function () {
  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'display:none',
    'position:fixed',
    'inset:0',
    'background:rgba(0,0,0,0.88)',
    'z-index:9999',
    'cursor:zoom-out',
    'align-items:center',
    'justify-content:center',
    'padding:40px 24px'
  ].join(';');

  var lbImg = document.createElement('img');
  lbImg.style.cssText = [
    'max-width:100%',
    'max-height:100%',
    'border-radius:4px',
    'object-fit:contain',
    'transform:scale(0.96)',
    'opacity:0',
    'transition:transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.25s ease'
  ].join(';');

  overlay.appendChild(lbImg);
  document.body.appendChild(overlay);

  function open(src) {
    lbImg.src = src;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lbImg.style.transform = 'scale(1)';
        lbImg.style.opacity = '1';
      });
    });
  }

  function close() {
    lbImg.style.transform = 'scale(0.96)';
    lbImg.style.opacity = '0';
    setTimeout(function () {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      lbImg.src = '';
    }, 250);
  }

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('.img-frame').forEach(function (frame) {
    var img = frame.querySelector('img');
    if (!img) return;
    frame.style.cursor = 'zoom-in';
    frame.addEventListener('click', function () { open(img.src); });
  });
})();
