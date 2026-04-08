import React from 'react'
import "./BoxDashboard.css"
function BoxDashboard(prop) {
  return (
    <div className='boxDash'>
     <div className="info">
         <p>{prop.name}</p>
      <h3>{prop.sallery}</h3>
      <p>{prop.deatil}</p>
      
     </div>
        {prop.span}
    </div>
  )
}

export default BoxDashboard
