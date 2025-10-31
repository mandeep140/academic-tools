
import { useState } from "react";

export default function FileConverter() {


    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };


    return (

        <div className="   text-center ">

            <h2 className=" pt-28  pb-3 mx-auto" >File Converter</h2>
            <p className="">Convert between different file formats including PDF, Word, Excel, PowerPoint, and image formats.</p>

            <div className=" bg-fuchsia-400   flex flex-wrap justify-center  items-center p-12 " >





                <div className="grid lg:grid-cols-2  gap-8   justify-center items-center ">


                    {/* /// */}
                    <div className="bg-yellow-200 rounded-xl shadow-lg   p-8  px-16">

                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            Upload & Convert
                        </h2>


                        <p className="text-sm  mt-1">Select a file and choose your desired output format</p>



                        <label className="mt-6 block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50" >
                            <input type="file" className="hidden" onChange={handleFileUpload} />

                            <p className="font-medium mt-3">
                                {fileName ? fileName : "Click to upload a file"}
                            </p>


                            <p className="text-xs  mt-2">
                                Supports PDF, Word, Excel, PowerPoint, and image files
                            </p>

                        </label>


                        {/* Select Format */}
                        <div className="mt-6">
                            <label className="text-sm font-semibold">Convert To</label>
                            <select className="w-full border rounded-lg mt-2 p-2 text-gray-600">
                                <option>Select output format</option>
                                <option>PDF</option>
                                <option>DOCX</option>
                                <option>XLSX</option>
                                <option>PPTX</option>
                                <option>JPEG</option>
                                <option>PNG</option>
                            </select>
                        </div>


                        <button className="mt-6 bg-yellow-300 w-full py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
                            Convert File
                        </button>


                    </div>



                    {/*     */}
                    <div className=" space-y-6  bg-amber-800  w-68">


                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <h3 className="font-bold  mb-4">Supported Formats</h3>

                            <div>
                                <p className="font-medium">Documents</p>
                                <ul className="list-disc ml-5 text-sm">
                                    <li>PDF Documents</li>
                                    <li>Microsoft Word</li>
                                    <li>Rich Text Format </li>
                                </ul>
                            </div>


                            <div className="mt-4">
                                <p className="font-medium">Spreadsheets</p>
                                <ul className="list-disc ml-5 text-sm">
                                    <li>Microsoft Excel (.xlsx)</li>
                                    <li>CSV Files</li>
                                </ul>
                            </div>


                            <div className="mt-4">
                                <p className="font-medium">Presentations</p>
                                <ul className="list-disc ml-5 text-sm">
                                    <li>PowerPoint (.pptx)</li>
                                    <li>PDF Presentations</li>
                                </ul>
                            </div>


                            <div className="mt-4">
                                <p className="font-medium ">Images</p>
                                <ul className="list-disc ml-5 text-sm ">
                                    <li>JPEG, PNG, GIF</li>
                                    <li>BMP, TIFF</li>
                                </ul>
                            </div>

                        </div>



                        {/* Tips */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4">Tips</h3>
                            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                                <li>Ensure your file is under 50MB for best performance</li>
                                <li>Complex layouts may require manual adjustments</li>
                                <li>Image quality may vary during conversion</li>
                                <li>Password-protected files need to be unlocked first</li>
                            </ul>
                        </div>


                    </div>

                </div>

            </div>


        </div>
    );
}