document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(
      `https://blog-post-backend-ko1i.onrender.com/api/articles/category/football?ts=${Date.now()}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (data.success && data.articles) {
      renderArticles(data.articles);
    } else {
      console.warn('⚠️ No articles found or invalid response format:', data);
    }
  } catch (error) {
    console.error('❌ Error fetching Football articles:', error);
  }
});
