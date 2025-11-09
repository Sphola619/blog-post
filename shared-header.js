// shared-header.js — Handles dynamic header links on all pages

const headerLinks = document.querySelector('.auth-links');
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

// Helper: check if token expired
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
}

// Set header buttons dynamically
if (!token || isTokenExpired(token)) {
  // Not logged in
  headerLinks.innerHTML = `
    <a href="login.html">Login</a>
    <a href="sign-up.html">Sign Up</a>
  `;
  localStorage.removeItem('token');
  localStorage.removeItem('username');
} else {
  // Logged in
  headerLinks.innerHTML = `
    <a href="article.html" id="write-link">Write Article</a>
    <a href="#" id="logout-link">Logout</a>
  `;
}

// Handle Write Article link
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'write-link') {
    e.preventDefault();
    if (!token || isTokenExpired(token)) {
      alert('⚠️ Only registered fans can write an article. Please log in first.');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = 'login.html';
    } else {
      window.location.href = 'article.html';
    }
  }
});

// Handle Logout link
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'logout-link') {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('👋 You have been logged out.');
    window.location.href = 'login.html';
  }
});
