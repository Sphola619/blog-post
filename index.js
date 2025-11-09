// index.js — handles homepage buttons and login checks
const writeLink = document.getElementById('write-link');
const token = localStorage.getItem('token');

if (writeLink) {
  writeLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (token) {
      window.location.href = 'article.html';
    } else {
      alert('⚠️ Please log in to write an article.');
      window.location.href = 'login.html';
    }
  });
}
