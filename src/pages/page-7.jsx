
export default function ImageFormatConverter() {

    const boxes = [
        {
            icon: "",
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
            title: "JPEG",
            desc: "Best for photos, smaller file size",

        },
        {
            icon: "",
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
            title: "PNG",
            desc: "Lossless, supports transparency",

        },
        {
            icon: "",
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
            title: "WebP",
            desc: " Modern format, best compression",

        },
    ];


    return (
        <div className="bg-two  text-center pt-36 pb-28 ">
            <h3>Image Format Converter</h3>
            <p>Convert between JPG, PNG, and WebP formats instantly</p>
            {/* 1 */}


            <div>
                <h3>Format Conversion</h3>
                <p>Upload an image and choose your target format</p>


                <div className="rounded-2xl  shadow-xl p-8  w-1/2">
                    <div
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12 mt-8 pb-16 py-30
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                    >
                        <div className="text-6xl  text-yellow-600"> </div>
                        <h3 className="font-semibold text-gray-800 text-lg p-2 pt-4"> No image loaded</h3>
                        <p className="text-sm"> Click to upload an image to edit</p>
                    </div>
                </div>

                {/* box */}

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

    );
}

