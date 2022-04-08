// consts go here
const loginForm = document.querySelector('#loginForm');
const signupForm = document.querySelector('#signupForm');


// fucntions go here
const handleLoginForm = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-login').value;
  const password = document.querySelector('#password-login').value;
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const handleSignupForm = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-signup').value;
  const password = document.querySelector('#password-signup').value;
  console.log(username);
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};



//event listeners here

loginForm.addEventListener('submit', handleLoginForm);
signupForm.addEventListener('submit', handleSignupForm);
