//icons
import { FaBoxes } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { BsPersonHearts } from "react-icons/bs";
import { SiFiles } from "react-icons/si";

//
import { RiUserHeartFill } from "react-icons/ri";
import { HiLightBulb } from "react-icons/hi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiSlumberingSanctuary } from "react-icons/gi";


import { GiCloudRing } from "react-icons/gi";






export default function AboutAT() {

    {/* small boxes */ }

    const Boxes = [
        {
            icon: <FaBoxes/>,
            value: "X+",
            label: "Tools Available",
        },

        {
            icon: <BsPersonHearts   className=' '/>,
            value: "X+",
            label: "Happy Users",
        },

        {
            icon: < SiFiles/>,
            value: "X+",
            label: "Files Processed",
        },

        {
            icon: <GiStarsStack/>,
            value: "XX",
            label: "User Rating",
        },
    ];






    {/* our values */ }

    const DBox = [
        {
            icon: <GiSlumberingSanctuary  />,
            title: "Simplicity First",
            para: "We believe great tools should be intuitive and easy to use, not complicated.",
        },

        {
            icon: <BsFillLightningChargeFill/> ,
            title: "Productivity Focus",
            para: "Every tool is designed to save time and boost your academic productivity.",
        },

        {
            icon: <RiUserHeartFill/>,
            title: "Student-Centered",
            para: "Built by students, for students. We understand your needs and challenges.",
        },

        {
            icon:  <HiLightBulb/> ,
            title:  " Innovation  ",
            para: "Constantly evolving with new features and tools based on user feedback.",
        },
    ];













    return (

        <div className=' bg-[#dfffc4] '>



            <div className=" mt-20 mb-16  h-96 w-full  text-center  pt-20 ">

                <div className="h-24 w-24 bg-amber-500  mx-auto  rounded-2xl  grid place-items-center  ">
                    +++
                </div>


                <h3 className="text-5xl  py-6  font-p">About Academic Tools</h3>
                <p className="text-xl pt-4">Academic Tools is built to make student productivity faster, easier, and smarter. We provide a <br />comprehensive suite of tools designed specifically for academic success.</p>


            </div >




            {/* our mission */}


            <div className="h-76 w-3/4 rounded-2xl    shadow-xl/20  text-center grid place-items-center mx-auto py-8 ">
                <div className="  text-color  text-8xl p-2"> <GiCloudRing/>  </div>
                <h3 className="text-4xl py-4"> Our Mission</h3>
                <p className="text-lg  "  > To empower students and academics with innovative, easy-to-use tools that streamline workflows, enhance  <br />learning, and boost productivity. We believe technology should simplify education, not complicate it.</p>
            </div>









            {/* small boxes */}


            <div className=" flex items-center justify-center  h-76   my-16">


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {Boxes.map((items, index) => (
                        <div
                            key={index}
                            className="bg-green-300 w-68 h-54 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
                        >

                            <div className="bg-yellow-400 text-white text-3xl rounded-xl p-3 mb-4">
                                {items.icon}
                            </div>

                            <h3 className="text-2xl font-semibold text-gray-800"> {items.value} </h3>
                            <p className="text-gray-500 mt-1">{items.label}</p>


                        </div>
                    ))}
                </div>

            </div>












            {/* our values div */}
            <div className=" p-4   text-center">

                <h3 className=" text-4xl m-8">Our Values</h3>

                <p className="text-2xl">The principles that guide everything we build and every decision we make</p>


                <div className="  h-112  flex items-center justify-center  ">


                    <div className=" grid grid-cols-1 md:grid-cols-2  gap-8">
                        {DBox.map((item, index) => (

                            <div
                                key={index}
                                className=" h-40 w-154 bg-red-200 rounded-xl shadow-lg p-8  flex justify-center items-center"

                            >


                                <div className="bg-yellow-200 text-white text-4xl rounded-lg p-3 mb-4  mr-8">
                                    {item.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-4"> {item.title} </h3>
                                    <p className=""> {item.para} </p>
                                </div>

                            </div>

                        ))}
                    </div>


                </div>

            </div>























        </div>

    );
}