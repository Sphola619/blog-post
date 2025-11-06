document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save the token for authentication
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);

      alert(`✅ Welcome back, ${data.username}!`);
      window.location.href = 'index.html'; // redirect to home or articles page
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('⚠️ Unable to log in. Please try again later.');
  }
});
