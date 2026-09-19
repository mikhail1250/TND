(() => {
  const counterId = 112816579;

  window.ym = window.ym || function ym() {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = Date.now();

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
  document.head.appendChild(tag);

  window.ym(counterId, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });
})();
