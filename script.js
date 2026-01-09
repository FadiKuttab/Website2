const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("input");
const expenseEl = document.getElementById("output");
const listEl = document.getElementById("tranlist");
const form = document.getElementById("tranform");
const textInput = document.getElementById("box1");
const amountInput = document.getElementById("box2");

let transactions = [];

// ADD TRANSACTION
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = textInput.value;
  const amount = Number(amountInput.value);

  if (text === "" || amount === 0) return;

  const transaction = {
    id: Date.now(),
    text: text,
    amount: amount
  };

  transactions.push(transaction);

  renderTransactions();
  updateTotals();

  textInput.value = "";
  amountInput.value = "";
});

// RENDER TRANSACTIONS
function renderTransactions() {
  listEl.innerHTML = "";

  for (let i = 0; i < transactions.length; i++) {
    const li = document.createElement("li");

    li.innerHTML = `
      ${transactions[i].text}
      <span>
        $${transactions[i].amount}
        <button onclick="removeTransaction(${transactions[i].id})">❌</button>
      </span>
    `;

    listEl.appendChild(li);
  }
}

// UPDATE TOTALS
function updateTotals() {
  let balance = 0;
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    balance += transactions[i].amount;

    if (transactions[i].amount > 0) {
      income += transactions[i].amount;
    } else {
      expense += transactions[i].amount;
    }
  }

  balanceEl.textContent = `$${balance}`;
  incomeEl.textContent = `$${income}`;
  expenseEl.textContent = `$${Math.abs(expense)}`;
}

// REMOVE TRANSACTION
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  renderTransactions();
  updateTotals();
}

