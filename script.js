const transactionsU1 = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions: []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => 
    transaction.id !== ID)
    updateLocalStorage
  init()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>
    `
  transactionsU1.append(li)
  /*<li class="minus"> 
      Salário <span>-$400</span><button class="delete-btn">x</button>
  </li>*/
}

const updateBalanceValues = () => {
  const transactionsAmounts = transactions
    .map(transaction => transaction.amount)
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`

}
const init = () => {
  transactionsU1.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
  event.preventDefault()

  const TransactionName = inputTransactionName.value.trim()
  const TransactionAmount = inputTransactionAmount.value.trim()

  if (TransactionName === '' || TransactionAmount === '') {
    alert('Preenche tudo ai')
    return
  }

  const transaction = {
    id: generateID(),
    name: TransactionName,
    amount: Number(TransactionAmount)
  }

  transactions.push(transaction)
  init()
  updateLocalStorage()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
})