document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  const expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];

  const categoryTotals = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += Number(exp.amount);
  });

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: [
          "#4caf50", "#ff9800", "#2196f3", "#e91e63", "#9c27b0"
        ],
        borderColor: "#fff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        },
        title: {
          display: true,
          text: "Expenses by Category"
        }
      }
    }
  });
});
