// Находим width для линии под кнопкой выбора контента
document.addEventListener('DOMContentLoaded', () => {

  // Выбираем все табы на странице
  const buttons = document.querySelectorAll('.tab');
  // Находим контейнер
  const container = document.querySelector('.tabsContainer');
  // Находим активную таб
  const activeBtn = document.querySelector('.tabActive');

  
  let buttonsWidth = 0;
  // Проходимся по каждой кнопке и добавляем значение чтобы узнать ширину всех вместе без пробелов между ними
  buttons.forEach(button =>{
    buttonsWidth += button.offsetWidth;
  })

  // Коэффициент увеличения ширины (ширина контейнера делить на ширину всех кнопок без пробелов)
  const widthIncreaseCoefficient = container.offsetWidth / buttonsWidth;

  const lineWidth = widthIncreaseCoefficient * activeBtn.offsetWidth;

  // Устанавливаем новую ширину псевдоэлемента через inline стили контейнера
  container.style.setProperty('--line-width', `${lineWidth}px`);
});