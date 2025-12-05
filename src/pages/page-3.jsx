import { FaFileAlt } from "react-icons/fa";
import { ImUpload2 } from "react-icons/im";
import { MdCallMerge } from "react-icons/md";
import { RiScissorsCutFill } from "react-icons/ri";
import { FaCompressAlt } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { PiDotFill } from "react-icons/pi";


import ContainBtn from '../components/containBtn';
import React, { useState, useRef } from 'react';

export default function PdfTools() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    // Validate PDF file
    const isValidPDF = (file) => {
        return file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024;
    };

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    // Common function to handle files
    const handleFiles = (files) => {
        const pdfFiles = files.filter(file => isValidPDF(file));
        
        if (pdfFiles.length > 0) {
            if (pdfFiles.length + selectedFiles.length > 20) {
                alert("Maximum 20 files allowed per session");
                return;
            }
            setSelectedFiles(prev => [...prev, ...pdfFiles]);
        } else {
            alert("Please select valid PDF files under 10MB");
        }
    };

    // Handle button click
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Remove file from selection
    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };





    return (
        <div className="bg-two  pb-16  ">

            <div className="flex flex-col items-center justify-center py-10 px-4  pt-28">
                <h2 className=" mb-2">PDF Tools </h2>
                <p className=" mb-8 text-lg"> Merge, split, compress, and protect your PDF files with professional tools. </p>



                <div className="flex   gap-8">



                    {/* 1 */}
                    <div className="flex flex-col  lg:flex-row gap-6  ">


                        <div className="bg-green-100  p-16  h-[78vh]  w-3xl   shadow-xl  rounded-2xl">
                            <h3 className=" font-medium mb-4 flex items-center gap-2 text-xl">
                                <span className=" text-2xl txtColor-Org">  <FaFileAlt /> </span>  PDF Manager
                            </h3>

                            <p className=" mb-4"> Upload your PDF files and choose from various processing options </p>



                            <div 
                                className={`border-2 border-dashed ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'} 
                                rounded-md py-10 flex flex-col items-center justify-center text-center 
                                hover:border-yellow-500 transition ${selectedFiles.length > 0 ? 'h-[80%]' : ''}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    multiple
                                />

                                {selectedFiles.length === 0 ? (
                                    <>
                                        <div className="text-6xl txtColor-Org mb-3"> <ImUpload2 /> </div>
                                        <p className="font-medium mb-2">Upload PDF Files</p>
                                        <p className="m-4">Drag and drop your PDF files here, or click to browse</p>

                                        <div className="py-4">
                                            <ContainBtn 
                                                label="Choose PDF Files" 
                                                onClick={handleButtonClick}
                                            />
                                        </div>

                                        <p className="text-sm mt-3">
                                            Supports multiple PDFs · Max 10MB per file
                                        </p>
                                    </>
                                ) : (
                                    <div className="w-full">
                                        <div className="max-h-[40vh] overflow-y-auto mb-4">
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg mb-2 shadow-sm">
                                                    <div className="flex items-center">
                                                        <FaFileAlt className="text-yellow-500 mr-3" />
                                                        <div className="text-left">
                                                            <p className="font-medium text-sm truncate max-w-[200px]">
                                                                {file.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFile(index)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 justify-center">
                                            <ContainBtn 
                                                label="Add More Files" 
                                                onClick={handleButtonClick}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>




                    {/* 2 */}
                    <div className="flex flex-col gap-5  ">


                        {/* Available Tools */}
                        <div className="bg-lime-100 rounded-lg shadow p-5  w-64">
                            <h3 className="font-bold mb-3 ">Available Tools</h3>

                            <ul className="text-sm  space-y-4">
                                <li > <MdCallMerge className="text-2xl   txtColor-Org " />  <span className="font-medium   "> Merge PDFs</span> <br />Combine multiple PDFs into one</li>
                                <li > <span className="font-medium   "> <RiScissorsCutFill className="text-2xl  txtColor-Org" />  Split PDF</span> <br />Extract specific pages or ranges</li>
                                <li> <span className="font-medium "> < FaCompressAlt className="text-2xl  txtColor-Org" />  Compress</span> <br />Reduce file size efficiently</li>
                                <li> <span className="font-medium" > <IoIosLock className="text-2xl  txtColor-Org" />  Password Protect</span> <br />Add security to your PDFs</li>
                            </ul>

                        </div>



                        {/* File Limits */}
                        <div className="bg-lime-50   rounded-lg shadow-xl p-5  w-64">
                            <h3 className="font-semibold mb-3 flex"> <PiDotFill className="text-2xl txtColor-Org "/> File Limits</h3>


                            <ul className="text-sm  space-y-1">
                                <li>• Maximum file size: 10MB</li>
                                <li>• Supported format: PDF only</li>
                                <li>• Maximum files: 20 per session</li>
                                <li>• Processing time: 1–5 minutes</li>
                            </ul>

                        </div>


                        {/* Security & Privacy */}
                        <div className="bg-lime-100 rounded-lg shadow p-5  w-64">
                            <h3 className="font-semibold mb-3 flex "> <PiDotFill className="text-2xl txtColor-Org "/> Security & Privacy</h3>

                            <ul className="text-sm space-y-1">
                                <li>• Files processed locally when possible</li>
                                <li>• No files stored on servers</li>
                                <li>• Automatic deletion after processing</li>
                                <li>• SSL encrypted transfers</li>
                            </ul>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}