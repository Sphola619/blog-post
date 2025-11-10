// article.js — handles access control and article publishing with image upload

// 🧠 Helper: Check if token is expired
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
}

// 🔒 Access control
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

if (!token || isTokenExpired(token)) {
  alert('⚠️ Only registered fans can write an article. Please log in again.');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
} else {
  console.log(`✅ Welcome, ${username}! You can write an article.`);
}

// 📝 Handle article submission
document.getElementById('article-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data fields
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const content = document.getElementById('content').value.trim();
  const imageInput = document.getElementById('image');

  if (!title || !category || !content) {
    alert('⚠️ Please fill in all required fields.');
    return;
  }

  // 📦 Create a FormData object for file + text
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('content', content);
  if (imageInput.files.length > 0) {
    formData.append('image', imageInput.files[0]);
  }

  try {
    // 🚀 Send form data to backend
    const response = await fetch('http://localhost:5000/api/articles/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // ✅ no Content-Type when using FormData
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Article published successfully!');
      window.location.href = 'index.html'; // redirect home
    } else {
      alert(`❌ ${data.message || 'Failed to publish article.'}`);
      if (data.message && data.message.includes('expired')) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert('⚠️ Something went wrong. Please try again.');
  }
});
