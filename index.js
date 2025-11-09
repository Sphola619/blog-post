// index.js — handles homepage buttons, login checks, and logout

// 🧠 Helper: Check if token is expired
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000; // expired if now > exp
  } catch {
    return true; // invalid token format
  }
}

const writeLink = document.getElementById('write-link');
const logoutLink = document.getElementById('logout-link');

// 🟢 Handle Write Article click
if (writeLink) {
  writeLink.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      alert('⚠️ Only registered fans can write an article. Please log in first.');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = 'login.html';
    } else {
      window.location.href = 'article.html';
    }
  });
}

// 🔴 Handle Logout
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('👋 You have been logged out.');
    window.location.href = 'login.html';
  });
}
