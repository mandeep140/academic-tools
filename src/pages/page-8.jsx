import { FaUpload } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { FaEraser } from "react-icons/fa6";
import { RiGalleryFill } from "react-icons/ri";


export default function BackgroundRemoval() {


    const boxes = [
        {
            icon: < LuSparkles/>,
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
            title: "AI-Powered",
            desc: "Advanced ML algorithms",

        },
        {
            icon:<FaEraser/>,
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
            title: "Precise Removal",
            desc: "Clean edges & details",

        },
        {
            icon:<RiGalleryFill /> ,
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
            title: "High Quality",
            desc: " No quality loss",

        },
    ];





    return (
        <div className="bg-two  pt-36 text-center  pb-24" >
            <h2>Background Removal</h2>
            <p className="text-xl p-3">Remove image backgrounds instantly using AI - all processing done locally in your browser</p>

            <div className="bg-amber-200 w-2/3  mx-auto my-6 p-2  ">
                <h3 className="font-semibold text-gray-800 text-2xl p-2 pt-4">AI Background Removal</h3>
                <p className="text-lg p-2">Upload an image and let AI remove the background automatically</p>



                <div
                    className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-16 m-6 mb-3
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                >
                    <div className="text-5xl text-yellow-600">< FaUpload /></div>
                    <h3 className="font-semibold text-gray-800 text-lg p-2  mt-4"> Click to upload an image </h3>
                    <p className="text-sm"> Supports JPG, PNG, WebP </p>
                </div>

                {/* small box */}

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center  p-6 mb-12">
                        {boxes.map((item, index) => (
                            <div
                                key={index}
                                className="bg-red-400  rounded-xl  p-6 flex flex-col gap-2  items-center justify-center shadow-lg"
                            >


                                <div className="text-4xl  ">{item.icon} </div>
                                <div className=" font-semibold text-gray-800 text-lg  mt-4 ">{item.title} </div>
                                <div className="">{item.desc} </div>

                            </div>
                        ))}
                    </div>








                </div>


            </div>

        </div>
    );
}