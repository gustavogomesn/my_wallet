import React from 'react'

function ListOfExpenses({db}) {
  return (
    <ul>
        {db.map(expense => {
          return <li key={expense.id}>{expense.description}, {expense.totalValue} - {expense.hasInstallment ? "Sim, " + expense.installmentValue : "Não"}</li>
        })}
      </ul>
  )
}

export default ListOfExpenses