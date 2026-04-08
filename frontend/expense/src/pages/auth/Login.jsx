import React from 'react'
import expic from "../../assets/Pic1.jpg"
import { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import "./LogIn.css"
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

   const handlSubmit = async(e)=>{

    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5000/login', 
        {
        email, 
        password
        });
    console.log(response.data);
      const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuth", "true");
    navigate("/dashboard");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="sub">

    
      <div className="Login">
        
        <button className='btn_home'>
        <Link to="/dashboard">
          <span className="material-symbols-rounded">home</span>
        </Link></button>
        <img src={expic} alt="" />
        <form onSubmit={handlSubmit}>
          <div className="details">
              <h3>Welcome Back!</h3>
              <p>please enter your details to log in</p>
          </div>

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
          <button type='submit'>Log In</button>
          <Link to="/signup" className='link_reg'>Sign Up</Link>
        </form>
         
      </div>
   </div>
  )
}

export default Login
