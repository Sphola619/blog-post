// index.js — handles homepage buttons, login checks, logout, and article display

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

// 📰 Fetch and render latest 7 articles for homepage
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://blog-post-backend-ko1i.onrender.com/api/articles');
    const data = await response.json();

    if (data.success && data.articles) {
      renderArticles(data.articles); // ✅ render them using shared logic
    } else {
      console.warn('⚠️ No articles found or invalid response format:', data);
    }
  } catch (error) {
    console.error('❌ Error fetching latest articles:', error);
  }
});
