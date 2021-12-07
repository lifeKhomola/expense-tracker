let detail;
let amount;

// holds all transactions
let transactions = [];

// get values from inputs
function getInputValues() {
  detail = document.getElementById("detail").value;
  amount = Number(document.getElementById("amount").value);
}

// validate inputs
function isValid() {
  if (!detail || !amount) {
    alert("Detail and Amount are both required");
    return false;
  }
  return true;
}

// populate the table
function displayTable() {
  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  let transactionsArray = JSON.parse(localStorage.getItem('transactions'));
  let len = transactionsArray.length;
  for (let i = 0; i < len; i++) {
    tableBody.innerHTML += `
        <tr>
                <th>${transactionsArray[i].type}</th>
                <th>${transactionsArray[i].detail}</th>
                <th>${parseInt(transactionsArray[i].amount)}</th>
            </tr>
        `;
  }
}


function getResults () {
    const incomeTotal = document.getElementById("incomeTotal");
    const expenseTotal = document.getElementById("expenseTotal");
    const amountTotal = document.getElementById("amountTotal");

    let income = 0;
    let expense = 0;
    let amount = 0;


   let transactionsArray = JSON.parse(localStorage.getItem('transactions'));
   let len = transactionsArray.length;
   for(let i = 0; i < len; i++) {
      if( transactionsArray[i].type === 'Income' ){
          income += parseInt(transactionsArray[i].amount);
          localStorage.setItem('income', JSON.stringify(income));
      }

      if(transactionsArray[i].type === 'Expense') {
        expense += parseInt(transactionsArray[i].amount);
        localStorage.setItem('expense', JSON.stringify(expense));
      }
   }
   
   let x = parseInt(JSON.parse(localStorage.getItem('expense')));
   let y = parseInt(JSON.parse(localStorage.getItem('income')));
   console.log(x);
   console.log(y);
   let incomeResult = isNaN(y) ? 0 : parseInt(JSON.parse(localStorage.getItem('income'))); 
   let expenseResult = isNaN(x) ? 0 : parseInt(JSON.parse(localStorage.getItem('expense')));

   
   incomeTotal.innerHTML = incomeResult;
   expenseTotal.innerHTML = expenseResult;
   amountTotal.innerHTML = incomeResult - expenseResult;

   document.getElementById("detail").value = "";
   document.getElementById("amount").value = "";
}


function calc(type) {
  getInputValues();

  if (!isValid()) return;

  let transactionsArray = localStorage.getItem('transactions') && JSON.parse(localStorage.getItem('transactions'));

  if(transactionsArray) {
    transactionsArray = JSON.stringify([...JSON.parse(localStorage.getItem('transactions')), {type, detail, amount}]);
    localStorage.setItem('transactions', transactionsArray);
  } else {
    localStorage.setItem('transactions', JSON.stringify([{type, detail, amount}]));
  }

  console.log(transactionsArray);

  getResults();
  displayTable();
}


function resetTableData(){
  const tableBody = document.getElementById("tableBody");
  const incomeTotal = document.getElementById("incomeTotal");
  const expenseTotal = document.getElementById("expenseTotal");
  const amountTotal = document.getElementById("amountTotal");
  
  tableBody.innerHTML = '';
  incomeTotal.innerHTML = "0";
  expenseTotal.innerHTML = "0";
  amountTotal.innerHTML = "0";

  localStorage.setItem('transactions', []);
  localStorage.setItem('income', 0);
  localStorage.setItem('expense', 0);
}

// display data from localStorage after page load
(function(){
  const incomeTotal = document.getElementById("incomeTotal");
  const expenseTotal = document.getElementById("expenseTotal");
  const amountTotal = document.getElementById("amountTotal");

  displayTable();

  incomeTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('income')));
  expenseTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('expense')));
  amountTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('income'))) - parseInt(JSON.parse(localStorage.getItem('expense')));

})();
