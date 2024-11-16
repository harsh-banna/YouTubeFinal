import { useState } from 'react'
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Videos from './pages/Videos';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {


  return (
    <>
        <Outlet/>
    </>
  )
}

export default App
