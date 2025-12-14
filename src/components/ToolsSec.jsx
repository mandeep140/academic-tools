import ToolCardList from './toolCardList'
import DisableBtn from './disableBtn';
import { RiCameraLensFill } from "react-icons/ri";
import { MdGeneratingTokens } from "react-icons/md";

import { Link } from "react-router-dom";



export default function ToolsSec() {
    return (

        <section className="w-full bg-radial to-[#D8F2CF] from-[#ABE2C4] min-h-screen py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20 text-center">

            <div className="px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Popular Tools</h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6 md:my-8">
                    Discover our most-used academic tools that help thousands of students excel in their studies.
                </p>
            </div>

            <div className="my-10 sm:my-12 md:my-16 lg:my-20">
                <ToolCardList />
            </div>


            <Link to="/tools">
                <div className="flex justify-center">
                    <DisableBtn label="View All Tools" Icon={<RiCameraLensFill />} className="flex justify-center" />
                </div>
            </Link>

        </section>

    );
}