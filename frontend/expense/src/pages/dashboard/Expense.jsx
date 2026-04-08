import React, { useState } from 'react'
import "./expense.css"
import axios from "axios"
function Expense() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("")
  const [message, setMessage] = useState("");

  const handelAddExpense = async(e)=>{
    e.preventDefault();
   try{ const response = await axios.post("http://localhost:5000/expense", {
      amount: Number(amount),
      category,
      date,
      note,
    },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }}  
 )
    
    setAmount("");
    setCategory("");
    setDate("")
    setNote("")
    setMessage("✅ Expense added successfully!");
    console.log(response);
  }catch(err){
    console.log(err.message);
    setMessage("❌ Failed to add expense.");
  }
  }
  return (
    <div className='expense'> 
    .
      <div className="add_expense">
        <form onSubmit={handelAddExpense}>
          <label >
            <h3>Amount</h3>
            <input type="number" 
              placeholder='your amount'
              value={amount}
              onChange={(e) =>{setAmount(e.target.value)}}
            />
          </label>
          <label >
            <h3>Category</h3>
            <select name="" id="Category" 
              value={category}
              onChange={(e) =>{setCategory(e.target.value)}}
            >
              <option value="Groceries">Groceries</option>
              <option value="Dinin">Dinin</option>
              <option value="Rent">Rent</option>
              <option value="Transport">Transport</option>
              <option value="Others">Others</option>
            </select>
          </label>

          <label >
            <h3>Date</h3>
            <input type="date" 
              value={date}
              onChange={(e) =>{setDate(e.target.value)}}/>
          </label>
          <label >
            <h3>Note(optional)</h3>
            <input
             type="text" 
             placeholder='Write something...' 
             value={note}
             onChange={(e) => {setNote(e.target.value)}}
             />
          </label>
          <div className="btn-pack">
          <button type='submit' className='add_btn'>
            <span className='material-symbols-rounded'>add_circle</span>
            ADD</button>
            <button type='button'className='cnl-btn'>
            <span className='material-symbols-rounded'>do_not_disturb_on</span>
            Cancel</button></div>
        </form>
      </div>
    </div>
  )
}

export default Expense
