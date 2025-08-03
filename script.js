const addexpensebtn=document.querySelector('.add-expense-btn');
const expenselist=document.querySelector('.expense-list');
const totalexpenses=document.querySelector('.total-expense h3');
const submitExpenseBtn = document.getElementById('submit-expense');
let expenses=[];
let total=0;
let chart = null;


function renderExpenses(){
    let a="";
    expenses.forEach(expense =>{
        a+=`
        <div class="expense-item">
            <div class="expense-item-description">${expense.description}</div>
            <div class="expense-item-amount">${expense.amount}</div>
             <div class="expense-item-category">${expense.category}</div>
            <button class="delete-expense-btn">&times;</button>
        </div>`;
    });
    expenselist.innerHTML=a;
    totalexpenses.innerText = `Total Expense: $${total}`;
    updateChart();


}
 // global chart instance

function updateChart() {
    const categoryTotals = {};

    // Group expenses by category
    expenses.forEach(exp => {
        if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
        } else {
            categoryTotals[exp.category] = exp.amount;
        }
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    // If chart already exists, destroy and rebuild it
    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('expense-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar', // You can also use 'pie'
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function addExpenses(){

   
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    if(description &&  !isNaN(amount) && category){
        const expense={
            description:description,
            amount:amount,
            category:category
        };
        expenses.push(expense);
        total+=amount;
        renderExpenses();

         document.getElementById('description').value = "";
        document.getElementById('amount').value = "";
        document.getElementById('category').value = "Food";
    }

}
submitExpenseBtn.addEventListener("click",addExpenses);

function  deleteExpenses(index){
    total-=expenses[index].amount;
    expenses.splice(index,1)
    renderExpenses();

}
submitExpenseBtn.addEventListener("click",addExpenses);
expenselist.addEventListener("click",function(event){
    if(event.target.classList.contains("delete-expense-btn")){
        const item = event.target.closest(".expense-item");
        const index = Array.from(expenselist.children).indexOf(item);
        deleteExpenses(index);
    }
});