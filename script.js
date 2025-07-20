document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = { name, email, password };
      sessionStorage.setItem("user", JSON.stringify(user));
      alert("Registration Successful! Please log in.");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Login Successful!");
        window.location.href = "index.html"; // Redirect to dashboard
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});
