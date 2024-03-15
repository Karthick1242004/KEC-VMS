import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signin from './components/Signin';
import Dash from './Dash';
import { ToastContainer } from 'react-toastify';
import Addinfo from './components/Addinfo';
import Driver from './Driver';
import Tamil from './Tamil';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route path='Signin' element={<Signin/>}/>
        <Route path='Tamil' element={<Tamil/>}/>
        <Route path='Dash' element={<Dash/>}/>
        <Route path='Addinfo' element={<Addinfo/>}/>
        <Route path='Driver' element={<Driver/>}/>
      </Routes>
    </div>
  )
}

export default App