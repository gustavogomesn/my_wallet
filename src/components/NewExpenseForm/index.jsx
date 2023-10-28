import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {addMonths} from 'date-fns'

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
            [name]: (name == "hasInstallment") ? !prevState.hasInstallment : value, //If the field changed is 'hasInstallment', we invert the value.
        }))
    }

    const handleClick = e => {
        e.preventDefault()

        const currentDate = new Date()

        const auxDb = [...db]
        for (let i = 0; i < newExpense.numberOfInstallments; i++) {

            // const plusCurrentDate = new Date(currentDate.setMonth(currentDate.getMonth() + i))
            const plusCurrentDate = addMonths(currentDate,  i)

            auxDb.push({
                ...newExpense,
                id: uuidv4(),
                date: plusCurrentDate,
                installmentValue: (newExpense.totalValue && newExpense.numberOfInstallments != 1) ? (newExpense.totalValue / newExpense.numberOfInstallments) : null
            })

        }
        setDb(auxDb)

        clearFields()
    }

    const [valueOfExpenses, setValueOfExpenses] = useState({
        totalAmount: 0,
        totalAmountOfInstallments: 0
    })

    useEffect(() => {
        totalValueOfExpenses()
    }, [db])

    const totalValueOfExpenses = () => {
        const sumWithInitial = db.reduce(function (accumulator = {}, exp = {}) {


            if (exp.installmentValue) {
                accumulator.subtotal += parseFloat(exp.installmentValue)
            }

            accumulator.total += parseFloat(exp.totalValue)

            return accumulator

        }, {
            subtotal: 0,
            total: 0
        })
        setValueOfExpenses(sumWithInitial)
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
                <button className='create-expense-button' onClick={handleClick}>Create</button>
            </div>
            <div className='new-expense-box'>
                <p>
                    Total value: {valueOfExpenses.total}
                </p>
                <p>
                    Installmentes: {valueOfExpenses.subtotal}
                </p>
            </div>
        </form>
    )
}

export default NewExpenseForm