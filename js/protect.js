(function () {
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  }, false);
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  }, false);
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  }, false);

  var _warn = console.warn;
  setTimeout(function () {
    console.warn('%c⚠ 저작권 안내', 'color:#e53e3e; font-size:14px; font-weight:bold;');
    console.warn('%c이 사이트의 코드 및 이미지는 저작권법에 의해 보호됩니다. 무단 사용을 금지합니다.', 'color:#555; font-size:12px;');
  }, 0);
})();
