import { useState } from 'react'
import './App.css'
import expenses from './assets/database/db.js'
import ListOfExpenses from './components/ListOfExpenses'
import NewExpenseForm from './components/NewExpenseForm'
import Header from './components/Header'

function App() {

  const [db, setDb] = useState(expenses)

  return (
    <>
      <Header />

      <NewExpenseForm db={db} setDb={setDb}/>

      <ListOfExpenses db={db} setDb={setDb}/>

    </>
  )
}

export default App
