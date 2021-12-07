let detail;
let amount;
//clear the forms after adding 
function myFunction() {
  
  document.getElementById("detail").value = '';
  document.getElementById("amount").value = '';
  
}


// holds all transactions
let transactions = [];

// get values from inputs
function getInputValues() {
  detail = document.getElementById("detail").value;
  amount = Number(document.getElementById("amount").value);
  //refresh();
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
  let transactions = JSON.parse(localStorage.getItem('transactions'));

  for (let i = 0; i < transactions.length; i++) {
    tableBody.innerHTML += `
        <tr>
                <th>${transactions[i].type}</th>
                <th>${transactions[i].detail}</th>
                <th>${parseInt(transactions[i].amount)}</th>
                
                
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
    let transactions = JSON.parse(localStorage.getItem('transactions'));

   for (let i = 0; i < transactions.length; i++) {

    if (transactions[i].type === "Income") {
        income += parseInt(transactions[i].amount);
        localStorage.setItem('income', JSON.stringify(income));
    }

    if (transactions[i].type === "Expense") {
        expense += parseInt(transactions[i].amount);
        localStorage.setItem('expense', JSON.stringify(expense));
    }
       
   }
   let income1 = JSON.parse(localStorage.getItem("income"));
   let expense1 =JSON.parse(localStorage.getItem("expense"));
   incomeTotal.innerHTML = income1;
   expenseTotal.innerHTML = expense1;
   //expenseTotal.innerHTML = expense1;
   if( expense1 > income1)
   {
     alert("something went wrong")
   }else if(expense1 < income1) {
    
    amountTotal.innerHTML = income1 - expense1;
   }
   
  
   

 
}


function calc(type) {
  getInputValues();

  if (!isValid()) return;
  

  // transactions.push({type, detail, amount});
  //localStorage.setItem('transactions', JSON.stringify([{type, detail, amount}]));
  let transactions = localStorage.getItem('transactions') && JSON.parse(localStorage.getItem('transactions'));
  
  if(transactions) {
    transactions = JSON.stringify([...JSON.parse(localStorage.getItem('transactions')), {type, detail, amount}]);
    localStorage.setItem('transactions', transactions);
  } else {
    localStorage.setItem('transactions', JSON.stringify([{type, detail, amount}]));
  }
  getResults();
  displayTable();
  myFunction();
  
  
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
(function(){
  const incomeTotal = document.getElementById("incomeTotal");
  const expenseTotal = document.getElementById("expenseTotal");
  const amountTotal = document.getElementById("amountTotal");

  displayTable();

  incomeTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('income')));
  expenseTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('expense')));
  amountTotal.innerHTML = parseInt(JSON.parse(localStorage.getItem('income'))) - parseInt(JSON.parse(localStorage.getItem('expense')));

})();
function SomeDeleteRowFunction() {
  // event.target will be the input element.
  var td = event.target.parentNode; 
  var tr = td.parentNode; // the row to be removed
  tr.parentNode.removeChild(tr);
}








