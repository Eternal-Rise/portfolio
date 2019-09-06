
window.addEventListener('load', () => {
  const slidesPic = [...document.querySelectorAll('.slider__pic')];

  // first picture loading with page
  slidesPic.shift();

  const loader = i => {
    if (i === slidesPic.length) return;
    const sources = slidesPic[i].querySelectorAll('source');
    for (const source of sources) {
      source.srcset = source.dataset.srcset;
    }
    const img = slidesPic[i].querySelector('img');
    img.src = img.dataset.src;

    img.addEventListener('load', () => {
      img.classList.remove('_loading');
      loader(i + 1);
    });
  };

  const i = 0;
  loader(i);
});
