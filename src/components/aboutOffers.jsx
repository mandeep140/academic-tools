import ContainBtn from "./containBtn"
import DisableBtn from "./disableBtn";

import { IoMailUnreadSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";



import { ImBooks } from "react-icons/im";
import { FaLightbulb } from "react-icons/fa6";
import { GiArchiveResearch } from "react-icons/gi";



import { IoIosMail } from "react-icons/io";
import { VscGithub } from "react-icons/vsc";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

export default function AboutOffers() {
    const offers = [
        {
            icon: <ImBooks />,
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
            title: "File Management",
            desc: "Convert, compress, and manage your academic files with ease. Support for all major formats including PDF, Word, Excel, and Images.",
            tags: ["PDF Tools", "File Converter", "Image Compressor"],
        },
        {
            icon: <GiArchiveResearch />,
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
            title: "Document Processing",
            desc: "Powerful PDF tools to merge, split, and compress documents. Convert between PDF, DOCX, and other formats seamlessly.",
            tags: ["PDF Merge", "PDF Split", "PDF Compress", "DOCX Converter"],
        },
        {
            icon: <FaLightbulb />,
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
            title: "Image Editing",
            desc: "Advanced image editing with AI-powered background removal, smart cropping, filters, and professional adjustments.",
            tags: ["Background Removal", "Image Crop", "Filters", "Resize"],
        },
    ];

    const team = [
        {
            name: "Muskan Kumari",
            role: "Frontend Development",
            rollNo: "25s12res107"
        },
        {
            name: "Mandeep Nagar",
            role: "Logical Part Development",
            rollNo: "25s12res200"
        },
        {
            name: "Yash Mishra",
            role: "UI/UX Design",
            rollNo: "25s12res222"
        },
        {
            name: "Shagun Mohan",
            role: "UI/UX Design",
            rollNo: "25s12res153"
        },
        {
            name: "Suyagya Mishra",
            role: "Management",
            rollNo: "25s12res177"
        }
    ]

    return (



        <div className="  ">

            <div className="flex flex-col items-center py-12 sm:py-16 px-4">

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6 sm:mb-8 font-p">What We Offer</h3>
                <p className="mb-8 sm:mb-12 text-center text-lg sm:text-xl md:text-2xl max-w-3xl">
                    A comprehensive suite of tools covering all aspects of academic work
                </p>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full">
                    {offers.map((item, index) => (

                        <div
                            key={index}
                            className="w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105">

                            <div
                                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-3xl p-3 sm:p-4 text-white text-4xl sm:text-5xl flex items-center justify-center ${item.bgColor}`}>
                                {item.icon}

                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-base sm:text-lg my-4 leading-relaxed">{item.desc}</p>




                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {item.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs sm:text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border hover:bg-gray-200 transition-colors"
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

            <div className="py-12 sm:py-16 text-center px-4">

                <h3 className="text-3xl sm:text-4xl mb-2">Our Team</h3>
                <p className="text-lg sm:text-xl md:text-2xl my-6 sm:my-4 max-w-3xl mx-auto">Meet the team who make it all happen</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 sm:p-8 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl sm:text-5xl mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                                {index % 2 === 0 ? <FaUserTie /> : <IoPersonSharp />}
                            </div>

                            <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{member.name}</h4>
                            <p className="text-base sm:text-lg text-amber-600 font-semibold mb-3">{member.role}</p>
                            <p className="text-sm sm:text-base text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">Roll No: {member.rollNo}</p>

                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto my-12 sm:my-16 md:my-20 rounded-2xl shadow-xl bg-white/50 backdrop-blur-sm grid place-items-center p-6 sm:p-8 md:p-12">
                    <div className="rounded-2xl txtColor-Org text-6xl sm:text-7xl md:text-8xl p-2"><IoMailUnreadSharp /></div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl mt-4 font-bold">Get in Touch</h3>
                    <p className="text-base sm:text-lg md:text-2xl my-6 leading-relaxed">Have questions, suggestions, or feedback? We'd love to hear from you. Your input helps us build better tools for the academic community.</p>


                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pb-4 w-full sm:w-auto">
                        <ContainBtn label="Contact Support" Icon={<IoIosMail className="text-2xl sm:text-3xl" />} />
                        <DisableBtn label="Feature Request" Icon={<VscGithub className="text-xl sm:text-2xl" />} />
                    </div>

                </div>



                <BsFillSuitHeartFill className="mx-auto text-red-600 text-lg sm:text-xl" />
                <p className="text-sm sm:text-base mt-2">Built by learners, for learners <br />because academic life deserves better tools!</p>



            </div>



        </div>



    );
}