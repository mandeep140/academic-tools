

import { ImUpload2 } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import ContainBtn from '../components/containBtn';
import React, { useState, useRef, useEffect } from "react";

export default function ImageCompressor() {
    const [quality, setQuality] = useState(80);
    const [resize, setResize] = useState(false);
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [aspectRatio, setAspectRatio] = useState(true);
    const [btnclick, setBtnClick] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidImage(file)) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (JPEG, PNG, WebP) under 10MB");
        }
    };

    // Validate image file
    const isValidImage = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (JPEG, PNG, WebP) under 10MB");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Compress image
    const compressImage = async () => {
        if (!selectedFile) return;
        
        setProcessing(true);
        try {
            const image = new Image();
            image.src = preview;
            
            await new Promise((resolve) => {
                image.onload = resolve;
            });

            const canvas = document.createElement('canvas');
            let newWidth = image.width;
            let newHeight = image.height;

            if (resize) {
                if (aspectRatio) {
                    const ratio = Math.min(width / image.width, height / image.height);
                    newWidth = image.width * ratio;
                    newHeight = image.height * ratio;
                } else {
                    newWidth = width;
                    newHeight = height;
                }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, newWidth, newHeight);

            const compressedDataUrl = canvas.toDataURL(selectedFile.type, quality / 100);
            setCompressedImage(compressedDataUrl);

            // Create download link
            const link = document.createElement('a');
            link.download = `compressed_${selectedFile.name}`;
            link.href = compressedDataUrl;
            link.click();
        } catch (error) {
            console.error('Error compressing image:', error);
            alert('Error compressing image. Please try again.');
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

            {/* st */}
            <div className="flex flex-col md:flex-row items-start gap-12">
                {/* Left Panel - Settings */}
                <div className="bg-lime-100  shadow-md rounded-xl p-6 w-80 ">

                    <div className="flex items-center gap-2 mb-3">
                        <span className="txtColor-Org text-2xl"> <IoSettingsOutline /> </span>
                        <h3 className="font-semibold text-gray-800 text-lg">Settings</h3>
                    </div>

                    <p className="text-md  mb-4"> Configure compression options </p>

                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium text-sm mb-2">
                            Quality: {quality}%
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={quality}
                            onChange={(event) => setQuality(event.target.value)}
                            className="w-full accent-yellow-400 cursor-pointer"
                        />

                        <p className="text-sm mt-1">
                            Higher quality = larger file size
                        </p>
                    </div>

                    <div className="flex items-center justify-between  flex-col gap-2">

                        <div className="flex items-center justify-between ">
                            <label className="text-gray-700 font-medium text-sm">
                                Resize Images
                            </label>

                            <label className="relative inline-flex items-center cursor-pointer  ml-4">
                                <input
                                    type="checkbox"
                                    checked={resize}
                                    onChange={() => { setResize(!resize); setBtnClick(!btnclick) }}
                                    className="sr-only peer"

                                />

                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 transition-all"></div>
                                <div className="absolute left-0.5 top-0.5  w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
                            </label>
                        </div>


                        {btnclick && (
                            <>
                                <div className="w-full  py-6 ">
                                    <label className="block text-gray-700 font-medium text-sm ">
                                        Max Width: {width}px
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        value={width}
                                        onChange={(event) => setWidth(event.target.value)}
                                        className="w-full accent-yellow-400 cursor-pointer mb-4"
                                    />


                                    <label className="block text-gray-700 font-medium text-sm">
                                        Max Height: {height}px
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        value={height}
                                        onChange={(event) => setHeight(event.target.value)}
                                        className="w-full accent-yellow-400 cursor-pointer"
                                    />
                                </div>


                                <div className="flex items-center justify-between ">
                                    <label className="text-gray-700 font-medium text-sm">
                                        Maintain Aspect Ratio
                                    </label>

                                    <label className="relative inline-flex items-center cursor-pointer  ml-4">
                                        <input
                                            type="checkbox"
                                            checked={aspectRatio}
                                            onChange={() => setAspectRatio(!aspectRatio)}
                                            className="sr-only peer"
                                        />

                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 transition-all"></div>
                                        <div className="absolute left-0.5 top-0.5  w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
                                    </label>
                                </div>
                            </>
                        )}

                    </div>

                </div>



                {/* Right Panel - Image Compressor */}
                <div className="bg-green-100  shadow-md rounded-xl p-8 w-[48vw]  pb-14 ">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="txtColor-Org text-3xl"><MdOutlinePhotoLibrary /></span>
                        <h3 className="font-bold text-gray-800 text-xl">
                            Image Compressor
                        </h3>
                    </div>

                    <div 
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-16
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
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

                                <p className="text-xs">
                                    Supports JPEG, PNG, WebP formats • Max 10MB per image
                                </p>
                            </>
                        ) : (
                            <div className="w-full">
                                <div className="mb-4">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="max-w-full max-h-[300px] mx-auto rounded-lg shadow-md"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-4">
                                    <p className="text-sm text-gray-600">
                                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                                    </p>
                                    
                                    <div className="flex gap-4 justify-center">
                                        <ContainBtn 
                                            label={processing ? "Processing..." : "Compress Image"} 
                                            onClick={compressImage}
                                            disabled={processing}
                                        />
                                        <ContainBtn 
                                            label="Choose Another" 
                                            onClick={handleButtonClick}
                                            disabled={processing}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>


            </div>
        </div >
    );
}
