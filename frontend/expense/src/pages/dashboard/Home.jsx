import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import NavBar from '../../components/layout/NavBar'
import BoxDashboard from '../../components/BoxDashboard'
import ChartDetails from "../../components/ChartDetails"
import TableTrans from '../../components/TableTrans'
import "./Home.css"
function Home() {
  const [spend, setSpend] = useState("0"); 
  const [expData, setExpData] = useState([]); 
  const [active, setActive] = useState(true);
  const [budget, setBudget] = useState();
 useEffect(() => {

  const eventExpense = async () => {
    try {

      const token = localStorage.getItem("token");

const response = await axios.get("http://localhost:5000/expenselist", {
  //authorization with use the token
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      const expenses = response.data
      setExpData(expenses);
      let total = 0

      expenses.forEach((item)=>{
        total += item.amount
      })

      setSpend(total)

    } catch (err) {
     
      console.log(err.message)
    }
  }

  eventExpense()

}, [])


  const handelBudget = ()=>{
    setActive(true);
    console.log("da")
  }
  return (
    <div>
      <div className="dashboard">
        <h1>DASHBOARD</h1>
        <div className="boxsDash">
          
          <BoxDashboard name="Monthly Spending" sallery={spend + "$"} deatil="avrage per month" span={<Link to="/expense"><span className="material-symbols-rounded">bar_chart</span></Link>}></BoxDashboard>
          <BoxDashboard name="Budget Remaining" sallery={spend + "$ to "+ budget}  deatil="remaining" span={<span className="material-symbols-rounded" onClick={handelBudget} >account_balance_wallet</span>}></BoxDashboard>
          <BoxDashboard name="Monthly Budget" sallery="42300$ of 50000$ used" deatil="remaining" span={<span className="material-symbols-rounded">account_balance_wallet</span>}></BoxDashboard>
          {active && (
            
            <form className='budget_rem_form' onSubmit={ ()=>{
              setActive(false)
            }
              
            }>
              <h3 onClick={()=>{setActive(false)}}>X</h3>
              <h2>ADD YOUR BUDGET</h2>
              <input type="number"
              onChange={(e)=>{setBudget(e.target.value)}} 
              value={budget}/>
              <button type='Submit'>Add Budget</button>
            </form>
          ) }
        </div>
       
         <ChartDetails data={expData}></ChartDetails></div>
         <TableTrans></TableTrans>
      
    </div>
  )
}

export default Home
