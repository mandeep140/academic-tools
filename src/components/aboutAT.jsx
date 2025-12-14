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
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


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

        <div className='  '>



            <div className="mb-12 sm:mb-16 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] w-full text-center pt-28 px-4">

                <div className="h-20 w-25 sm:h-24 sm:w-24 bg-amber-500 mx-auto rounded-2xl text-center flex items-center justify-center text-3xl sm:text-4xl md:text-5xl text-white font-bold">
                     <AutoStoriesIcon />
                </div>


                <h3 className="text-3xl sm:text-4xl md:text-5xl py-4 sm:py-6 font-p">About Academic Tools</h3>
                <p className="text-base sm:text-lg md:text-xl pt-4 max-w-4xl mx-auto">Academic Tools is built to make student productivity faster, easier, and Safer. Our vision is to provide all this features in your browser so you can use them without data privacy concerns.</p>


            </div>




            {/* our mission */}


            <div className="max-w-2xl lg:max-w-4xl mx-5 md:mx-auto rounded-2xl shadow-xl bg-white/50 backdrop-blur-sm text-center grid place-items-center py-8 sm:py-12 px-4 sm:px-8 my-12 sm:my-16">
                <div className="txtColor-Org text-6xl sm:text-7xl md:text-8xl p-2"> <GiCloudRing/>  </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl py-4 font-bold"> Our Mission</h3>
                <p className="text-base sm:text-lg leading-relaxed">To empower students and academics with innovative, easy-to-use tools that streamline workflows, enhance learning, and boost productivity. We believe technology should simplify education, not complicate it.</p>
            </div>



            {/* small boxes */}


            <div className="flex items-center justify-center min-h-[400px] my-12 sm:my-16 px-4">


                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl">
                    {Boxes.map((items, index) => (
                        <div
                            key={index}
                            className="bg-white w-full min-h-[200px] sm:min-h-[220px] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >

                            <div className="bg-yellow-400 text-white text-3xl sm:text-4xl rounded-xl p-3 mb-4">
                                {items.icon}
                            </div>

                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800"> {items.value} </h3>
                            <p className="text-gray-700 mt-1 text-sm sm:text-base">{items.label}</p>


                        </div>
                    ))}
                </div>

            </div>



            {/* our values div */}
            <div className="p-4 text-center px-4">

                <h3 className="text-3xl sm:text-4xl m-6 sm:m-8 font-bold">Our Values</h3>

                <p className="text-lg sm:text-xl md:text-2xl mb-8">The principles that guide everything we build and every decision we make</p>


                <div className="min-h-[400px] flex items-center justify-center py-8">


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl">
                        {DBox.map((item, index) => (

                            <div
                                key={index}
                                className="min-h-[180px] w-full bg-[#B9E8C7] rounded-xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 hover:shadow-2xl transition-shadow duration-300"

                            >


                                <div className="bg-gradient-to-br from-[#F9B94E] to-[#F6AD39] text-gray-700 text-3xl sm:text-4xl rounded-lg p-3 flex-shrink-0">
                                    {item.icon}
                                </div>

                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4"> {item.title} </h3>
                                    <p className="text-sm sm:text-base leading-relaxed"> {item.para} </p>
                                </div>

                            </div>

                        ))}
                    </div>


                </div>

            </div>


        </div>

    );
}