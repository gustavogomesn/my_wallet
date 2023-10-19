import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

function NewExpenseForm({db, setDb}) {

  const [newExpense, setNewExpense] = useState({
        id: '',
        date: Date.now(),
        description: "",
        totalValue: '',
        installment: true,
        numberOfInstallments: '',
        installmentValue: 100
  })

  const handleChangeEvent = e => {
    const {name, value} = e.target
    setNewExpense((prevState) => ({
      ...prevState,
      id: uuidv4(),
      [name]: value
    }))
  }

  const handleClick = e => {
    e.preventDefault()
    setDb([
      ...db,
      newExpense
    ])
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
          <input type='button'/>
        </div>
        <div>
          <label>Number of Installments</label>
          <input type='number' name="numberOfInstallments" value={newExpense.numberOfInstallments} onChange={handleChangeEvent}/>
        </div>
        <button onClick={handleClick}>Create expense</button>
      </form>
  )
}

export default NewExpenseForm