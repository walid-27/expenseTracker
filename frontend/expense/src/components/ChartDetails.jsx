import React from 'react'
import "./Chart.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from 'recharts';



function ChartDetails(props) {




  return (
    <div className='Chart '>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height="130%">
        <LineChart data={props.data} >
         
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
         
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDetails;