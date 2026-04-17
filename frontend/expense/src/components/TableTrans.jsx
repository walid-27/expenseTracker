import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import "./table.css"
function TableTrans() {

   const [expenses, setExpenses] = useState([])

useEffect(() => {
  const hello = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenselist", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
      setExpenses(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  hello()
}, [])

  return (
    <div className='tb'>
        <h1>Recent Transactions</h1>
     <table>
  <thead>
    <tr className="act">
      <th>Date</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Notes</th>
      <th>Payment</th>
      <th>Actions</th>
    </tr>
  </thead>

<tbody>
  {expenses.map((expense) => (
    <tr key={expense._id}>
      <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
      <td>${expense.amount}</td>
      <td>{expense.category}</td>
      <td>{expense.note?expense.note : "/"} </td>
      <td>Cash</td>
      <td>
        <button>Edit </button>
        <span>/</span> 
        <button>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
    </div>
  )
}

export default TableTrans
