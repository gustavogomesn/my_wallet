import React from 'react'
import './style.css'

function ListOfExpenses({ db }) {
    return (
        <ul>
            {db.map(expense => {
                return <li key={expense.id}>{expense.description}, R${expense.totalValue} {expense.hasInstallment ? "- Valor da parcela:  R$" + expense.installmentValue : ""}</li>
            })}
        </ul>
    )
}

export default ListOfExpenses