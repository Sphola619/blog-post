// renderArticles.js — shared article rendering function with count display and clickable details

/**
 * Render articles as cards inside a given container
 * @param {Array} articles - List of article objects
 * @param {HTMLElement} container - The HTML element to render into
 */
function renderArticles(articles, container = document.getElementById('cards')) {
  if (!container) {
    console.warn('⚠️ renderArticles: Container element not found.');
    return;
  }

  const countEl = document.getElementById('count'); // ✅ optional counter

  container.innerHTML = '';

  if (!articles || articles.length === 0) {
    container.innerHTML = '<p style="padding:10px;font-size:1rem;color:#6b7280">No articles found.</p>';
    if (countEl) countEl.textContent = 0;
    return;
  }

  // ✅ Update count dynamically
  if (countEl) countEl.textContent = articles.length;

  articles.forEach(article => {
    // 🔗 Card wrapper
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `article-details.html?id=${article._id}`; // ✅ dynamic link
    card.target = '_self'; // open in same tab

    // 🖼️ Article image
    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = article.image
      ? `http://localhost:5000${article.image}`
      : 'https://via.placeholder.com/640x360?text=No+Image';
    img.alt = article.title;

    // 📰 Article content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'card-content';

    const h3 = document.createElement('h3');
    h3.textContent = article.title;

    const p = document.createElement('p');
    p.textContent = article.content
      ? article.content.substring(0, 120) + '...'
      : 'No content available.';

    // 🕓 Meta info
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `
      <span>${new Date(article.date).toLocaleDateString()}</span>
      <span>By ${article.author || 'Guest'}</span>
    `;

    // 🧱 Assemble card
    contentDiv.appendChild(h3);
    contentDiv.appendChild(p);
    card.appendChild(img);
    card.appendChild(contentDiv);
    card.appendChild(meta);

    container.appendChild(card);
  });
}
