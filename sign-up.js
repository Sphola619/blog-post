document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // -------------------------------
  // 🔎 Basic Validation
  // -------------------------------
  if (!username || !email || !password || !confirmPassword) {
    alert('⚠️ Please fill in all fields.');
    return;
  }

  if (username.length < 3) {
    alert('⚠️ Username must be at least 3 characters.');
    return;
  }

  // Simple email check
  if (!email.includes('@') || !email.includes('.')) {
    alert('⚠️ Please enter a valid email.');
    return;
  }

  if (password.length < 6) {
    alert('⚠️ Password must be at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    alert('⚠️ Passwords do not match!');
    return;
  }

  // -------------------------------
  // 🔥 Submit to Backend
  // -------------------------------
  try {
    const response = await fetch('https://blog-post-backend-ko1i.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    // Try to parse JSON safely
    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn('⚠️ Could not parse JSON from backend.', err);
    }

    if (response.ok) {
      alert('✅ Registration successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      alert(`❌ ${data.message || "Registration failed."}`);
    }

  } catch (error) {
    console.error('Network Error:', error);
    alert('⚠️ Unable to reach server. Please try again later.');
  }
});
