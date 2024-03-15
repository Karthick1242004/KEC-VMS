import React from 'react';
import './Signin.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signin= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kec-vms.onrender.com/login', { username, password });
      
      if(response.status === 200){ 
        toast.success('Logined successfully!');
        console.log(response.data);
        setTimeout(()=>{
          window.location.href = '/Dash';
        },500)
       
      }
      else
      {
        throw new Error('Login faild')
      }
    } catch (error) {
      toast.error('Failed to Login. Contact administration.');
      console.error('Login failed:', error);
      console.log(response.data);
      // Handle login error
    }
  };

  return (
    <div className="outerform">
    <form className="form" onSubmit={handleSubmit}>
      <div className="header">
      <p className='title'>Sign In</p>
      <p className='description'>Please signin using your admin credentials</p>
      </div>
      <div className="flex-column">
        <label>Email</label>
      </div>
      <div className="inputForm">
        
        <input type='text' className="input" placeholder="Enter your Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="flex-column">
        <label>Password</label>
      </div>
      <div className="inputForm">
       
        <input type="password" className="input" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
      </div>

      <div className="flex-row">
       </div>
      <button className="button-submit">Sign In</button>
    </form>
    </div>
  );
};

export default Signin;
