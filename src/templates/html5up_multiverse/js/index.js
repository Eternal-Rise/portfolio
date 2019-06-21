window.addEventListener('load', () => {

  let item = document.querySelectorAll('.item');
  let item__img = document.querySelectorAll('.item__img');

  let src = [
    {
      caption: 'Adrian',
      img: 'img/adrian-359799-unsplash.jpg',
    },
    {
      caption: 'Adrian Pelletier',
      img: 'img/adrian-pelletier-652033-unsplash.jpg',
    },
    {
      caption: 'Asoggetti',
      img: 'img/asoggetti-442227-unsplash.jpg',
    },
    {
      caption: 'Boris Baldinger',
      img: 'img/boris-baldinger-1127268-unsplash.jpg',
    },
    {
      caption: 'Duane Swaby',
      img: 'img/duane-swaby-1214129-unsplash.jpg',
    },
    {
      caption: 'Emilce Giardino',
      img: 'img/emilce-giardino-252359-unsplash.jpg',
    },
    {
      caption: 'Jordan Steranka',
      img: 'img/jordan-steranka-616004-unsplash.jpg',
    },
    {
      caption: 'Kenrick Mills',
      img: 'img/kenrick-mills-709743-unsplash.jpg',
    },
    {
      caption: 'Leonardo Yip',
      img: 'img/leonardo-yip-1202036-unsplash.jpg',
    },
    {
      caption: 'Nadiya Ploschenko',
      img: 'img/nadiya-ploschenko-1117552-unsplash.jpg',
    },
    {
      caption: 'Paolo Nicolello',
      img: 'img/paolo-nicolello-1125285-unsplash.jpg',
    },
    {
      caption: 'Paul Gilmore',
      img: 'img/paul-gilmore-1146238-unsplash.jpg',
    },
    {
      caption: 'Philippe D.',
      img: 'img/philippe-d-1180008-unsplash.jpg',
    },
    {
      caption: 'Stanislav Kondratiev',
      img: 'img/stanislav-kondratiev-722853-unsplash.jpg',
    },
    {
      caption: 'Szabo Viktor',
      img: 'img/szabo-viktor-1200378-unsplash.jpg',
    },
  ]

  for (let i = 0; i < item.length; i++) {
    item__img[i].src = src[i].img;
    
    item__img[i].addEventListener('load', () => {

      let way = item__img[i].src.split('/img/')[1];
      item[i].style.backgroundImage = `url(img/${way})`;

      // Write caption
      item[i].lastElementChild.innerHTML = src[i].caption;
      

      item[i].classList.remove('hidden');
    });
  };

  // import Viewer from 'viewerjs';
  const gallery = new Viewer(document.querySelector('.gallery'), 
    {
      url(e) {
        return e.src.replace('img', 'img/original');
      },
      title: [1, (e) => `${e.naturalWidth} x ${e.naturalHeight}`],

      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: true,
        play: {
          show: true,
          size: 'large',
        },
        next: true,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: false,
        flipVertical: false,
      },
      // The amount of time to delay between automatically 
      // cycling an image when playing.
      interval: 3000,
    }
  );
});