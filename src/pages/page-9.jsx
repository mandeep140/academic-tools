import ContainBtn from "../components/ContainBtn";
import { FaFilePdf } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";

export default function PDFRenderAndView() {
    return (
        <div className="bg-two pt-36 pb-28  text-center ">
            <h2>PDF Render / View</h2>
            <p className="mb-12  mt-4 text-xl">View and navigate PDF files directly in your browser</p>

            <div className="flex gap-12  justify-center">
                {/* 1 */}
                <div className="rounded-2xl  shadow-xl p-8  text-center h-54 bg-lime-50">
                    <h3 className="font-semibold text-gray-800 text-lg  p-3"> Controls</h3>
                    <p className="pb-8">Upload and manage your PDF</p>
                    < ContainBtn  label={"Upload PDF"} Icon={<FaUpload />} />

                </div>

                {/* 2 */}
                <div className="rounded-2xl  shadow-xl p-8  w-1/2  bg-green-100">
                    <div
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-16 py-30
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                    >
                        <div className="text-6xl  text-yellow-600"> <FaFilePdf/> </div>
                        <h3 className="font-semibold text-gray-800 text-lg p-2 pt-4"> No image loaded</h3>
                        <p className="text-sm"> Click to upload an image to edit</p>
                    </div>
                </div>

            </div>







        </div>
    );
}