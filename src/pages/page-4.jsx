import { FaUpload } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";

export default function ExcelFile() {
    return (
        <div className="bg-two pt-36 pb-16  text-center ">
            <h2>Excel File Read / Write</h2>
            <p className="text-xl p-4 pb-6">Read, edit, and create Excel files with ease</p>

            <div className="flex  gap-8  py-8  pb-76  justify-center " >

                <div className="h-44  w-88 rounded-md   shadow-2xl p-6  hover:border-yellow-500  hover:border-2 transition  hover:scale-105">
                    <div className=" bg-linear-to-t from-sky-200 to-blue-500  w-16 text-3xl  p-4  rounded-2xl  mx-auto"> < FaUpload /> </div>
                    <h3 className="font-semibold text-gray-800 text-lg  p-2">Read Excel File</h3>
                    <p>Upload and view Excel files (.xlsx, .xls)</p>
                </div>

                <div className="h-44  w-88  rounded-md shadow-2xl p-6  hover:border-yellow-500  hover:border-2 transition  hover:scale-105">
                    <div className="bg-linear-to-t from-sky-200 to-blue-500 w-16 text-4xl  p-3  rounded-2xl  mx-auto">  <HiMiniPencilSquare/> </div>
                    <h3 className="font-semibold text-gray-800 text-lg  p-2">Create Excel File</h3>
                    <p>Create and edit new Excel spreadsheets</p>
                </div >
            </div>


        </div>
    )
}