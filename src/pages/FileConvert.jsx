import ContainBtn from "../components/containBtn"
import { MdOutlineUpload } from "react-icons/md";
import { FaDownload, FaFileAlt, FaExchangeAlt } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import React, { useState, useRef } from 'react';

export default function FileConvert() {
    const [file, setFile] = useState(null);
    const [convertTo, setConvertTo] = useState('');
    const [processing, setProcessing] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('image');
    
    const fileInputRef = useRef(null);
    const conversionOptions = {
        image: [
            { from: 'jpg', to: 'png', label: 'JPG to PNG' },
            { from: 'png', to: 'jpg', label: 'PNG to JPG' },
            { from: 'png', to: 'webp', label: 'PNG to WebP' },
            { from: 'jpg', to: 'webp', label: 'JPG to WebP' },
            { from: 'heic', to: 'jpg', label: 'HEIC to JPG' },
        ],
        pdf: [
            { from: 'image', to: 'pdf', label: 'Image to PDF' },
            { from: 'pdf', to: 'docx', label: 'PDF to DOCX' },
            { from: 'pdf', to: 'images', label: 'PDF to Images' },
        ],
        document: [
            { from: 'docx', to: 'html', label: 'DOCX to HTML' },
            { from: 'docx', to: 'pdf', label: 'DOCX to PDF' },
            { from: 'html', to: 'docx', label: 'HTML to DOCX' },
        ],
        excel: [
            { from: 'xlsx', to: 'json', label: 'XLSX to JSON' },
            { from: 'json', to: 'xlsx', label: 'JSON to XLSX' },
            { from: 'csv', to: 'xlsx', label: 'CSV to XLSX' },
            { from: 'xlsx', to: 'csv', label: 'XLSX to CSV' },
        ],
        video: [
            { from: 'mp4', to: 'webm', label: 'MP4 to WebM' },
            { from: 'webm', to: 'mp4', label: 'WebM to MP4' },
            { from: 'video', to: 'audio', label: 'Video to Audio' },
        ],
        audio: [
            { from: 'mp3', to: 'wav', label: 'MP3 to WAV' },
            { from: 'wav', to: 'mp3', label: 'WAV to MP3' },
            { from: 'aac', to: 'mp3', label: 'AAC to MP3' },
        ],
    };

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setConvertedFile(null);
            setConvertTo('');
            
            // Auto-detect file category
            const fileName = uploadedFile.name.toLowerCase();
            const fileType = uploadedFile.type.toLowerCase();
            
            if (fileName.match(/\.(jpg|jpeg|png|webp|heic|gif|bmp)$/i) || fileType.startsWith('image/')) {
                setSelectedCategory('image');
            }
            else if (fileName.endsWith('.pdf') || fileType === 'application/pdf') {
                setSelectedCategory('pdf');
            }
            else if (fileName.match(/\.(docx|doc|html|htm)$/i) || 
                     fileType.includes('wordprocessingml') || 
                     fileType.includes('msword') ||
                     fileType === 'text/html') {
                setSelectedCategory('document');
            }
            else if (fileName.match(/\.(xlsx|xls|csv|json)$/i) || 
                     fileType.includes('spreadsheetml') || 
                     fileType.includes('ms-excel') ||
                     fileType === 'text/csv' ||
                     fileType === 'application/json') {
                setSelectedCategory('excel');
            }
            else if (fileName.match(/\.(mp4|webm|avi|mov|mkv)$/i) || fileType.startsWith('video/')) {
                setSelectedCategory('video');
            }
            else if (fileName.match(/\.(mp3|wav|aac|ogg|flac)$/i) || fileType.startsWith('audio/')) {
                setSelectedCategory('audio');
            }
            else {
                setSelectedCategory('image'); // default
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleConvert = async () => {
        if (!file || !convertTo) {
            alert('Please select a file and conversion format');
            return;
        }

        setProcessing(true);

        try {
            let convertedBlob = null;
            let fileName = `converted.${convertTo}`;

            // Image conversions
            if (selectedCategory === 'image') {
                convertedBlob = await convertImage(file, convertTo);
            }
            // Excel conversions
            else if (selectedCategory === 'excel') {
                const result = await convertExcel(file, convertTo);
                convertedBlob = result.blob;
                fileName = result.name;
            }
            // PDF conversions
            else if (selectedCategory === 'pdf' && convertTo === 'docx') {
                const result = await convertPdfToDocx(file);
                convertedBlob = result.blob;
                fileName = result.name;
            }
            // Other formats - show not implemented message
            else {
                throw new Error(`${selectedCategory} conversion not yet implemented. Coming soon!`);
            }

            if (convertedBlob) {
                const url = URL.createObjectURL(convertedBlob);
                setConvertedFile({
                    url,
                    name: fileName,
                    blob: convertedBlob
                });
            }

            setProcessing(false);
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Conversion failed: ' + error.message);
            setProcessing(false);
        }
    };

    const convertImage = async (file, targetFormat) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    
                    ctx.drawImage(img, 0, 0);
                    
                    let mimeType = 'image/png';
                    if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
                        mimeType = 'image/jpeg';
                    } else if (targetFormat === 'webp') {
                        mimeType = 'image/webp';
                    }
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to convert image'));
                        }
                    }, mimeType, 0.95);
                };
                
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    };

    const convertExcel = async (file, targetFormat) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    // Import SheetJS dynamically
                    const XLSX = await import('xlsx');
                    
                    if (targetFormat === 'json') {
                        // Excel to JSON
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                        
                        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { 
                            type: 'application/json' 
                        });
                        resolve({ blob, name: 'converted.json' });
                    } 
                    else if (targetFormat === 'csv') {
                        // Excel to CSV
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                        const csvData = XLSX.utils.sheet_to_csv(firstSheet);
                        
                        const blob = new Blob([csvData], { type: 'text/csv' });
                        resolve({ blob, name: 'converted.csv' });
                    }
                    else if (targetFormat === 'xlsx') {
                        // CSV or JSON to Excel
                        let workbook;
                        
                        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                            const text = new TextDecoder().decode(e.target.result);
                            workbook = XLSX.read(text, { type: 'string' });
                        } else {
                            const text = new TextDecoder().decode(e.target.result);
                            const jsonData = JSON.parse(text);
                            const worksheet = XLSX.utils.json_to_sheet(jsonData);
                            workbook = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                        }
                        
                        const excelBuffer = XLSX.write(workbook, { 
                            bookType: 'xlsx', 
                            type: 'array' 
                        });
                        const blob = new Blob([excelBuffer], { 
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                        });
                        resolve({ blob, name: 'converted.xlsx' });
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    };

    // PDF to DOCX conversion
    const convertPdfToDocx = async (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Import required libraries
                const pdfjsLib = await import('pdfjs-dist');
                const { Document, Packer, Paragraph, TextRun } = await import('docx');
                pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
                
                const reader = new FileReader();
                
                reader.onload = async (e) => {
                    try {
                        const typedArray = new Uint8Array(e.target.result);
                        const pdf = await pdfjsLib.getDocument(typedArray).promise;
                        
                        const paragraphs = [];
                        
                        // Extract text from each page
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const textContent = await page.getTextContent();
                            const pageText = textContent.items.map(item => item.str).join(' ');
                            
                            if (pageText.trim()) {
                                paragraphs.push(
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: pageText,
                                                size: 24,
                                            })
                                        ],
                                        spacing: { after: 200 }
                                    })
                                );
                            }
                            
                            // Add page break after each page except the last
                            if (i < pdf.numPages) {
                                paragraphs.push(
                                    new Paragraph({
                                        text: '',
                                        pageBreakBefore: true
                                    })
                                );
                            }
                        }
                        
                        // Create DOCX document
                        const doc = new Document({
                            sections: [{
                                properties: {},
                                children: paragraphs
                            }]
                        });
                        
                        // Generate DOCX file
                        const blob = await Packer.toBlob(doc);
                        resolve({ blob, name: 'converted.docx' });
                        
                    } catch (error) {
                        reject(new Error('Failed to convert PDF: ' + error.message));
                    }
                };
                
                reader.onerror = () => reject(new Error('Failed to read PDF file'));
                reader.readAsArrayBuffer(file);
                
            } catch (error) {
                reject(new Error('Failed to load PDF libraries: ' + error.message));
            }
        });
    };

    const handleDownload = () => {
        if (!convertedFile) return;
        
        const link = document.createElement('a');
        link.href = convertedFile.url;
        link.download = convertedFile.name;
        link.click();
    };

    const resetAll = () => {
        setFile(null);
        setConvertTo('');
        setConvertedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="bg-two pt-36 pb-16">
            <div className="text-center mb-8">
                <h2>File Converter</h2>
                <p className="p-3 text-xl pb-8">Convert your files to different formats easily</p>
            </div>

            <div className="flex gap-8 justify-center px-4">
                {/* Left Panel - Upload & Options */}
                <div className="space-y-4 w-96">
                    {/* Upload Section */}
                    <div className="p-6 rounded-2xl shadow-xl bg-lime-100">
                        <h3 className="font-semibold text-gray-800 text-xl mb-4">Upload File</h3>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        
                        <ContainBtn 
                            Icon={<MdOutlineUpload className="text-2xl"/>} 
                            label="Choose File"
                            onClick={handleButtonClick}
                        />

                        {file && (
                            <div className="mt-4 p-3 bg-white rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FaFileAlt className="text-amber-500" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Category Selection */}
                    {file && (
                        <div className="p-6 rounded-2xl shadow-xl bg-green-100">
                            <h3 className="font-semibold text-gray-800 text-xl mb-4">📂 File Type</h3>
                            
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(conversionOptions).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setConvertTo('');
                                        }}
                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                                            selectedCategory === category 
                                                ? 'bg-amber-500 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-amber-50'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Conversion Options */}
                    {file && selectedCategory && (
                        <div className="p-6 rounded-2xl shadow-xl bg-lime-50">
                            <h3 className="font-semibold text-gray-800 text-lg mb-4">🔄 Convert To</h3>
                            
                            <div className="space-y-2">
                                {conversionOptions[selectedCategory].map((option) => (
                                    <button
                                        key={option.label}
                                        onClick={() => setConvertTo(option.to)}
                                        className={`w-full text-left p-3 rounded-lg transition-all ${
                                            convertTo === option.to 
                                                ? 'bg-amber-500 text-white shadow-md' 
                                                : 'bg-white hover:bg-amber-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaExchangeAlt className="text-lg" />
                                            <div className="font-medium">{option.label}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Convert Button */}
                    {file && convertTo && (
                        <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-amber-400 to-orange-500">
                            <button
                                onClick={handleConvert}
                                disabled={processing}
                                className="w-full bg-white text-amber-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <FaExchangeAlt />
                                        Convert File
                                    </>
                                )}
                            </button>

                            <button
                                onClick={resetAll}
                                className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Panel - Preview/Download */}
                <div className="p-6 w-2/3 rounded-2xl shadow-2xl bg-green-100">
                    <h3 className="font-bold text-gray-800 text-3xl p-2">Result</h3>
                    <p className="mb-4">
                        {convertedFile ? 'Your file is ready to download' : 'Upload a file and select conversion format'}
                    </p>

                    <div className="border-2 border-dashed border-yellow-100 rounded-xl overflow-hidden bg-white/50 relative"
                         style={{ minHeight: '500px' }}>
                        {!file ? (
                            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                                <div className="text-6xl text-yellow-600 mb-4"><IoImageOutline /></div>
                                <h3 className="p-3">No file selected</h3>
                                <p className="text-sm">Click "Choose File" to upload a file for conversion</p>
                            </div>
                        ) : processing ? (
                            <div className="flex flex-col items-center justify-center h-full p-12">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mb-4"></div>
                                <p className="text-lg font-semibold text-amber-600">Converting your file...</p>
                                <p className="text-sm text-gray-600 mt-2">Please wait</p>
                            </div>
                        ) : convertedFile ? (
                            <div className="flex flex-col items-center justify-center h-full p-12">
                                <div className="text-6xl text-green-600 mb-4">✓</div>
                                <h3 className="p-3 text-2xl font-bold text-green-600">Conversion Successful!</h3>
                                <p className="text-sm text-gray-600 mb-6">Your file has been converted to {convertTo.toUpperCase()}</p>
                                
                                <button
                                    onClick={handleDownload}
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
                                >
                                    <FaDownload className="text-xl" />
                                    Download Converted File
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                                <FaFileAlt className="text-6xl text-amber-500 mb-4" />
                                <h3 className="p-3">File Ready</h3>
                                <p className="text-sm text-gray-600">Select a conversion format and click "Convert File"</p>
                                <div className="mt-4 p-4 bg-white rounded-lg">
                                    <p className="font-medium">{file.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
