document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const currentUser = sessionStorage.getItem("loggedInUser");
  if (!currentUser) {
    alert("No user logged in.");
    return;
  }

  const users = JSON.parse(sessionStorage.getItem("users")) || {};
  if (users[currentUser]) {
    users[currentUser].password = newPassword;
    sessionStorage.setItem("users", JSON.stringify(users));
    alert("Password updated successfully!");
    window.location.href = "login.html";
  } else {
    alert("User not found.");
  }
});
