/**
     * Add football articles here.
     * Each article: { title, excerpt, image, url, date }
     * - url: can be an external link or a local file (e.g., articles/football1.html)
     * - image: put local path or external image url
     *
     * To add a new card: push a new object into this array
     */
const articles = [
  {
    title: "Late Winner Seals Dramatic Comeback",
    excerpt: "An injury-time strike turned the game on its head as the home side came from behind.",
    image: "https://via.placeholder.com/640x360?text=Late+Winner",
    url: "#",
    date: "2025-09-25"
  },
  {
    title: "Star Forward Returns from Injury",
    excerpt: "A welcome return as the team regains its attacking threat ahead of the derby.",
    image: "https://via.placeholder.com/640x360?text=Return+From+Injury",
    url: "#",
    date: "2025-09-23"
  },
  {
    title: "Tactical Masterclass: Coach's 3-5-2 Shines",
    excerpt: "A breakdown of how the switch in formation neutralised the opposition's wing play.",
    image: "https://via.placeholder.com/640x360?text=3-5-2+Tactics",
    url: "#",
    date: "2025-09-21"
  },
  {
    title: "Young Debutant Steals the Spotlight",
    excerpt: "The academy graduate opened his account with a composed finish and confident display.",
    image: "https://via.placeholder.com/640x360?text=Young+Debutant",
    url: "#",
    date: "2025-09-19"
  }
];

const cardsEl = document.getElementById('cards');
const countEl = document.getElementById('count');
const searchInput = document.getElementById('search');

function renderArticles(list) {
  cardsEl.innerHTML = '';
  if (!list.length) {
    cardsEl.innerHTML = '<p style="padding:10px;font-size:1rem;color:#6b7280">No articles found.</p>';
    countEl.textContent = 0;
    return;
  }
  countEl.textContent = list.length;
  list.forEach(a => {
    const link = document.createElement('a');
    link.className = 'card';
    link.href = a.url || '#';
    link.target = a.url && a.url.startsWith('http') ? '_blank' : '_self';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = a.image || 'https://via.placeholder.com/640x360?text=No+Image';
    img.alt = a.title;

    const body = document.createElement('div');
    body.className = 'body';

    const h3 = document.createElement('h3');
    h3.textContent = a.title;

    const p = document.createElement('p');
    p.textContent = a.excerpt;

    const metaWrap = document.createElement('div');
    metaWrap.className = 'meta';
    metaWrap.innerHTML = `<span>${a.date || ''}</span><span>Read →</span>`;

    body.appendChild(h3);
    body.appendChild(p);

    link.appendChild(img);
    link.appendChild(body);
    link.appendChild(metaWrap);

    cardsEl.appendChild(link);
  });
}

// Initial render
renderArticles(articles);

// Basic search
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    renderArticles(articles);
    return;
  }
  const filtered = articles.filter(a =>
    (a.title && a.title.toLowerCase().includes(q)) ||
    (a.excerpt && a.excerpt.toLowerCase().includes(q))
  );
  renderArticles(filtered);
});