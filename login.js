document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(sessionStorageStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    //  Save the logged-in user email
    sessionStorageStorage.setItem("loggedInUser", email);

    alert("Login successful!");
    window.location.href = "index.html"; // Or dashboard.html
  } else {
    alert("Invalid email or password.");
  }
});
