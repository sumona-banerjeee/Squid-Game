// Play background sound on load
window.addEventListener('DOMContentLoaded', () => {
  try {
    const autoAudio = new Audio('ringsong.mp3');
    autoAudio.play().catch(err => {
      console.warn('Autoplay blocked:', err);
    });
  } catch (error) {
    console.error('Error playing audio:', error);
  }

  // The button text is already set in HTML
});

let shapeSelected = false;

document.querySelectorAll('.shape').forEach(shape => {
  shape.addEventListener('click', () => {
    if (shapeSelected) return; // Prevent multiple selections

    shape.classList.add('selected');
    shapeSelected = true;
    playSound();

    // Save which shape was selected
    localStorage.setItem('selectedShape', shape.title);

    // Disable other shapes
    document.querySelectorAll('.shape').forEach(other => {
      if (other !== shape) {
        other.classList.add('disabled');
      }
    });

    // Update button text
    const joinBtn = document.getElementById('joinBtn');
    joinBtn.textContent = 'Join Now';
  });
});

// Join button click
document.getElementById('joinBtn').addEventListener('click', () => {
  if (!shapeSelected) {
    alert('Please choose a shape first!');
    return;
  }
  playSound();
  setTimeout(() => {
    window.location.href = 'jindex.html';
  }, 500);
});

// Sound effect
function playSound() {
  const audio = new Audio('ringsong.mp3');
  audio.play();
}
