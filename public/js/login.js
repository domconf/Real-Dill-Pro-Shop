const loginForm = async (event) => {
  event.preventDefault(); //prevents the parent element of the button from being selected

  const username = document.querySelector('#username').value.trim(); //acquired from user input
  const password = document.querySelector('#password').value.trim(); //acquired from user input

  if (username && password) {
    const response = await fetch('/api/users/login', {   //POST request adds user login info to the endpoint where login credentials are matched.
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/store');  //navigates to the store page if login is successful
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginForm);
