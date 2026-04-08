import React from 'react'
import expic from "../../assets/Pic1.jpg"
import { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import axios from "axios"
import "./LogIn.css"

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername]  = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlSubmit = async()=>{
    try{
      const response = await axios.post('http://localhost:5000/signup', 
        {username,
        email, 
        password
        });
      
        const token = response.data;
        localStorage.setItem("token", token);
       navigate('/login')
    }catch(err){
      console.log(err)
    }
    
 
      }
  return (
    <div className="sub">
      <div className="Login">
        <button className='btn_home'>
          <Link to="/dashboard">
                  <span class="material-symbols-rounded">home</span>
          </Link></button>
        <img src={expic} alt="" />
        <form onSubmit={handlSubmit} 
        className='signUp'>
          <div className="details">
              <h3>Welcome!</h3>
              <p>please enter your details to Sign Up</p>
          </div>

          <input type="text"
              placeholder='Enter your userName'
              value = {username}
              onChange={({target}) => setUsername(target.value)}
          />
          <input type="email"
              placeholder='Enter your email'
              value = {email}
              onChange={({target}) => setEmail(target.value)}
          />

          <input type="password"
              placeholder='entre your password'
              value={password}
              onChange={({target}) => setPassword(target.value)}
          />
          <button type='submit'>Sign Up</button>
          <Link to="/login" className='link_reg'>Login</Link>
        </form>
         
      </div>
   </div>
  )
}

export default SignUp
