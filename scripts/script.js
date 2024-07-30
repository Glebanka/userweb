// Запускаем функции только когда весь контент загружен
document.addEventListener('DOMContentLoaded', () => {
  tabsCreate();
  lineWidthCalc();
  slidesCreate('yandex');
});
// Создание и настройка слайдера
var swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 24,
  speed: 600,
  createElements: true,
  navigation: {
  nextEl: '.sliderNextButton',
  prevEl: '.sliderPrevButton',
  },
});


// Создаем кнопки в зависимости от массива данных
function tabsCreate(){
  // Массив данных для кнопок
  const buttons = [
      { id: 1, label: 'ЯНДЕКС КАРТЫ', platform: 'yandex' },
      { id: 2, label: 'APP STORE', platform: 'appStore' },
      { id: 3, label: 'GOOGLE PLAY', platform: 'googlePlay' },
      { id: 4, label: 'GOOGLE MAPS', platform: 'googleMaps' },
      { id: 5, label: 'САЙТ THOR', platform: 'thor' },
    ];
    
    // Функция для обработки кликов
    function handleClick(event) {
      const currentTab = event.target;

      // Удаляем активный класс у всех элементов
      const tabs = currentTab.parentNode.children;
      for (let tab of tabs) {
        tab.classList.remove('tabActive');
      }
      const slides = document.getElementById('sliderWrapper');
      while (slides.firstChild) {
        slides.removeChild(slides.firstChild);
      }
      const dataId = currentTab.getAttribute('data-id');
      slidesCreate(buttons[dataId-1].platform);
      swiper.update();
      swiper.slideTo(0, 0, false);
      currentTab.classList.add('tabActive');
      lineWidthCalc();
    }
    
    // Получаем контейнер для кнопок
    const tabsContainer = document.getElementById('tabsContainer');
    
    // Генерация кнопок и добавление их в контейнер
    buttons.forEach(button => {
      const btn = document.createElement('button');
      if(button.id == 1){
        btn.classList.add('tabActive');
      }
      btn.classList.add('tab');
      btn.innerText = button.label;
      btn.setAttribute('data-id', button.id);
      tabsContainer.appendChild(btn);
    });
    
    // Привязываем обработчик событий к контейнеру
    tabsContainer.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        handleClick(event);
      }
    });
}

// Находим width для линии под кнопкой выбора контента
function lineWidthCalc(){
    
  // Выбираем все табы на странице
  const buttons = document.querySelectorAll('.tab');
  // Находим контейнер
  const container = document.querySelector('.tabsContainer');
  // Находим активную таб
  const activeTab = document.querySelector('.tabActive');

  
  let buttonsWidth = 0;
  // Проходимся по каждой кнопке и добавляем значение чтобы узнать ширину всех вместе без пробелов между ними
  buttons.forEach(button =>{
    buttonsWidth += button.offsetWidth;
  })

  // Коэффициент увеличения ширины (ширина контейнера делить на ширину всех кнопок без пробелов)
  const widthIncreaseCoefficient = container.offsetWidth / buttonsWidth;

  const lineWidth = widthIncreaseCoefficient * activeTab.offsetWidth;

  // Устанавливаем новую ширину псевдоэлемента через inline стили контейнера
  container.style.setProperty('--line-width', `${lineWidth}px`);
}

