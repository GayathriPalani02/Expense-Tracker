* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', sans-serif;
    background: #f7f7f7;
    padding: 20px;
  }
  
  .container {
    max-width: 400px;
    margin: 30px auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  }
  
  h2, h3 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .balance {
    margin: 20px 0;
    text-align: center;
  }
  
  .inc-exp-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f1f1f1;
  }
  
  .money {
    font-size: 20px;
  }
  
  .plus {
    color: green;
  }
  
  .minus {
    color: red;
  }
  
  .list {
    list-style: none;
    margin-bottom: 20px;
  }
  
  .list li {
    background: #f9f9f9;
    padding: 10px;
    margin: 8px 0;
    border-right: 5px solid;
    display: flex;
    justify-content: space-between;
  }
  
  .list li.plus {
    border-color: green;
  }
  
  .list li.minus {
    border-color: red;
  }
  
  .form-control {
    margin: 10px 0;
  }
  
  .form-control label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-control input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .btn:hover {
    background: #45a049;
  }
  
  const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a text and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(trans => trans.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balance.innerText = $${total};
  money_plus.innerText = +$${income};
  money_minus.innerText = -$${expense};
}

form.addEventListener('submit', addTransaction);