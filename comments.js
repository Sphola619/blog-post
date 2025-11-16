// comments.js — loads and submits article comments (Render backend)

document.addEventListener('DOMContentLoaded', () => {
  const articleId = new URLSearchParams(window.location.search).get('id');
  const commentsContainer = document.getElementById('comments-container');
  const form = document.getElementById('comment-form');
  const textArea = document.getElementById('comment-text');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const BASE_URL = 'https://blog-post-backend-ko1i.onrender.com';

  // 🟡 Load existing comments
  async function loadComments() {
    try {
      const res = await fetch(`${BASE_URL}/api/comments/${articleId}`);
      const data = await res.json();

      commentsContainer.innerHTML = '';

      if (data.success && data.comments.length > 0) {
        data.comments.forEach(c => {
          const div = document.createElement('div');
          div.className = 'comment';

          const dateObj = new Date(c.date);
          const formattedDate = dateObj.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          const formattedTime = dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          div.innerHTML = `
            <p><strong>${c.author}</strong> <span>${formattedDate} at ${formattedTime}</span></p>
            <p>${c.text}</p>
          `;
          commentsContainer.appendChild(div);
        });
      } else {
        commentsContainer.innerHTML = '<p>No comments yet. Be the first!</p>';
      }
    } catch (error) {
      commentsContainer.innerHTML = '<p style="color:red;">⚠️ Failed to load comments.</p>';
      console.error(error);
    }
  }

  // 🟢 Handle comment submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!token) {
      alert('⚠️ You must be logged in to comment.');
      window.location.href = 'login.html';
      return;
    }

    const text = textArea.value.trim();
    if (!text) return alert('Please write something.');

    try {
      const res = await fetch(`${BASE_URL}/api/comments/${articleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });

      const data = await res.json();

      if (res.ok) {
        textArea.value = '';
        loadComments(); // refresh comments
      } else {
        alert(data.message || 'Failed to post comment.');
      }
    } catch (error) {
      alert('⚠️ Network error while posting comment.');
      console.error(error);
    }
  });

  // Load comments on page load
  loadComments();
});
