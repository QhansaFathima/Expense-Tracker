document.addEventListener("DOMContentLoaded", () => {
  const expenseList = document.getElementById("expenseList");
  const categoryDiv = document.getElementById("categoryTotals");

  const incomeBox = document.getElementById("totalIncome");
  const expenseBox = document.getElementById("totalExpenses");
  const savingsBox = document.getElementById("totalSavings");

  let expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];

  let userProfile = JSON.parse(sessionStorage.getItem("userProfile")) || {};
  let income = parseFloat(userProfile.income) || 0;

  if (expenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses recorded yet.</p>";
  } else {
    const categoryTotals = {};
    let totalExpense = 0;

    expenses.forEach(exp => {
      const cat = exp.category;
      const amt = parseFloat(exp.amount) || 0;
      totalExpense += amt;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
    });

    categoryDiv.innerHTML = "<h3>Total by Category</h3>";
    for (const cat in categoryTotals) {
      const p = document.createElement("p");
      p.textContent = `${cat}: ₹${categoryTotals[cat].toFixed(2)}`;
      categoryDiv.appendChild(p);
    }

    expenses.forEach((exp) => {
      const div = document.createElement("div");
      div.className = "expense-card";
      div.innerHTML = `
        <div class="expense-details">
          <h3>${exp.title}</h3>
          <p><strong>Amount:</strong> ₹${exp.amount}</p>
          <p><small>${exp.date || "N/A"} | ${exp.category}</small></p>
          <p><small>${exp.description || ""}</small></p>
        </div>
        <div>
          <button class="edit-btn" data-id="${exp.id}">Edit</button>
          <button class="delete-btn" data-id="${exp.id}">Delete</button>
        </div>
      `;
      expenseList.appendChild(div);
    });
  }

  incomeBox.textContent = `Income: ₹${income.toFixed(2)}`;
  let totalExpense = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  expenseBox.textContent = `Expenses: ₹${totalExpense.toFixed(2)}`;
  savingsBox.textContent = `Savings: ₹${(income - totalExpense).toFixed(2)}`;

  expenseList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      if (confirm("Are you sure you want to delete this expense?")) {
        deleteExpense(id);
      }
    }
    if (e.target.classList.contains("edit-btn")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      editExpense(id);
    }
  });

  function deleteExpense(id) {
    expenses = expenses.filter((exp) => exp.id !== id);
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    location.reload();
  }

  function editExpense(id) {
    // Find the expense
    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    // For simplicity, let's use prompt dialogs to edit fields
    const newTitle = prompt("Edit Title:", exp.title);
    if (newTitle === null) return; // cancel pressed
    const newAmount = prompt("Edit Amount:", exp.amount);
    if (newAmount === null) return;
    const newCategory = prompt("Edit Category:", exp.category);
    if (newCategory === null) return;
    const newDate = prompt("Edit Date (YYYY-MM-DD):", exp.date);
    if (newDate === null) return;
    const newDescription = prompt("Edit Description:", exp.description || "");
    if (newDescription === null) return;

    // Update expense object
    exp.title = newTitle.trim() || exp.title;
    exp.amount = parseFloat(newAmount) || exp.amount;
    exp.category = newCategory.trim() || exp.category;
    exp.date = newDate.trim() || exp.date;
    exp.description = newDescription.trim();

    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    location.reload();
  }
});
