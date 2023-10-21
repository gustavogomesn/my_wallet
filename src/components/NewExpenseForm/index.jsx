import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './style.css'

function NewExpenseForm({ db, setDb }) {

    const [newExpense, setNewExpense] = useState({
        description: '',
        totalValue: '',
        hasInstallment: false,
        numberOfInstallments: 1,
    })

    const clearFields = () => {
        setNewExpense({
            description: '',
            totalValue: '',
            hasInstallment: false,
            numberOfInstallments: 1,
        })
    }

    const handleChangeEvent = e => {
        const { name, value } = e.target
        setNewExpense((prevState) => ({
            ...prevState,
            id: uuidv4(),
            date: Date.now(),
            [name]: (name == "hasInstallment") ? !prevState.hasInstallment : value, //If the field changed is 'hasInstallment', we invert the value.
        }))
    }

    const handleClick = e => {
        e.preventDefault()
        setDb([
            ...db,
            {
                ...newExpense,
                installmentValue: (newExpense.totalValue && newExpense.numberOfInstallments != 1) ? (newExpense.totalValue / newExpense.numberOfInstallments) : null
            }
        ])

        clearFields()
    }

    return (
        <form>
            <div className='new-expense-box'>
                <label>
                    <input type='text' placeholder="Description" value={newExpense.description} name='description' onChange={handleChangeEvent} />
                </label>
                <label>
                    <input type='number' placeholder='Value' name="totalValue" value={newExpense.totalValue} onChange={handleChangeEvent} />
                </label>
                <label className='checkbox-control'>
                    INSTALLMENTS
                    <input type='checkbox' name="hasInstallment" checked={newExpense.hasInstallment} onChange={handleChangeEvent} />
                </label>
                {newExpense.hasInstallment ?
                    <label>
                        <input type='number' name="numberOfInstallments" value={newExpense.numberOfInstallments} onChange={handleChangeEvent} />
                    </label>
                    : <></>
                }
                <button onClick={handleClick}>Create</button>
            </div>
            <div className='new-expense-box'>informations</div>
        </form>
    )
}

export default NewExpenseForm