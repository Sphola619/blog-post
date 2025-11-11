// article-details.js
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

      document.getElementById('article-image').src =
        `http://localhost:5000${article.image}`;
      document.getElementById('article-title').textContent = article.title;
      document.getElementById('article-author').textContent = `By ${article.author}`;
      document.getElementById('article-date').textContent =
        new Date(article.date).toLocaleDateString();
      document.getElementById('article-content').textContent = article.content;
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
