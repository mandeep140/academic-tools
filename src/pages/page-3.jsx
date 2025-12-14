import { FaFileAlt } from "react-icons/fa";
import { ImUpload2 } from "react-icons/im";
import { MdCallMerge } from "react-icons/md";
import { RiScissorsCutFill } from "react-icons/ri";
import { FaCompressAlt } from "react-icons/fa";
import { PiDotFill } from "react-icons/pi";
import { PDFDocument } from 'pdf-lib';

import ContainBtn from '../components/containBtn';
import React, { useState, useRef } from 'react';

export default function PdfTools() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [activeTool, setActiveTool] = useState('merge');
    const [processing, setProcessing] = useState(false);
    const [splitRange, setSplitRange] = useState('');
    const [pdfPreviews, setPdfPreviews] = useState([]);
    const [pageOrder, setPageOrder] = useState([]);
    const [draggedPage, setDraggedPage] = useState(null);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    // Validate PDF file
    const isValidPDF = (file) => {
        return file.type === 'application/pdf' && file.size <= 500 * 1024 * 1024;
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
    const handleFiles = async (files) => {
        const pdfFiles = files.filter(file => isValidPDF(file));
        
        if (pdfFiles.length > 0) {
            if (pdfFiles.length + selectedFiles.length > 20) {
                alert("Maximum 20 files allowed per session");
                return;
            }
            setSelectedFiles(prev => [...prev, ...pdfFiles]);
            
            // Generate previews for new files
            await generatePreviews(pdfFiles);
        } else {
            alert("Please select valid PDF files under 500MB");
        }
    };

    // Generate PDF previews
    const generatePreviews = async (files) => {
        const newPreviews = [];
        
        for (const file of files) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const pageCount = pdf.getPageCount();
                
                const filePreview = {
                    fileName: file.name,
                    pageCount: pageCount,
                    pages: []
                };
                
                // Create canvas previews for each page
                for (let i = 0; i < pageCount; i++) {
                    const singlePagePdf = await PDFDocument.create();
                    const [copiedPage] = await singlePagePdf.copyPages(pdf, [i]);
                    singlePagePdf.addPage(copiedPage);
                    
                    const pdfBytes = await singlePagePdf.save();
                    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    
                    filePreview.pages.push({
                        pageNum: i + 1,
                        fileIndex: selectedFiles.length + newPreviews.length,
                        url: url,
                        originalIndex: i
                    });
                }
                
                newPreviews.push(filePreview);
            } catch (error) {
                console.error('Error generating preview:', error);
            }
        }
        
        setPdfPreviews(prev => [...prev, ...newPreviews]);
        
        // Initialize page order for drag and drop
        const allPages = [...pdfPreviews, ...newPreviews].flatMap((preview, fileIdx) => 
            preview.pages.map(page => ({...page, fileIndex: fileIdx}))
        );
        setPageOrder(allPages);
    };

    // Handle button click
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Remove file from selection
    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPdfPreviews(prev => prev.filter((_, i) => i !== index));
        
        // Update page order
        const updatedOrder = pageOrder.filter(page => page.fileIndex !== index)
            .map(page => ({
                ...page,
                fileIndex: page.fileIndex > index ? page.fileIndex - 1 : page.fileIndex
            }));
        setPageOrder(updatedOrder);
    };

    // Drag and drop for pages
    const handlePageDragStart = (e, page, idx) => {
        setDraggedPage({ ...page, currentIndex: idx });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handlePageDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handlePageDrop = (e, targetPage, targetIdx) => {
        e.preventDefault();
        
        if (!draggedPage || draggedPage.currentIndex === targetIdx) {
            setDraggedPage(null);
            return;
        }
        
        const newOrder = [...pageOrder];
        const draggedIdx = draggedPage.currentIndex;
        
        // Remove from old position
        const [removed] = newOrder.splice(draggedIdx, 1);
        // Insert at new position
        newOrder.splice(targetIdx, 0, removed);
        
        setPageOrder(newOrder);
        setDraggedPage(null);
    };

    // Merge PDFs with custom page order
    const mergePDFs = async () => {
        if (selectedFiles.length < 2 && pageOrder.length < 2) {
            alert("Please select at least 2 PDF files to merge");
            return;
        }

        setProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            // If pages have been reordered, use custom order
            if (pageOrder.length > 0) {
                for (const pageInfo of pageOrder) {
                    const file = selectedFiles[pageInfo.fileIndex];
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await PDFDocument.load(arrayBuffer);
                    const [copiedPage] = await mergedPdf.copyPages(pdf, [pageInfo.originalIndex]);
                    mergedPdf.addPage(copiedPage);
                }
            } else {
                // Original merge logic
                for (const file of selectedFiles) {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await PDFDocument.load(arrayBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                }
            }

            const pdfBytes = await mergedPdf.save();
            downloadPDF(pdfBytes, 'merged.pdf');
            alert('✅ PDFs merged successfully!');
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Error merging PDFs. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    // Split PDF
    const splitPDF = async () => {
        if (selectedFiles.length !== 1) {
            alert("Please select exactly 1 PDF file to split");
            return;
        }

        if (!splitRange.trim()) {
            alert("Please enter page range (e.g., 1-3, 5, 7-9)");
            return;
        }

        setProcessing(true);
        try {
            const arrayBuffer = await selectedFiles[0].arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            // Parse page range
            const pages = parsePageRange(splitRange, totalPages);
            if (pages.length === 0) {
                alert("Invalid page range");
                setProcessing(false);
                return;
            }

            const newPdf = await PDFDocument.create();
            const copiedPages = await newPdf.copyPages(pdf, pages.map(p => p - 1));
            copiedPages.forEach((page) => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            downloadPDF(pdfBytes, `split_pages_${splitRange.replace(/[^0-9-]/g, '_')}.pdf`);
            alert(`✅ Extracted ${pages.length} page(s) successfully!`);
        } catch (error) {
            console.error('Error splitting PDF:', error);
            alert('Error splitting PDF. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    // Compress PDF
    const compressPDF = async () => {
        if (selectedFiles.length !== 1) {
            alert("Please select exactly 1 PDF file to compress");
            return;
        }

        setProcessing(true);
        try {
            const arrayBuffer = await selectedFiles[0].arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);

            // Basic compression by re-saving
            const pdfBytes = await pdf.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });

            const originalSize = selectedFiles[0].size;
            const compressedSize = pdfBytes.length;
            const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

            downloadPDF(pdfBytes, `compressed_${selectedFiles[0].name}`);
            alert(`✅ PDF compressed!\nOriginal: ${(originalSize / 1024).toFixed(2)} KB\nCompressed: ${(compressedSize / 1024).toFixed(2)} KB\nReduction: ${reduction}%`);
        } catch (error) {
            console.error('Error compressing PDF:', error);
            alert('Error compressing PDF. Please try again.');
        } finally {
            setProcessing(false);
        }
    };



    // Parse page range string
    const parsePageRange = (range, maxPages) => {
        const pages = new Set();
        const parts = range.split(',');

        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.includes('-')) {
                const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
                if (start > 0 && end <= maxPages && start <= end) {
                    for (let i = start; i <= end; i++) {
                        pages.add(i);
                    }
                }
            } else {
                const pageNum = parseInt(trimmed);
                if (pageNum > 0 && pageNum <= maxPages) {
                    pages.add(pageNum);
                }
            }
        }

        return Array.from(pages).sort((a, b) => a - b);
    };

    // Download PDF
    const downloadPDF = (pdfBytes, filename) => {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    // Process based on active tool
    const handleProcess = () => {
        switch (activeTool) {
            case 'merge':
                mergePDFs();
                break;
            case 'split':
                splitPDF();
                break;
            case 'compress':
                compressPDF();
                break;
            default:
                break;
        }
    };





    return (
        <div className="bg-two  pb-16  ">

            <div className="flex flex-col items-center justify-center py-10 px-4 pt-24 sm:pt-28 md:pt-36">
                <h2 className="mb-2 text-3xl sm:text-4xl md:text-5xl">PDF Tools</h2>
                <p className="mb-8 text-base sm:text-lg md:text-xl text-center max-w-2xl">Merge, split, compress, and protect your PDF files with professional tools.</p>



                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 w-full max-w-7xl">



                    {/* 1 */}
                    <div className="flex flex-col gap-6 w-full">


                        <div className="bg-green-100 p-4 sm:p-6 md:p-8 min-h-[60vh] lg:min-h-[78vh] w-full lg:w-3xl shadow-xl rounded-2xl overflow-hidden">
                            <h3 className="font-medium mb-4 flex items-center gap-2 text-lg sm:text-xl">
                                <span className="text-xl sm:text-2xl txtColor-Org"><FaFileAlt /></span> PDF Manager
                            </h3>

                            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-700">Upload your PDF files and choose from various processing options</p>



                            <div 
                                className={`border-2 border-dashed ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white/50'} 
                                rounded-xl py-8 flex flex-col items-center justify-center text-center 
                                hover:border-yellow-500 transition-all ${selectedFiles.length > 0 ? 'py-6' : ''}`}
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
                                        <div className="text-4xl sm:text-5xl md:text-6xl txtColor-Org mb-3"> <ImUpload2 /> </div>
                                        <p className="font-medium mb-2 text-sm sm:text-base">Upload PDF Files</p>
                                        <p className="m-2 sm:m-4 text-xs sm:text-sm">Drag and drop your PDF files here, or click to browse</p>

                                        <div className="py-2 sm:py-4">
                                            <ContainBtn 
                                                label="Choose PDF Files" 
                                                onClick={handleButtonClick}
                                            />
                                        </div>

                                        <p className="text-xs sm:text-sm mt-3 text-gray-600">
                                            PDF files up to 500MB • Multiple files supported
                                        </p>
                                    </>
                                ) : (
                                    <div className="w-full px-4">
                                        <div className="max-h-[25vh] overflow-y-auto mb-4 space-y-2">
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <FaFileAlt className="text-amber-500 text-xl flex-shrink-0" />
                                                        <div className="text-left flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate text-gray-800">
                                                                {file.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB • {pdfPreviews[index]?.pageCount || 0} pages
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFile(index)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors text-xl font-bold flex-shrink-0"
                                                        title="Remove file"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={handleButtonClick}
                                                className="text-amber-600 hover:text-amber-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors border-2 border-amber-300 hover:border-amber-400"
                                            >
                                                + Add More Files
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PDF Preview Section */}
                            {pdfPreviews.length > 0 && (
                                <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                            <span className="text-xl">📄</span>
                                            Page Preview & Reorder
                                        </h4>
                                        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                                            Drag to reorder
                                        </span>
                                    </div>
                                    
                                    <div className="max-h-[45vh] overflow-y-auto pr-2">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                            {pageOrder.map((page, idx) => (
                                                <div
                                                    key={`${page.fileIndex}-${page.pageNum}-${idx}`}
                                                    draggable
                                                    onDragStart={(e) => handlePageDragStart(e, page, idx)}
                                                    onDragOver={handlePageDragOver}
                                                    onDrop={(e) => handlePageDrop(e, page, idx)}
                                                    className={`relative group cursor-grab active:cursor-grabbing bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 transition-all duration-200 overflow-hidden
                                                        ${draggedPage?.currentIndex === idx 
                                                            ? 'border-amber-500 shadow-2xl scale-105 opacity-50' 
                                                            : 'border-gray-200 hover:border-amber-400 hover:shadow-lg'
                                                        }`}
                                                >
                                                    <div className="aspect-[3/4] bg-white flex items-center justify-center p-2">
                                                        <iframe
                                                            src={`${page.url}#toolbar=0&navpanes=0&scrollbar=0`}
                                                            className="w-full h-full border-0 pointer-events-none"
                                                            title={`Page ${page.pageNum}`}
                                                        />
                                                    </div>
                                                    
                                                    {/* Info overlay */}
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3 pt-6 sm:pt-8">
                                                        <p className="text-white font-bold text-xs sm:text-sm mb-0.5">
                                                            Page {page.pageNum}
                                                        </p>
                                                        <p className="text-gray-200 text-[9px] sm:text-[10px] truncate">
                                                            {pdfPreviews[page.fileIndex]?.fileName}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Position badge */}
                                                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-lg">
                                                        #{idx + 1}
                                                    </div>
                                                    
                                                    {/* Drag indicator */}
                                                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-700 text-[10px] sm:text-xs font-medium rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 shadow">
                                                        ⋮⋮
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                                        <p className="text-xs text-gray-600">
                                            <span className="font-semibold">{pageOrder.length}</span> page{pageOrder.length !== 1 ? 's' : ''} ready to process
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>




                    {/* 2 */}
                    <div className="flex flex-col gap-4 sm:gap-5 w-full lg:w-auto">


                        {/* Available Tools */}
                        <div className="bg-lime-100 rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-72">
                            <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">📂 Available Tools</h3>

                            <div className="space-y-2 sm:space-y-3">
                                <button 
                                    onClick={() => setActiveTool('merge')}
                                    className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                        activeTool === 'merge' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <MdCallMerge className="text-xl sm:text-2xl" />
                                        <div>
                                            <div className="font-semibold text-sm sm:text-base">Merge PDFs</div>
                                            <div className="text-[10px] sm:text-xs opacity-80">Combine multiple PDFs</div>
                                        </div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setActiveTool('split')}
                                    className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                        activeTool === 'split' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <RiScissorsCutFill className="text-xl sm:text-2xl" />
                                        <div>
                                            <div className="font-semibold text-sm sm:text-base">Split PDF</div>
                                            <div className="text-[10px] sm:text-xs opacity-80">Extract specific pages</div>
                                        </div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setActiveTool('compress')}
                                    className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                        activeTool === 'compress' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <FaCompressAlt className="text-xl sm:text-2xl" />
                                        <div>
                                            <div className="font-semibold text-sm sm:text-base">Compress</div>
                                            <div className="text-[10px] sm:text-xs opacity-80">Reduce file size</div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Tool Options */}
                        {activeTool === 'split' && (
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-72">
                                <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">✂️ Split Options</h3>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Page Range</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 1-3, 5, 7-9"
                                    value={splitRange}
                                    onChange={(e) => setSplitRange(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                />
                                <p className="text-xs text-gray-600 mt-2">
                                    Specify pages to extract (comma-separated)
                                </p>
                            </div>
                        )}

                        {/* Process Button */}
                        {selectedFiles.length > 0 && (
                            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-72">
                                <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg text-white">🚀 Ready to Process</h3>
                                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4">
                                    {selectedFiles.length} file(s) selected
                                </p>
                                <button
                                    onClick={handleProcess}
                                    disabled={processing}
                                    className="w-full bg-white text-amber-600 font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    {processing ? "Processing..." : `${activeTool === 'merge' ? '🔗 Merge' : activeTool === 'split' ? '✂️ Split' : '📦 Compress'} PDF${activeTool === 'merge' && selectedFiles.length > 1 ? 's' : ''}`}
                                </button>
                            </div>
                        )}



                        {/* File Limits */}
                        <div className="bg-lime-50 rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-72">
                            <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <PiDotFill className="text-xl sm:text-2xl txtColor-Org"/> 
                                <span>File Info</span>
                            </h3>

                            <ul className="text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500">•</span>
                                    <span>Max file size: 500MB</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500">•</span>
                                    <span>Format: PDF only</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500">•</span>
                                    <span>Max files: 20 per session</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500">•</span>
                                    <span>Processed locally in browser</span>
                                </li>
                            </ul>
                        </div>

                        {/* Security & Privacy */}
                        <div className="bg-lime-100 rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-72">
                            <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <PiDotFill className="text-xl sm:text-2xl txtColor-Org"/> 
                                <span>Security & Privacy</span>
                            </h3>

                            <ul className="text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>100% client-side processing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No files uploaded to servers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No data stored or tracked</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Your files never leave your device</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}