document.addEventListener("DOMContentLoaded", () => {
  // Apply dark mode if saved in sessionStorage
  if (sessionStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});