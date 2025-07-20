document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expenseForm");

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value; // NEW LINE
    const expense = {
        id: Date.now(),
        title,
        amount,
        date,
        category,
        description
     };
     
    let expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];
    expenses.push(expense);
    sessionStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense added successfully!");
    expenseForm.reset();
  });
});
