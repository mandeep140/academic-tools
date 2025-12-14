import ContainBtn from "../components/containBtn"
import { MdOutlineUpload } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiScissors2Fill } from "react-icons/ri";
import { MdAutoFixHigh } from "react-icons/md";
import { BsEraserFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import * as ort from 'onnxruntime-web';

export default function ImageEditor() {
    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [activeTool, setActiveTool] = useState(null);
    const [processing, setProcessing] = useState(false);
    
    // Crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [cropShape, setCropShape] = useState('rect'); // 'rect' or 'round'
    const [aspectRatio, setAspectRatio] = useState(4 / 3);
    
    // Adjustment states
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [blur, setBlur] = useState(0);
    
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setOriginalImage(e.target.result);
                resetAdjustments();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Reset adjustments
    const resetAdjustments = () => {
        setBrightness(100);
        setContrast(100);
        setSaturation(100);
        setBlur(0);
    };

    // Apply canvas filters
    const applyFilters = () => {
        if (!image) return;

        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
            ctx.drawImage(img, 0, 0);
            
            setImage(canvas.toDataURL());
        };
        img.src = originalImage;
    };

    useEffect(() => {
        if (originalImage && activeTool === 'adjust') {
            applyFilters();
        }
    }, [brightness, contrast, saturation, blur]);

    // Crop complete callback
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    // Apply crop
    const applyCrop = async () => {
        if (!croppedAreaPixels || !originalImage) return;

        setProcessing(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.onload = () => {
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            
            // For circular crop, apply clipping
            if (cropShape === 'round') {
                ctx.beginPath();
                ctx.arc(
                    canvas.width / 2,
                    canvas.height / 2,
                    Math.min(canvas.width, canvas.height) / 2,
                    0,
                    Math.PI * 2
                );
                ctx.closePath();
                ctx.clip();
            }
            
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );
            
            const croppedImage = canvas.toDataURL('image/png');
            setImage(croppedImage);
            setOriginalImage(croppedImage);
            setShowCropper(false);
            setActiveTool(null);
            setProcessing(false);
        };
        img.src = originalImage;
    };

    // Helper: Save model to IndexedDB
    const saveModelToCache = async (modelData) => {
        try {
            const dbName = 'OnnxModelCache';
            const storeName = 'models';
            const modelKey = 'rmbg-model';

            const db = await new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, 1);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName);
                    }
                };
            });

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            await new Promise((resolve, reject) => {
                const request = store.put(modelData, modelKey);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            db.close();
            console.log('Model cached successfully');
        } catch (error) {
            console.warn('Failed to cache model:', error);
        }
    };

    // Helper: Load model from IndexedDB
    const loadModelFromCache = async () => {
        try {
            const dbName = 'OnnxModelCache';
            const storeName = 'models';
            const modelKey = 'rmbg-model';

            const db = await new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, 1);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName);
                    }
                };
            });

            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const modelData = await new Promise((resolve, reject) => {
                const request = store.get(modelKey);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            db.close();
            return modelData;
        } catch (error) {
            console.warn('Failed to load cached model:', error);
            return null;
        }
    };

    // Remove background using ONNX model with caching
    const removeBackground = async () => {
        if (!image) return;

        setProcessing(true);
        setActiveTool('remove-bg');
        
        try {
            let session;
            
            // Try to load from cache first
            console.log('Checking for cached model...');
            const cachedModel = await loadModelFromCache();
            
            if (cachedModel) {
                console.log('Loading model from cache...');
                session = await ort.InferenceSession.create(cachedModel);
            } else {
                console.log('Downloading model from CDN...');
                const modelUrl = 'https://huggingface.co/briaai/RMBG-1.4/resolve/main/onnx/model.onnx';
                
                // Download model
                const response = await fetch(modelUrl);
                const modelData = await response.arrayBuffer();
                
                // Save to cache for future use
                await saveModelToCache(modelData);
                
                // Create session from downloaded data
                session = await ort.InferenceSession.create(modelData);
            }
            
            console.log('Processing image...');
            
            // Load image
            const img = await loadImage(image);
            const modelWidth = 1024;
            const modelHeight = 1024;
            
            // Convert to tensor
            const inputTensor = imageToTensor(img, modelWidth, modelHeight);
            
            // Run inference
            const feeds = { [session.inputNames[0]]: inputTensor };
            const output = await session.run(feeds);
            const maskTensor = output[session.outputNames[0]];
            
            // Process mask
            const maskCanvas = maskToCanvas(maskTensor.data, modelWidth, modelHeight, img.width, img.height);
            
            // Composite with mask
            const resultBlob = await compositeWithMask(img, maskCanvas);
            const url = URL.createObjectURL(resultBlob);
            
            setImage(url);
            setOriginalImage(url);
            setProcessing(false);
            setActiveTool(null);
        } catch (error) {
            console.error('Background removal error:', error);
            alert('Background removal failed: ' + error.message);
            setProcessing(false);
            setActiveTool(null);
        }
    };

    // Helper: Load image
    function loadImage(src) {
        return new Promise((res, rej) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => res(img);
            img.onerror = (e) => rej(e);
            img.src = src;
        });
    }

    // Helper: Convert image to ONNX tensor
    function imageToTensor(img, modelWidth, modelHeight) {
        const canvas = document.createElement("canvas");
        canvas.width = modelWidth;
        canvas.height = modelHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, modelWidth, modelHeight);
        const imageData = ctx.getImageData(0, 0, modelWidth, modelHeight);
        const { data } = imageData;

        const floatData = new Float32Array(3 * modelHeight * modelWidth);
        let rIndex = 0;
        let gIndex = modelHeight * modelWidth;
        let bIndex = 2 * modelHeight * modelWidth;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i] / 255.0;
            const g = data[i + 1] / 255.0;
            const b = data[i + 2] / 255.0;
            floatData[rIndex++] = r;
            floatData[gIndex++] = g;
            floatData[bIndex++] = b;
        }

        const tensor = new ort.Tensor("float32", floatData, [1, 3, modelHeight, modelWidth]);
        return tensor;
    }

    // Helper: Convert model output to mask canvas
    function maskToCanvas(outputData, modelWidth, modelHeight, outW, outH) {
        const hw = modelWidth * modelHeight;
        const canvas = document.createElement("canvas");
        canvas.width = modelWidth;
        canvas.height = modelHeight;
        const ctx = canvas.getContext("2d");
        const imgData = ctx.createImageData(modelWidth, modelHeight);
        
        for (let i = 0; i < hw; i++) {
            const v = Math.max(0, Math.min(1, outputData[i]));
            const c = Math.round(v * 255);
            const idx = i * 4;
            imgData.data[idx] = c;
            imgData.data[idx + 1] = c;
            imgData.data[idx + 2] = c;
            imgData.data[idx + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);

        const outCanvas = document.createElement("canvas");
        outCanvas.width = outW;
        outCanvas.height = outH;
        const octx = outCanvas.getContext("2d");
        octx.imageSmoothingEnabled = true;
        octx.drawImage(canvas, 0, 0, outW, outH);
        return outCanvas;
    }

    // Helper: Composite image with mask
    async function compositeWithMask(img, maskCanvas) {
        const w = img.width, h = img.height;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, w, h);

        const maskCtx = maskCanvas.getContext("2d");
        const maskData = maskCtx.getImageData(0, 0, w, h).data;

        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;
        for (let i = 0, j = 0; i < d.length; i += 4, j += 4) {
            const alpha = maskData[j] / 255;
            d[i + 3] = Math.round(alpha * 255);
        }
        ctx.putImageData(imgData, 0, 0);

        return new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
    }

    // Download image
    const downloadImage = () => {
        if (!image) return;
        
        const link = document.createElement('a');
        link.href = image;
        link.download = `edited-image-${Date.now()}.png`;
        link.click();
    };

    // Reset to original
    const resetImage = () => {
        setImage(originalImage);
        resetAdjustments();
        setShowCropper(false);
        setActiveTool(null);
    };

    return (
        <div className="bg-two pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 md:pb-16">
            <div className="text-center mb-6 sm:mb-8 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl">Advanced Image Editor</h2>
                <p className="p-2 sm:p-3 text-base sm:text-lg md:text-xl pb-4 sm:pb-6 md:pb-8">Apply filters, crop, remove backgrounds, and enhance your images</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center px-4 max-w-7xl mx-auto">
                {/* Left Panel - Tools */}
                <div className="space-y-3 sm:space-y-4 w-full lg:w-80">
                    {/* Upload Section */}
                    <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-lime-100">
                        <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3 sm:mb-4">Upload Image</h3>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        
                        <ContainBtn 
                            Icon={<MdOutlineUpload className="text-2xl"/>} 
                            label="Choose Image"
                            onClick={handleButtonClick}
                        />
                    </div>

                    {/* Tools Section */}
                    {image && (
                        <>
                            <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-green-100">
                                <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3 sm:mb-4">🛠️ Tools</h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <button
                                        onClick={() => {
                                            setActiveTool('crop');
                                            setShowCropper(true);
                                        }}
                                        className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                            activeTool === 'crop' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <RiScissors2Fill className="text-xl sm:text-2xl" />
                                            <div>
                                                <div className="font-semibold text-sm sm:text-base">Crop Image</div>
                                                <div className="text-[10px] sm:text-xs opacity-80">Resize and crop</div>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Crop Options Panel */}
                                    {activeTool === 'crop' && (
                                        <div className="bg-white p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-700 block mb-2">Crop Shape</label>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setCropShape('rect')}
                                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            cropShape === 'rect' 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        Rectangle
                                                    </button>
                                                    <button
                                                        onClick={() => setCropShape('round')}
                                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            cropShape === 'round' 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        Circle
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs font-semibold text-gray-700 block mb-2">Aspect Ratio</label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    <button
                                                        onClick={() => setAspectRatio(1)}
                                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            aspectRatio === 1 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        1:1
                                                    </button>
                                                    <button
                                                        onClick={() => setAspectRatio(4 / 3)}
                                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            aspectRatio === 4 / 3 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        4:3
                                                    </button>
                                                    <button
                                                        onClick={() => setAspectRatio(16 / 9)}
                                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            aspectRatio === 16 / 9 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        16:9
                                                    </button>
                                                    <button
                                                        onClick={() => setAspectRatio(3 / 4)}
                                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            aspectRatio === 3 / 4 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        3:4
                                                    </button>
                                                    <button
                                                        onClick={() => setAspectRatio(9 / 16)}
                                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                            aspectRatio === 9 / 16 
                                                                ? 'bg-amber-500 text-white' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        9:16
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="text-xs font-semibold text-gray-700 block mb-2">Zoom</label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="3"
                                                    step="0.1"
                                                    value={zoom}
                                                    onChange={(e) => setZoom(Number(e.target.value))}
                                                    className="w-full"
                                                />
                                                <div className="text-xs text-gray-600 text-center mt-1">{zoom.toFixed(1)}x</div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => {
                                            removeBackground();
                                        }}
                                        disabled={processing}
                                        className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                            activeTool === 'remove-bg' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                        } disabled:opacity-50`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <BsEraserFill className="text-xl sm:text-2xl" />
                                            <div>
                                                <div className="font-semibold text-sm sm:text-base">
                                                    {processing && activeTool === 'remove-bg' ? 'Processing...' : 'Remove Background'}
                                                </div>
                                                <div className="text-[10px] sm:text-xs opacity-80">
                                                    {processing && activeTool === 'remove-bg' ? 'Please wait' : 'Remove image background'}
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setActiveTool('adjust');
                                            setShowCropper(false);
                                        }}
                                        className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                                            activeTool === 'adjust' ? 'bg-amber-500 text-white shadow-md' : 'bg-white hover:bg-amber-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <MdAutoFixHigh className="text-xl sm:text-2xl" />
                                            <div>
                                                <div className="font-semibold text-sm sm:text-base">Adjustments</div>
                                                <div className="text-[10px] sm:text-xs opacity-80">Filters & effects</div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Adjustments Panel */}
                            {activeTool === 'adjust' && (
                                <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-lime-50">
                                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-3 sm:mb-4">🎨 Adjustments</h3>
                                    
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium flex justify-between">
                                                <span>Brightness</span>
                                                <span className="text-amber-600">{brightness}%</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={brightness}
                                                onChange={(e) => setBrightness(Number(e.target.value))}
                                                className="w-full mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium flex justify-between">
                                                <span>Contrast</span>
                                                <span className="text-amber-600">{contrast}%</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={contrast}
                                                onChange={(e) => setContrast(Number(e.target.value))}
                                                className="w-full mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium flex justify-between">
                                                <span>Saturation</span>
                                                <span className="text-amber-600">{saturation}%</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={saturation}
                                                onChange={(e) => setSaturation(Number(e.target.value))}
                                                className="w-full mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium flex justify-between">
                                                <span>Blur</span>
                                                <span className="text-amber-600">{blur}px</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                value={blur}
                                                onChange={(e) => setBlur(Number(e.target.value))}
                                                className="w-full mt-2"
                                            />
                                        </div>

                                        <button
                                            onClick={resetAdjustments}
                                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-colors"
                                        >
                                            Reset Adjustments
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Export Section */}
                            <div className="p-4 sm:p-6 rounded-2xl shadow-xl bg-gradient-to-br from-amber-400 to-orange-500">
                                <h3 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">💾 Export</h3>
                                
                                <button
                                    onClick={downloadImage}
                                    className="w-full bg-white text-amber-600 font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaDownload />
                                    Download Image
                                </button>

                                <button
                                    onClick={resetImage}
                                    className="w-full mt-2 sm:mt-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-colors"
                                >
                                    Reset to Original
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Panel - Preview */}
                <div className="p-4 sm:p-6 w-full lg:w-2/3 rounded-2xl shadow-2xl bg-green-100">
                    <h3 className="font-bold text-gray-800 text-2xl sm:text-3xl p-2">Preview</h3>
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base">{image ? 'Edit your image using the tools on the left' : 'Upload an image to start editing'}</p>

                    <div className="border-2 border-dashed border-yellow-100 rounded-xl overflow-hidden bg-white/50 relative"
                         style={{ minHeight: '300px' }}>
                        {!image ? (
                            <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 md:p-12 text-center">
                                <div className="text-4xl sm:text-5xl md:text-6xl text-yellow-600 mb-3 sm:mb-4"><IoColorPaletteOutline /></div>
                                <h3 className="p-2 sm:p-3 text-lg sm:text-xl md:text-2xl">No image loaded</h3>
                                <p className="text-xs sm:text-sm">Click "Choose Image" to upload an image to edit</p>
                            </div>
                        ) : showCropper && activeTool === 'crop' ? (
                            <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                                <Cropper
                                    image={originalImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspectRatio}
                                    cropShape={cropShape}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col sm:flex-row gap-2 sm:gap-4 w-11/12 sm:w-auto">
                                    <button
                                        onClick={applyCrop}
                                        disabled={processing}
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg shadow-lg disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'Apply Crop'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowCropper(false);
                                            setActiveTool(null);
                                        }}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg shadow-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center p-4">
                                {processing && activeTool === 'remove-bg' ? (
                                    <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12">
                                        <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-b-4 border-amber-500 mb-3 sm:mb-4"></div>
                                        <p className="text-base sm:text-lg font-semibold text-amber-600">Removing background...</p>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-2">This may take a few moments</p>
                                    </div>
                                ) : (
                                    <img 
                                        src={image} 
                                        alt="Preview" 
                                        className="max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] object-contain rounded-lg"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {processing && (
                        <div className="mt-3 sm:mt-4 text-center">
                            <p className="text-amber-600 font-semibold text-sm sm:text-base">Processing... Please wait</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}