function clearData() {
  if (confirm("Are you sure you want to delete all your expenses?")) {
    sessionStorage.removeItem("expenses");
    alert("All expense data cleared.");
    location.reload();
  }
}

// Password Reset
function resetPassword() {
  // Navigate to password reset page
  window.location.href = "reset_password.html";
}

// Logout
function logout() {
  sessionStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  window.location.href = "login.html"; // Redirect to login
}

// Toggle Dark Mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  sessionStorage.setItem("theme", isDark ? "dark" : "light");
});

// Apply theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = sessionStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});
