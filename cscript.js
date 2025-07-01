// Contact form submit handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent actual form submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    alert('Thank you, ' + name + '! Your message has been sent.');
    this.reset(); // Clear form
  } else {
    alert('Please fill out all fields.');
  }
});
