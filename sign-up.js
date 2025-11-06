document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // Basic validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Registration successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('⚠️ Something went wrong. Please try again.');
  }
});
