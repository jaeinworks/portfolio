(function () {
  function loadThumbs() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      var url = card.getAttribute('href');
      if (!url || url === '#') return;

      fetch(url)
        .then(function (res) { return res.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');

          var firstImg = doc.querySelector('.img-frame img');
          if (firstImg) {
            var imgSrc = firstImg.getAttribute('src');
            var imgAbsUrl = new URL(imgSrc, new URL(url, window.location.href)).href;
            var frame = card.querySelector('.img-frame');
            if (frame) {
              var img = document.createElement('img');
              img.src = imgAbsUrl;
              img.alt = '';
              frame.innerHTML = '';
              frame.appendChild(img);
            }
          }

          var field = '', period = '';
          doc.querySelectorAll('.proj-meta > div').forEach(function (item) {
            var key = item.querySelector('.meta-key');
            var val = item.querySelector('.meta-val');
            if (!key || !val) return;
            if (key.textContent.trim() === '분야') field = val.textContent.trim();
            if (key.textContent.trim() === '기간') period = val.textContent.trim();
          });

          var meta = card.querySelector('.card-meta');
          if (meta && (field || period)) {
            meta.textContent = [field, period].filter(Boolean).join(' · ');
          }
        })
        .catch(function () {});
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadThumbs);
  } else {
    loadThumbs();
  }
})();
