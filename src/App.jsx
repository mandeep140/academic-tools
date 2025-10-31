import React from 'react'

import { Routes, Route } from "react-router-dom";
import NavBar from './components/navBar'

import Home from './routes/home';
import Tools from './routes/Tools';
import About from './routes/About';

import FileConverter from './routes/file-ConverterTool'
import ImgCompressor from './pages/page-2'
import PdfTools from './pages/page-3';

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
        <Route path='/ImageCompressor' element={<ImgCompressor />} ></Route>

        <Route path='/pdftools' element={<PdfTools />} />

      </Routes>


      <Footer />

    </>
  )
}

export default App