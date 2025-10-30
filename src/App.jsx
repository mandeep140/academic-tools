import React from 'react'

import { Routes, Route } from "react-router-dom";
import NavBar from './components/navBar'

import Home from './routes/home';
import Tools from './routes/Tools';
import About from './routes/About';

import FileConverter from './routes/file-ConverterTool'



import Footer from './components/footer'




const App = () => {
  return (
    <>

      <NavBar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/tools' element={<Tools />} />

        <Route path='/fileConverter' element={<FileConverter />} />

      </Routes>


      <Footer />

    </>
  )
}

export default App