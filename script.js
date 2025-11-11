/**
 * script.js — Fetch and render live articles from the backend
 * Works for both homepage (latest 7) and category pages
 */

// Will use this file later for shared functions if needed 

const cardsEl = document.getElementById('cards');
const countEl = document.getElementById('count');
const searchInput = document.getElementById('search');

// 🔹 Generic render function (same layout as before)
function renderArticles(list) {
  cardsEl.innerHTML = '';

  if (!list || !list.length) {
    cardsEl.innerHTML = '<p style="padding:10px;font-size:1rem;color:#6b7280">No articles found.</p>';
    if (countEl) countEl.textContent = 0;
    return;
  }

  if (countEl) countEl.textContent = list.length;

  list.forEach(article => {
    const link = document.createElement('a');
    link.className = 'card';
    link.href = '#'; // 🔜 later this can open a detailed view
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = article.image || 'https://via.placeholder.com/640x360?text=No+Image';
    img.alt = article.title;

    const body = document.createElement('div');
    body.className = 'body';

    const h3 = document.createElement('h3');
    h3.textContent = article.title;

    const p = document.createElement('p');
    // Limit preview text for cleaner layout
    p.textContent = article.content
      ? article.content.substring(0, 120) + '...'
      : 'No preview available.';

    const metaWrap = document.createElement('div');
    metaWrap.className = 'meta';
    metaWrap.innerHTML = `
      <span>${new Date(article.createdAt).toLocaleDateString()}</span>
      <span>By ${article.author || 'Anonymous'}</span>
    `;

    body.appendChild(h3);
    body.appendChild(p);
    link.appendChild(img);
    link.appendChild(body);
    link.appendChild(metaWrap);

    cardsEl.appendChild(link);
  });
}

// 📰 Fetch articles depending on page context
async function fetchArticles() {
  try {
    // Detect if this is homepage or a category page
    let apiUrl = 'http://localhost:5000/api/articles';

    if (window.location.href.includes('football')) {
      apiUrl = 'http://localhost:5000/api/articles/category/Football';
    } else if (window.location.href.includes('cricket')) {
      apiUrl = 'http://localhost:5000/api/articles/category/Cricket';
    } else if (window.location.href.includes('rugby')) {
      apiUrl = 'http://localhost:5000/api/articles/category/Rugby';
    } else if (window.location.href.includes('tennis')) {
      apiUrl = 'http://localhost:5000/api/articles/category/Tennis';
    } else if (window.location.href.includes('other-sports')) {
      apiUrl = 'http://localhost:5000/api/articles/category/Other';
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.articles) {
      renderArticles(data.articles);
      return data.articles;
    } else {
      console.warn('⚠️ No articles found or invalid format:', data);
      renderArticles([]);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    cardsEl.innerHTML = '<p style="color:red;">⚠️ Failed to load articles. Try again later.</p>';
  }
}

// 🧠 Search function — filters current list
let allArticles = [];

document.addEventListener('DOMContentLoaded', async () => {
  allArticles = await fetchArticles();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        renderArticles(allArticles);
        return;
      }
      const filtered = allArticles.filter(a =>
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.content && a.content.toLowerCase().includes(q)) ||
        (a.author && a.author.toLowerCase().includes(q))
      );
      renderArticles(filtered);
    });
  }
});
