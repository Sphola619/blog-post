document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:5000/api/articles/category/cricket');
    const data = await response.json(); // ✅ parse response

    if (data.success && data.articles) {
      renderArticles(data.articles); // ✅ only pass the article list
    } else {
      console.warn('⚠️ No articles found or invalid response format:', data);
    }
  } catch (error) {
    console.error('❌ Error fetching Cricket articles:', error);
  }
});

