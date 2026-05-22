(function () {
  var currentFile = window.location.pathname.split('/').pop();
  var total = PROJECTS.length;

  var idx = -1;
  for (var i = 0; i < total; i++) {
    if (PROJECTS[i].url.split('/').pop() === currentFile) {
      idx = i;
      break;
    }
  }
  if (idx === -1) return;

  document.title = PROJECTS[idx].title;

  function findNeighbor(start, step) {
    for (var i = 1; i < total; i++) {
      var candidate = PROJECTS[(start + step * i + total) % total];
      if (candidate.url !== '#') return candidate;
    }
    return null;
  }

  function toRelUrl(url) {
    return url.replace('project/', '');
  }

  var prev = findNeighbor(idx, -1);
  var next = findNeighbor(idx, 1);

  var prevLink = document.querySelector('.pn-item.prev a');
  var nextLink = document.querySelector('.pn-item.next a');

  if (prevLink && prev) {
    prevLink.href = toRelUrl(prev.url);
    prevLink.querySelector('.pn-name').textContent = prev.title;
  }
  if (nextLink && next) {
    nextLink.href = toRelUrl(next.url);
    nextLink.querySelector('.pn-name').textContent = next.title;
  }
})();
