import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from '../pages/Home';
import Navbar from './Components/Navbar';
function App() {


  return (
    
   <div className='App'>
    <BrowserRouter>
    <Navbar/>
      <div className='pages'>
        <Routes>
          <Route path = "/" element={<Home/>}/>
        </Routes>
      </div>

    </BrowserRouter>
   </div>

   
  )
}

export default App
