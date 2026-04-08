import React, { useState, useEffect } from 'react'
import axios from "axios"
import NavBar from '../../components/layout/NavBar'
import BoxDashboard from '../../components/BoxDashboard'
import ChartDetails from "../../components/ChartDetails"
import TableTrans from '../../components/TableTrans'
import "./Home.css"
function Home() {
  const [spend, setSpend] = useState("0"); 
  const [expData, setExpData] = useState([]); 
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
  return (
    <div>
      <div className="dashboard">
        <h1>DASHBOARD</h1>
        <div className="boxsDash">
          <BoxDashboard name="Monthly Spending" sallery={spend + "$"} deatil="avrage per month" span={<span className="material-symbols-rounded">bar_chart</span>}></BoxDashboard>
          <BoxDashboard name="Budget Remaining" sallery="7700$ to 5000$" deatil="remaining" span={<span className="material-symbols-rounded">account_balance_wallet</span>}></BoxDashboard>
          <BoxDashboard name="Savings Rate" sallery="15000$ / 20000$" deatil="remaining" span={<span className="material-symbols-rounded">account_balance_wallet</span>}></BoxDashboard>
          <BoxDashboard name="Budget Summary" sallery="2 of 5" deatil="remaining" span={<span className="material-symbols-rounded" >account_balance_wallet</span>}></BoxDashboard>
          <BoxDashboard name="Monthly Budget" sallery="42300$ of 50000$ used" deatil="remaining" span={<span className
          ="material-symbols-rounded">account_balance_wallet</span>}></BoxDashboard>
        </div>
       
         <ChartDetails data={expData}></ChartDetails></div>
         <TableTrans></TableTrans>
      
    </div>
  )
}

export default Home
