document.addEventListener('DOMContentLoaded', () => {
  const articleId = new URLSearchParams(window.location.search).get('id');
  const commentsContainer = document.getElementById('comments-container');
  const form = document.getElementById('comment-form');
  const textArea = document.getElementById('comment-text');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // 🟡 Load existing comments
  async function loadComments() {
    const res = await fetch(`http://localhost:5000/api/comments/${articleId}`);
    const data = await res.json();

    commentsContainer.innerHTML = '';

    if (data.success && data.comments.length > 0) {
      data.comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `
          <p><strong>${c.author}</strong> <span>${new Date(c.date).toLocaleString()}</span></p>
          <p>${c.text}</p>
        `;
        commentsContainer.appendChild(div);
      });
    } else {
      commentsContainer.innerHTML = '<p>No comments yet. Be the first!</p>';
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

    const res = await fetch(`http://localhost:5000/api/comments/${articleId}`, {
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
  });

  // Load comments on page load
  loadComments();
});
