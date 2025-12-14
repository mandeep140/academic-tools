import React from 'react'

import { Routes, Route } from "react-router-dom";
import NavBar from './components/navBar'

import Home from './routes/home';
import Tools from './routes/Tools';
import About from './routes/About';
import FileConvert from './pages/FileConvert';
import NotFound from './pages/not-found';


import ImgCompressor from './pages/page-2'
import PdfTools from './pages/page-3';
import ExcelFile from './pages/page-4';
import ImageEditor from './pages/page-5';

import CropAndEdit from './pages/page-6';
import ImageFormatConverter from './pages/page-7';
import BackgroundRemoval from './pages/page-8';
import PDFRenderAndView from './pages/page-9';
import DocsToHtml from './pages/page-10';

import Footer from './components/footer'




const App = () => {
  return (
    <>

      <NavBar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/tools' element={<Tools />} />


        <Route path='/ImageCompressor' element={<ImgCompressor />} ></Route>
        <Route path='/file-convert' element={<FileConvert />} ></Route>
        <Route path='/pdftools' element={<PdfTools />} />
        <Route path='/excelFile' element={<ExcelFile />} />
        <Route path='/imageEditor' element={<ImageEditor />} />

        <Route path='/CropAndEdit' element={< CropAndEdit />} />
        <Route path='/ImageFormatConverter ' element={< ImageFormatConverter />} />
        <Route path='/BgRemoval' element={< BackgroundRemoval />} />
        <Route path='/PdfRenderAndView' element={< PDFRenderAndView />} />
        <Route path='/DocsToHtml' element={< DocsToHtml />} />
        <Route path='*' element={< NotFound />} />

      </Routes>


      <Footer />

    </>
  );
}

export default App;