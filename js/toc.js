(function () {
  var headings = document.querySelectorAll('.prose h2[id]');
  var list = document.querySelector('.toc-list');
  if (!list || !headings.length) return;

  headings.forEach(function (h) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'toc-link';
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });

  var wrap = document.createElement('div');
  wrap.className = 'toc-scroll-wrap';
  list.parentNode.insertBefore(wrap, list);
  wrap.appendChild(list);

  var links = document.querySelectorAll('.toc-link');
  var scrollingFromClick = false;

  function activate(id) {
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + id);
    });
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      activate(id);
      scrollingFromClick = true;
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { scrollingFromClick = false; }, 1000);
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    if (scrollingFromClick) return;
    entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.id); });
  }, { rootMargin: '-10% 0px -80% 0px' });

  headings.forEach(function (h) { observer.observe(h); });
  if (headings.length) activate(headings[0].id);

  window.addEventListener('scroll', function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
      links.forEach(function (l) { l.classList.remove('active'); });
      links[links.length - 1].classList.add('active');
    }
  }, { passive: true });
})();
