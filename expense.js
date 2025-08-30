document.addEventListener('DOMContentLoaded',()=>{
    const addExpense = document.getElementById('add-expense-btn');
    const expenseTrackerForm = document.getElementById("expense-tracker");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expense = JSON.parse(localStorage.getItem("expense")) || [];

    expense.forEach(expense=>renderExpense(expense));
    updateTotal();

    addExpense.addEventListener("click",(e)=>{
        e.preventDefault();
        const expense_Name = expenseNameInput.value.trim();
        const expense_Amount = parseFloat(expenseAmountInput.value.trim());
        
        if(expense_Name === "" && expense_Amount === "")return;

        const newExpense ={
            id: Date.now(),
            name:expense_Name,
            amount:expense_Amount,
            completed:false,
        }
        expense.push(newExpense);
        renderExpense(newExpense);
        saveExpense();
        updateTotal();
        expenseNameInput.value="";
        expenseAmountInput.value="";
        console.log(expense);
    });

    function renderExpense(exp) {
        const li = document.createElement("li");
        li.setAttribute("data-id", exp.id);
        li.innerHTML = `
          <span class="text">${exp.name}</span>
          <span class="amount">$${exp.amount}</span>
          <button class="delete">Delete</button>
        `;
      
       
        li.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
            const id = Number(li.getAttribute("data-id"));
            expense = expense.filter((t) => t.id !== id);  // works now
            li.remove();
            saveExpense();
            updateTotal();
          }
        });
      
        expenseList.appendChild(li);
      }
      
    function updateTotal() {
        const totalPrice = expense.reduce((sum, item) => sum + Number(item.amount), 0);
        totalAmount.innerText = `$${totalPrice}`;
      }
    function saveExpense(){
        localStorage.setItem("expense", JSON.stringify(expense));
    }
})