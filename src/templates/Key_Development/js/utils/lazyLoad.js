
window.addEventListener('load', () => {
  const slidesPic = [...document.querySelectorAll('.slider__pic')];

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

  // first picture will loading with page
  const i = 1;
  loader(i);
});
