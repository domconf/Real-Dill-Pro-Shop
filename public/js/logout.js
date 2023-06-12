const logout = async () => {
  const response = await fetch('/api/users/logout', {  //POST method for logging out of the app.
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');    //redirects to the login page upon successful logout
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
