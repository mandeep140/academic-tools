export default function PdfTools() {
    return (
        <div className="bg-red-300    ">

            <div className="flex flex-col items-center justify-center py-10 px-4  pt-28">
                <h2 className="text-2xl font-semibold mb-2">PDF Tools </h2>
                <p className=" mb-8"> Merge, split, compress, and protect your PDF files with professional tools. </p>



                <div className="flex   gap-8">



                    {/* 1 */}
                    <div className="flex flex-col  lg:flex-row gap-6  ">


                        <div className="bg-green-100  p-16  h-[80vh] ">
                            <h3 className=" font-medium mb-4 flex items-center gap-2">
                                <span className="text-pink-200 text-xl">  📄 </span>  PDF Manager
                            </h3>

                            <p className=" mb-4"> Upload your PDF files and choose from various processing options </p>



                            <div className="border-2 border-dashed border-gray-300 rounded-md py-10 flex flex-col items-center justify-center text-center">

                                <div className="text-4xl text-yellow-500 mb-3">## </div>
                                <p className="font-medium mb-2">Upload PDF Files</p>
                                <p className=" mb-4"> Drag and drop your PDF files here, or click to browse </p>

                                <button >Choose PDF Files</button>
                                <p className="text-xs mt-3">
                                    Supports multiple PDFs · Max 10MB per file
                                </p>

                            </div>

                        </div>

                    </div>




                    {/* 2 */}
                    <div className="flex flex-col gap-6">


                        {/* Available Tools */}
                        <div className="bg-white rounded-lg shadow p-5 border w-64">
                            <h3 className="font-semibold mb-3 ">Available Tools</h3>

                            <ul className="text-sm  space-y-2">
                                <li> <span className="font-medium">Merge PDFs</span> <br />Combine multiple PDFs into one</li>
                                <li> <span className="font-medium">Split PDF</span> <br />Extract specific pages or ranges</li>
                                <li> <span className="font-medium">Compress</span> <br />Reduce file size efficiently</li>
                                <li> <span className="font-medium">Password Protect</span> <br />Add security to your PDFs</li>
                            </ul>

                        </div>



                        {/* File Limits */}
                        <div className="bg-white rounded-lg shadow p-5 border w-64">
                            <h3 className="font-semibold mb-3 ">File Limits</h3>


                            <ul className="text-sm  space-y-1">
                                <li>• Maximum file size: 10MB</li>
                                <li>• Supported format: PDF only</li>
                                <li>• Maximum files: 20 per session</li>
                                <li>• Processing time: 1–5 minutes</li>
                            </ul>

                        </div>


                        {/* Security & Privacy */}
                        <div className="bg-white rounded-lg shadow p-5 border w-64">
                            <h3 className="font-semibold mb-3 ">Security & Privacy</h3>

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