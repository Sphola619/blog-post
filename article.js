// article.js

// Check if user is logged in
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

// If user is not logged in, redirect to login page
if (!token) {
  alert('⚠️ You need to log in before writing an article.');
  window.location.href = 'login.html';
} else {
  console.log(`✅ Welcome, ${username}! You can write an article.`);
}

// (Later) Article submission logic will go here
document.getElementById('article-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('📝 Article publishing logic coming soon...');
});
