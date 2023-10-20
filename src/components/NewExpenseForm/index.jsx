import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

function NewExpenseForm({db, setDb}) {

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
    const {name, value} = e.target
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
        <div>
          <label>Description</label>
          <input type='text' value={newExpense.description} name='description' onChange={handleChangeEvent}/>
        </div>
        <div>
          <label>Value</label>
          <input type='number' name="totalValue" value={newExpense.totalValue} onChange={handleChangeEvent}/>
        </div>
        <div>
          <label>Installments</label>
          <input type='checkbox' name="hasInstallment" checked={newExpense.hasInstallment} onChange={handleChangeEvent}/>
        </div>
        {newExpense.hasInstallment ? 
        <div>
          <label>Number of Installments</label>
          <input type='number' name="numberOfInstallments" value={newExpense.numberOfInstallments} onChange={handleChangeEvent}/>
        </div>
        : <></>
      }
        <button onClick={handleClick}>Create expense</button>
      </form>
  )
}

export default NewExpenseForm