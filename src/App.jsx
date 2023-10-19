import { useState } from 'react'
import './App.css'
import expenses from './assets/database/db.js'
import ListOfExpenses from './components/ListOfExpenses'
import NewExpenseForm from './components/NewExpenseForm'

function App() {

  const [db, setDb] = useState(expenses)

  return (
    <>
      <h1>This is my wallet</h1>

      <NewExpenseForm db={db} setDb={setDb}/>

      <hr></hr>

      <ListOfExpenses db={db}/>

    </>
  )
}

export default App
