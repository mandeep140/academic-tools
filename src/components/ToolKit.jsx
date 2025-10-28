export default function ToolKit({ bgcolor, icon, title, para, tags }) {
    return (



        <div className="bg-purple-200  shadow-md  h-82  w-80  rounded-2xl  p-4  hover:shadow-xl transition  ">


            <div className="flex items-start justify-between">
                <div className={` rounded-2xl   h-12  w-12  bg-pink-400    ${bgcolor}  `} > {icon} </div>
                <span className="text-xs text-green-700 font-medium bg-green-100 border border-green-300 px-2  rounded-full"> Available </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-4"> {title}  title </h3>
            <p className="text-sm my-4"> {para}  nadoq sn coaosdmx </p>
            <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-700 px-3  rounded-full"> ALSDOQIEDXZKM   {tags} </span>

            <button className="w-full mt-6 shadow-md  bg-[#f9b94e] text-white font-semibold py-2 rounded-full hover:bg-orange-500   duration-300 transition  hover:shadow-xl "> Launch Tool </button>

        </div>

    );
}