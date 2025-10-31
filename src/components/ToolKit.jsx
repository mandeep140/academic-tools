export default function ToolKit({ bgcolor, icon, title, para, tags }) {
    return (



        <div className="bg-[#BAE8C7]  shadow-md  h-82  w-80   rounded-2xl  p-4  pt-6  hover:shadow-xl transition  hover:scale-106  ">


            <div className="flex items-start justify-between">
                <div className={` rounded-2xl    text-white  text-3xl  p-3    bg-pink-400    ${bgcolor}  `} > {icon} </div>
                <span className="text-xs text-green-700 font-medium bg-green-100 border border-green-300 px-2  rounded-full"> Available </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-4"> {title}   </h3>
            <p className="text-sm my-4"> {para}  </p>
            <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-700 px-3  rounded-full  border border-purple-600">   {tags} </span>

            <button className="w-full mt-6 shadow-md  bg-[#f9b94e] text-white font-semibold py-2 rounded-full hover:bg-orange-500   duration-300 transition  hover:shadow-xl "> Launch Tool </button>

        </div>

    );
}