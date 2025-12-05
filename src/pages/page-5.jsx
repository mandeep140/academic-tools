import DisableBtn from "../components/disableBtn"
import { FaUpload } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";

export default function ImageEditor() {


    return (
        <div className="bg-two pt-36 pb-16  text-center  ">
            <h2>Advanced Image Editor</h2>
            <p className="p-3  text-xl  pb-12">Apply filters and adjustments to enhance your images</p>


            <div className="flex  gap-12  justify-center    " >

                <div className="p-4  h-44  w-1/5 rounded-2xl  shadow-xl" >
                    <h3 className=" font-semibold text-gray-800 text-lg ">Editor</h3>
                    <p className="m-3">Adjustments & Filters</p>
                    <DisableBtn label="Upload Image" />
                </div>

                {/* 2 */}
                <div className="p-4    w-1/2  rounded-2xl  shadow-2xl  mb-24">
                    <h3 className="font-semibold text-gray-800 text-2xl bold p-2">Preview</h3>
                    <p>Upload an image to start editing</p>

                    <div
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-24
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                    >
                        <div className=" text-6xl  text-yellow-600"> <IoColorPaletteOutline /></div>
                        <h3 className="p-3" > No image loaded</h3>
                        <p className="text-sm"> Click to upload an image to edit</p>
                    </div>

                </div>

            </div>





        </div>
    );
}