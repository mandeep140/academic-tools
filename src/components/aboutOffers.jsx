import ContainBtn from "./containBtn"
import DisableBtn from "./disableBtn";

import { IoMailUnreadSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";


import { GiNotebook } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa6";
import { GiArchiveResearch } from "react-icons/gi";



export default function AboutOffers() {
    const offers = [
        {
            icon: <GiNotebook  />,
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
            title: "File Management",
            desc: "Convert, compress, and manage your academic files with ease. Support for all major formats.",
            tags: ["PDF Tools", "File Converter", "Image Compressor"],
        },
        {
            icon: <GiArchiveResearch />,
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
            title: "Writing & Research",
            desc: "Improve your writing with grammar checking, plagiarism detection, and citation generation.",
            tags: ["Grammar Checker", "Citations", "Plagiarism"],
        },
        {
            icon: <FaLightbulb  />,
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
            title: "Study & Productivity",
            desc: "Organize your studies with flashcards, mind maps, and task management tools.",
            tags: ["Flashcards", "Mind Maps", "To-Do Lists"],
        },
    ];






    return (



        <div className=" bg-[#dfffc4] ">

            <div className="  flex flex-col items-center py-16 px-4  ">

                <h3 className="text-5xl font-normal mb-8  font-p">What We Offer</h3>
                <p className=" mb-12 text-center  text-2xl">
                    A comprehensive suite of tools covering all aspects of academic work
                </p>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((item, index) => (

                        <div
                            key={index}
                            className=" w-96  h-88   bg-white rounded-3xl shadow-md p-8 text-center transition-transform duration-300 hover:scale-105" >

                            <div
                                className={` w-20 h-20 mx-auto mb-5 rounded-3xl p-4  text-white  text-5xl ${item.bgColor}`}>
                                {item.icon}

                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-lg my-4">{item.desc}</p>




                            <div className="flex flex-wrap justify-center gap-2">
                                {item.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full   border"
                                    >
                                        {tag}
                                    </span>



                                ))}
                            </div>
                        </div>

                    ))}
                </div>


            </div>







            {/* our team  */}

            <div className=" py-16   text-center">

                <h3 className="text-4xl  ">  Our Team </h3>
                <p className="text-2xl  my-8">Dedicated professionals committed to enhancing your academic experience</p>


                <div className=" bg-red-500  h-100 w-100  shadow-xl  rounded-2xl  mb-8 mx-auto  ">
                    <div className="h-32  w-32  rounded-bl-full bg-amber-300  pl-12 pt-6  text-5xl">   <  HiUserGroup/> </div>
                    <h3 className="text-3xl  py-8  font-p ">Academic Tools Team</h3>
                    <p className="text-xl  text-green-700 ">Development & Design</p>
                    <p className="pt-8  text-xl">Passionate about creating tools that enhance learning and productivity for <br /> students worldwide.</p>
                </div>




                <div className="h-104 w-3/4  py-4 mx-auto my-20 rounded-2xl  shadow-xl/20  text-center grid place-items-center">
                    <div className="rounded-2xl bg-amber-700  text-white  text-8xl  p-2" >  <IoMailUnreadSharp/> </div>
                    <h3 className="text-4xl  "> Get in Touch </h3>
                    <p className="text-2xl">Have questions, suggestions, or feedback? We'd love to hear from you. Your input  <br /> helps us build better tools for the academic community.</p>
                    
                    
                    <div>
                        <ContainBtn label="Contact Support " />  &nbsp; &nbsp;
                        <DisableBtn label="Feature Request " />
                    </div>

                </div>


                <p className="text-lg">Built by learners, for learners ## <br />because academic life deserves better tools!</p>

            </div>







        </div>







    );
}