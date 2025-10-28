import DesignBtn from "./designBtn";




export default function ToolInput() {
    return (
        <div>





            <div className=" bg-[#dfffc4]  mt-20 text-center  pt-8">
                <h3 className="text-5xl  py-8  font-p "> Explore Tools </h3>
                <p className="text-xl   "> Discover our comprehensive collection of academic tools designed to enhance your <br /> productivity and learning experience. </p>

                <input type="text" placeholder="Search Tools..."
                    className=" h-8 w-xl  rounded-full  text-center  my-12  border border-[#f9b94e]" />


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










