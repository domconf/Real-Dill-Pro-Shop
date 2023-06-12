const signupFormHandler = async (event) => {
  event.preventDefault();     //prevents parent element from being selected.

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {  //fetch the profile of the logged in user among registered users
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/store');  //redirects to the store page for purchasing items
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);