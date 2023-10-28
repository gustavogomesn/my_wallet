import React from 'react'
import './style.css'


function ListOfExpenses({ db, setDb }) {



    const handleDeleteTaskClick = e => {
        const idToDelete = e.target.parentNode.id
        const updatedDb = db.filter(exp => {
            if (exp.id != idToDelete) {
                return exp
            }
        })

        setDb(updatedDb)
    }

    let brl = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    if (db.length == 0) {
        return <p className='no-expenses-message'>You don't have any expenses yet. Try add one!</p>
    } else {
        return (

            <ul>
                {
                    db.map(expense => {
                        return <li key={expense.id} id={expense.id}>
                            <div>
                                <span>
                                    {expense.description}, {brl.format(expense.totalValue)} {expense.hasInstallment ? "- Valor da parcela:  " + brl.format(expense.installmentValue) : ""}
                                </span>
                                <p className='date-of-expense'>{expense.date.toLocaleDateString()}</p>
                            </div>
                            <button className='delete-expense-button' onClick={handleDeleteTaskClick}>X</button>
                        </li>
                    })}
            </ul>
        )
    }
}

export default ListOfExpenses