function slidesCreate(platform){
  // Массив данных для слайдов
  let slides = [
    { platform: 'yandex', rating: '2', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'asndkapsjdasdjoasidj ioas dasdh jasdjsld jash dljkashd jkashd jashd jashd jkashdjashd jash djkashd jkashd jashdjkash djkashd jkdhk jasdhkjashd jkash djkashdjk shdkjash djkh  Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/auto.jpg', '../assets/reviewAssets/auto2.jpg', '../assets/reviewAssets/auto.jpg'] },
    { platform: 'appStore', rating: '3', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: ['../assets/reviewAssets/video.mp4', '../assets/reviewAssets/video2.mp4'] },
    { platform: 'googlePlay', rating: '5', title: 'УДОБНОЕ ПРИЛОЖЕНИЕ', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: ['../assets/reviewAssets/video2.mp4'] },
    { platform: 'googleMaps', rating: '4', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/auto2.jpg'] },
    { platform: 'googlePlay', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googlePlay', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googlePlay', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googleMaps', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от BBC212 — 17.04.2024 г.', assets: ['../assets/reviewAssets/auto2.jpg'] },
    { platform: 'thor', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/video.mp4'] },
    { platform: 'thor', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/video.mp4'] },
    { platform: 'appStore', rating: '5', title: 'УДОБНОЕ ПРИЛОЖЕНИЕ', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: [] },
    { platform: 'thor', rating: '5', title: 'УДОБНОЕ ПРИЛОЖЕНИЕ', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: [] },
    { platform: 'yandex', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'appStore', rating: '5', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'yandex', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил систему примерно год назад, очень нравится! Отдельно хотелбы отметить работу приложения, все предельно понятно и удобно в использовании, часто пользуюсь функцией drive select, которую можно настраивать прямо в приложении! Ребятам за приложение огромный респект!)', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/auto2.jpg', '../assets/reviewAssets/auto.jpg', '../assets/reviewAssets/video.mp4'] },
    { platform: 'appStore', rating: '5', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googlePlay', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил систему примерно год назад, очень нравится! Отдельно хотелбы отметить работу приложения, все предельно понятно и удобно в использовании, часто пользуюсь функцией drive select, которую можно настраивать прямо в приложении! Ребятам за приложение огромный респект!)', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googleMaps', rating: '5', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'yandex', rating: '5', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'thor', rating: '5', title: 'ОТЛИЧНАЯ СИСТЕМА ВЫХЛОПА', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: [] },
    { platform: 'googlePlay', rating: '5', title: 'ОТЛИЧНАЯ РЕШЕНИЕ ДЛЯ ТЮНИНГА ВЫХЛОПА', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: [] },
    { platform: 'googleMaps', rating: '5', title: 'УДОБНОЕ ПРИЛОЖЕНИЕ', content: 'Установил на дизельный Audi Q7 теперь рычит как Халк)  рекомендую!', meta: 'от BBC212 — 17.04.2024 г.', assets: [] },
    { platform: 'thor', rating: '5', title: 'УДОБНОЕ ПРИЛОЖЕНИЕ', content: 'Месяц назад установил систему на свой авто, крутая штука, особенно удобно, что не нужно отвлекаться на телефон, чтобы переключить  звук, дети в пробках развлекаются с режимом звуков животных. В общем все остались довольны. Спасибо команде.', meta: 'от iDron88 — 28.01.2019 г.', assets: ['../assets/reviewAssets/auto2.jpg'] },
  ];

  slides = slides.filter(slide => slide.platform === platform);
  // Получаем sliderContainer
  const sliderWrapper = document.getElementById('sliderWrapper');
    
    // Генерация слайдов и добавление их в контейнер
    slides.forEach(slideInfo => {
      const slideContent = slideCreate(slideInfo);
      sliderWrapper.appendChild(slideContent);
    });
}


function slideCreate(slideInfo){
  const slide = document.createElement('div')
  slide.classList.add('swiper-slide');

  const slideContent = document.createElement('div')
  slideContent.classList.add('sliderContainer');
  
  // Добавление платформы отзыва
  const slideReference = document.createElement('div')
  slideReference.classList.add(slideInfo.platform);
  slideContent.appendChild(slideReference);

  // Добавление оценки отзыва
  const slideRatingContainer = document.createElement('div');
  slideRatingContainer.classList.add('ratingContainer');
  // Добавляем звезды
  for (let i = 0; i < slideInfo.rating; i++) {
    const slideRating = document.createElement('div');
    slideRating.classList.add('star')
    slideRatingContainer.appendChild(slideRating);
  }
  slideContent.appendChild(slideRatingContainer);

  // Добавление названия отзыва
  const slideTitle = document.createElement('h3')
  slideTitle.classList.add('sliderHeading');
  slideTitle.innerText = slideInfo.title;
  slideContent.appendChild(slideTitle);
  
  // Добавление текста отзыва
  const slideText = document.createElement('p')
  slideText.innerText = slideInfo.content;
  slideText.classList.add('content');
  slideContent.appendChild(slideText);
  // если в отзыве есть файлы, то ограничиваем текст до 200px
  if(slideInfo.assets.length !== 0){
    slideText.classList.add('limited');
  }

  // Добавление даты и автора отзыва
  const slideMeta = document.createElement('p')
  slideMeta.innerText = slideInfo.meta;
  slideMeta.classList.add('meta-info');
  slideContent.appendChild(slideMeta);



  // Добавление картинок

  if(slideInfo.assets.length !== 0){
    const assetsContainer = document.createElement('div');
    assetsContainer.classList.add('assetsContainer');
    slideContent.appendChild(assetsContainer);

    let images = [];
    let videos = [];
    
    slideInfo.assets.forEach(asset => {
      const fileExtension = asset.split('.').pop().toLowerCase();
        if (['mp4', 'avi', 'mkv'].includes(fileExtension)) {
            videos.push(asset);
          } else if (['jpeg', 'jpg', 'webp', 'png'].includes(fileExtension)){
            images.push(asset);
        }
    });

    if (images.length !== 0){
      const slideImages = document.createElement('div');
      slideImages.classList.add('slideImage');
      slideImages.style.backgroundImage = `url(${images[0]})`;
      assetsContainer.appendChild(slideImages);
      
      const imagesCounter = document.createElement('div');
      imagesCounter.classList.add('imagesCounter');
      slideImages.appendChild(imagesCounter);
      imagesCounter.innerHTML = '<div class="count">'+images.length+'</div>';
    }
    if (videos.length !== 0){
      const slideVideo = showFirstFrame(videos[0]);
      assetsContainer.appendChild(slideVideo);
    }
  }

  function showFirstFrame(videoInfo) {
    const video = document.createElement('video');
    const slideVideo = document.createElement('div');
    slideVideo.classList.add('slideVideo');
    video.src = videoInfo;

    video.addEventListener('loadeddata', function() {
      video.currentTime = 0;
    });

    video.addEventListener('seeked', function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataURL = canvas.toDataURL();
        slideVideo.style.backgroundImage = `url(${dataURL})`;
        slideVideo.innerHTML = '<div class="playButton"></div>'

    });
    return slideVideo;
  }


  // Добавляем div.sliderContainer в div.swiper-slide 
  slide.appendChild(slideContent);


  // Добавление кнопки "Посмотреть отзыв"

  const btnCheckReview = document.createElement('button');
  btnCheckReview.classList.add('btn');
  btnCheckReview.classList.add('btnWhite');
  
  const btnText = document.createElement('div');
  btnText.classList.add('btnText');
  btnText.innerText = "Посмотреть отзыв"
  btnCheckReview.appendChild(btnText);

  const expandSVG = document.createElement('div');
  expandSVG.classList.add('expandSVG');
  btnCheckReview.appendChild(expandSVG);

  slide.appendChild(btnCheckReview);


  // возращаем готовый div с класом swiper-slide
  return slide;
}