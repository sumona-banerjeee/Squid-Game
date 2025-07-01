// Fade in main content
window.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  main.style.opacity = '0';
  main.style.transition = 'opacity 1s ease-in';
  setTimeout(() => {
    main.style.opacity = '1';
  }, 100);

const audio = new Audio('song1.mp3');
audio.play().catch(err => console.warn('Autoplay blocked:', err));

});
