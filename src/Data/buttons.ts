const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    button.classList.add('clicked');  // Додаємо клас при натисканні
  });

  button.addEventListener('mouseup', () => {
    button.classList.add('clicked');  // При відпусканні кнопки видаляємо клас
  });

  button.addEventListener('focus', () => {
    button.classList.remove('clicked');  // Видаляємо клас при фокусуванні
  });
});
