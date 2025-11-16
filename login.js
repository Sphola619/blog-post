document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('https://blog-post-backend-ko1i.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // 🔒 Safe JSON parse
    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn("⚠️ Backend returned non-JSON (maybe waking up)", err);
      alert("⚠️ Server is waking up. Please try again in a moment.");
      return;
    }

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);

      alert(`✅ Welcome back, ${data.username}!`);
      window.location.href = 'index.html';
    } else {
      alert(`❌ ${data.message || 'Login failed.'}`);
    }

  } catch (error) {
    console.error('Error:', error);
    alert('⚠️ Unable to log in. Please try again later.');
  }
});
