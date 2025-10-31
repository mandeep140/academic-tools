import DesignBtn from "./designBtn";
import { IoMdSearch } from "react-icons/io";



export default function ToolInput() {
    return (
        <div>





            <div className=" Bg-Color  pt-28 text-center  ">
                <h3 className="text-5xl  py-8  font-p "> Explore Tools </h3>
                <p className="text-xl   "> Discover our comprehensive collection of academic tools designed to enhance your <br /> productivity and learning experience. </p>



                <div className="relative  w-1/3 mx-auto ">
                    < IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2   text-2xl" />
                    <input type="text" placeholder="Search Tools..."
                        className=" h-8   rounded-full  text-center  text-sm my-12  border border-black w-full pl-10 pr-4 py-2" />
                </div>

                <div >
                    <DesignBtn label="All Tools" />
                    <DesignBtn label="File Management" />
                    <DesignBtn label="Writing Tools" />
                    <DesignBtn label="Academic" />
                    <DesignBtn label="Study Tools" />
                    <DesignBtn label="Productivity" />
                    <DesignBtn label="Utilities" />
                    <DesignBtn label="Development" />
                    <DesignBtn label="Reference" />
                </div>


            </div>



















        </div>

    );
}










