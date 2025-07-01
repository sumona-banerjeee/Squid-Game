// Play background sound and highlight selected shape
window.addEventListener('DOMContentLoaded', () => {
  try {
    const autoAudio = new Audio('ringsong.mp3');
    autoAudio.play().catch(err => {
      console.warn('Autoplay blocked:', err);
    });
  } catch (error) {
    console.error('Error playing audio:', error);
  }

  // Highlight saved shape as logo
  const selectedShape = localStorage.getItem('selectedShape');
  if (selectedShape) {
    document.querySelectorAll('.shape').forEach(shape => {
      if (shape.title && shape.title.toLowerCase() === selectedShape.toLowerCase()) {
        shape.classList.add('selected');
      } else {
        shape.classList.add('disabled');
      }
      shape.style.pointerEvents = 'none';
    });
  }
});

// Sound effect for Join button
function playSound() {
  const audio = new Audio('click-sound.mp3');
  audio.play();
}
