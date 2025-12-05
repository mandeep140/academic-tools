import DisableBtn from "../components/disableBtn";
import { MdCrop } from "react-icons/md";
export default function CropAndEdit() {
    return (
        <div className="bg-two  py-36  text-center">
            <h2>Image Crop / Edit</h2>
            <p className="pb-12 text-xl pt-3">Crop, rotate, and transform your images with precision</p>

            {/* boxes */}
            <div className="flex gap-12 justify-center ">
                {/* 1 */}
                <div className="w-1/5  p-6 rounded-xl shadow-xl  h-48 ">
                    <h3 className="font-semibold text-gray-800 text-lg">Tools</h3>
                    <p className="p-2 pb-8">Edit options</p>
                    <div className=""> <DisableBtn label={"Upload image"} /> </div>
                </div>




                {/* 2 */}
                <div className="  w-1/2  py-12  px-6  rounded-xl shadow-xl">
                    <h3 className="font-semibold text-gray-800 text-3xl pb-3">Canvas</h3>
                    <p>Upload an image to start editing</p>

                    <div
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-20
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                    >
                        <div className="text-7xl"> < MdCrop /> </div>
                        <h3 className="py-4"> No image loaded</h3>
                        <p className="text-sm"> Click to upload an image to edit</p>
                    </div>

                </div>

            </div>

        </div>
    );
}