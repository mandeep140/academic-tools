

import { ImUpload2 } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import ContainBtn from '../components/containBtn';
import React, { useState, useRef } from "react";

export default function ImageCompressor() {
    const [quality, setQuality] = useState(80);
    const [resize, setResize] = useState(false);
    const [maxWidth, setMaxWidth] = useState(1920);
    const [maxHeight, setMaxHeight] = useState(1080);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [stats, setStats] = useState(null);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidImage(file)) {
            setSelectedFile(file);
            setStats(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (JPEG, PNG, WebP) under 50MB");
        }
    };

    // Validate image file
    const isValidImage = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
    };

    // Handle button click
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file && isValidImage(file)) {
            setSelectedFile(file);
            setStats(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (JPEG, PNG, WebP) under 50MB");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Compress and/or resize image
    const processImage = async () => {
        if (!selectedFile) return;
        
        setProcessing(true);
        setStats(null);
        
        try {
            const img = new Image();
            img.src = preview;
            
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            const canvas = document.createElement('canvas');
            let finalWidth = img.width;
            let finalHeight = img.height;

            // Apply resize if enabled
            if (resize && (img.width > maxWidth || img.height > maxHeight)) {
                const widthRatio = maxWidth / img.width;
                const heightRatio = maxHeight / img.height;
                const ratio = Math.min(widthRatio, heightRatio);
                
                finalWidth = Math.round(img.width * ratio);
                finalHeight = Math.round(img.height * ratio);
            }

            canvas.width = finalWidth;
            canvas.height = finalHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

            // Force JPEG for compression (quality parameter works better with JPEG)
            // Use original type only if it's already JPEG
            const qualityValue = quality / 100;
            let outputFormat = 'image/jpeg';
            
            // If original is PNG and quality is high (>90), keep as PNG
            if (selectedFile.type === 'image/png' && quality > 90) {
                outputFormat = 'image/png';
            }
            
            const compressedDataUrl = canvas.toDataURL(outputFormat, qualityValue);

            // Calculate sizes more accurately
            const originalSize = selectedFile.size;
            const base64Length = compressedDataUrl.split(',')[1].length;
            const compressedSize = Math.round((base64Length * 3) / 4);
            const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
            
            // Set stats for display
            setStats({
                originalSize: (originalSize / 1024).toFixed(2),
                compressedSize: (compressedSize / 1024).toFixed(2),
                reduction: reduction,
                originalDimensions: `${img.width} x ${img.height}`,
                newDimensions: `${finalWidth} x ${finalHeight}`
            });
            
            // Download
            const link = document.createElement('a');
            const fileExtension = outputFormat === 'image/jpeg' ? 'jpg' : 'png';
            link.download = `compressed_${Date.now()}.${fileExtension}`;
            link.href = compressedDataUrl;
            link.click();
            
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing image. Please try again.');
        } finally {
            setProcessing(false);
        }
    };



    
    return (
        <div className="min-h-screen bg-two pb-28 flex flex-col items-center justify-center ">

            <div className="text-center mb-10  pt-32">
                <h2> Image Compressor & Resizer </h2>
                <p className=" mt-3 max-w-2xl">
                    Compress and resize your images to reduce file size while maintaining
                    quality. Perfect for web optimization and storage.
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl px-4">
                {/* Left Panel - Settings */}
                <div className="bg-lime-100 shadow-lg rounded-2xl p-6 w-full lg:w-80 hover:shadow-xl transition-shadow">

                    <div className="flex items-center gap-2 mb-3">
                        <span className="txtColor-Org text-2xl"> <IoSettingsOutline /> </span>
                        <h3 className="font-semibold text-gray-800 text-lg">Settings</h3>
                    </div>

                    <p className="text-md  mb-4"> Configure compression options </p>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold text-sm mb-3">
                            Quality: {quality}%
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full h-2 accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>Lower size</span>
                            <span>Higher quality</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 pt-5 mt-5">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-gray-700 font-semibold text-sm">
                                Resize Image
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={resize}
                                    onChange={() => setResize(!resize)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-amber-500 transition-all"></div>
                                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
                            </label>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            resize ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="block text-gray-700 font-medium text-sm mb-2">
                                        Max Width: {maxWidth}px
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        step="50"
                                        value={maxWidth}
                                        onChange={(e) => setMaxWidth(Number(e.target.value))}
                                        className="w-full h-2 accent-amber-500 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium text-sm mb-2">
                                        Max Height: {maxHeight}px
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        step="50"
                                        value={maxHeight}
                                        onChange={(e) => setMaxHeight(Number(e.target.value))}
                                        className="w-full h-2 accent-amber-500 cursor-pointer"
                                    />
                                </div>
                                <p className="text-xs text-gray-600 italic">
                                    Aspect ratio will be maintained automatically
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Panel - Image Compressor */}
                <div className="bg-green-100 shadow-lg rounded-2xl p-8 w-full lg:flex-1 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="txtColor-Org text-3xl"><MdOutlinePhotoLibrary /></span>
                        <h3 className="font-bold text-gray-800 text-xl">
                            Image Compressor
                        </h3>
                    </div>

                    <div 
                        className="border-2 border-dashed border-yellow-400 rounded-xl p-12 mt-8 pb-16 bg-white/50
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 hover:bg-yellow-50/50 transition-all"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {!selectedFile ? (
                            <>
                                <div className="text-yellow-500 text-6xl mb-3"> <ImUpload2 /> </div>
                                <h3 className="text-gray-800 font-medium text-lg">
                                    Upload Image
                                </h3>
                                <p className="text-sm mt-6">
                                    Drag and drop your image here, or click to browse
                                </p>

                                <div className="py-7">
                                    <ContainBtn label="Choose Image" onClick={handleButtonClick} />
                                </div>

                                <p className="text-xs text-gray-600">
                                    Supports JPEG, PNG, WebP formats • Max 50MB per image
                                </p>
                            </>
                        ) : (
                            <div className="w-full">
                                <div className="mb-6">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="max-w-full max-h-[300px] mx-auto rounded-lg shadow-lg border-2 border-gray-200"
                                    />
                                </div>
                                
                                <div className="bg-white/70 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        📁 {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Original Size: {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                    
                                    {stats && (
                                        <div className="mt-4 pt-4 border-t border-gray-300">
                                            <p className="text-sm font-bold text-green-600 mb-2">✅ Processing Complete!</p>
                                            <div className="space-y-1 text-xs text-gray-700">
                                                <p>📏 Dimensions: {stats.originalDimensions} → {stats.newDimensions}</p>
                                                <p>💾 Compressed Size: {stats.compressedSize} KB</p>
                                                <p className="font-semibold text-green-600">
                                                    📉 Reduction: {stats.reduction}%
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex gap-3 justify-center flex-wrap">
                                    <ContainBtn 
                                        label={processing ? "Processing..." : "Process Image"} 
                                        onClick={processImage}
                                        disabled={processing}
                                    />
                                    <ContainBtn 
                                        label="Choose Another" 
                                        onClick={handleButtonClick}
                                        disabled={processing}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
