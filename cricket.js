document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 🔥 Cache-buster added to force fresh data every time
    const response = await fetch(
      `https://blog-post-backend-ko1i.onrender.com/api/articles/category/cricket?ts=${Date.now()}`,
      { cache: "no-store" } // 🔥 Prevent browser & Vercel caching
    );

    const data = await response.json();

    if (data.success && data.articles) {
      renderArticles(data.articles); // Only pass article list
    } else {
      console.warn('⚠️ No articles found or invalid response format:', data);
    }
  } catch (error) {
    console.error('❌ Error fetching Cricket articles:', error);
  }
});
