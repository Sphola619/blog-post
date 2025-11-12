// article-details.js — fetches and displays full article details (with date + time)
document.addEventListener('DOMContentLoaded', async () => {
  // Extract ?id= from URL
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  if (!articleId) {
    document.getElementById('article-details').innerHTML =
      '<p style="color:red;">⚠️ Article not found.</p>';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/articles/${articleId}`);
    const data = await res.json();

    if (res.ok && data.success) {
      const article = data.article;

      // 🖼️ Article image
      const imageEl = document.getElementById('article-image');
      imageEl.src = article.image
        ? `http://localhost:5000${article.image}`
        : 'https://via.placeholder.com/640x360?text=No+Image';
      imageEl.alt = article.title || 'Article image';

      // 🧾 Title & Author
      document.getElementById('article-title').textContent = article.title || 'Untitled Article';
      document.getElementById('article-author').textContent = `By ${article.author || 'Guest'}`;

      // 🕓 Date & Time formatting
      const dateValue = article.date || article.createdAt;
      let formattedDate = 'Unknown date';
      let formattedTime = '';

      if (dateValue) {
        const dateObj = new Date(dateValue);
        if (!isNaN(dateObj)) {
          formattedDate = dateObj.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          formattedTime = dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      }

      // ✅ Display both date and time
      document.getElementById('article-date').textContent = formattedDate;
      const timeEl = document.getElementById('article-time');
      if (timeEl && formattedTime) {
        timeEl.textContent = ` at ${formattedTime}`;
      }

      // 📝 Full Content
      const contentEl = document.getElementById('article-content');
      contentEl.textContent = article.content || 'No content available.';

    } else {
      document.getElementById('article-details').innerHTML =
        '<p style="color:red;">❌ Could not load article details.</p>';
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    document.getElementById('article-details').innerHTML =
      '<p style="color:red;">⚠️ Error loading article. Try again later.</p>';
  }
});
