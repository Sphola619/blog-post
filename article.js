// article.js — handles access control and article publishing

// 🧠 Helper: Check if token is expired
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000; // true if expired
  } catch {
    return true; // invalid token
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

  // Get form data
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const content = document.getElementById('content').value.trim();
  const imageInput = document.getElementById('image');
  let image = '';

  // (Optional) Get selected image name for now
  if (imageInput && imageInput.files && imageInput.files.length > 0) {
    image = imageInput.files[0].name;
  }

  if (!title || !category || !content) {
    alert('⚠️ Please fill in all required fields.');
    return;
  }

  // Prepare data
  const articleData = {
    title,
    category,
    content,
    image,
  };

  try {
    // Send to backend
    const response = await fetch('http://localhost:5000/api/articles/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ Include JWT
      },
      body: JSON.stringify(articleData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Article published successfully!');
      window.location.href = 'index.html'; // Redirect home
    } else {
      alert(`❌ ${data.message || 'Failed to publish article.'}`);
      if (data.message && data.message.includes('expired')) {
        // Auto logout if token expired mid-session
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
