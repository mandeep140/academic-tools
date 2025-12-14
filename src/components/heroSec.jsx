import DisableBtn from "./disableBtn";
import ContainBtn from "./containBtn";
import { LuSparkles } from "react-icons/lu";

import SBoxesList from './SBoxesList'

import { Link } from "react-router-dom";


export default function HeroSec() {
    return (
        <section className="w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 text-center bg-img">
            <span className="rounded-3xl bg-white mt-12 sm:mt-16 md:mt-24 mb-6 sm:mb-8 w-auto max-w-xs mx-auto flex items-center justify-center text-center px-4 sm:px-5 py-1.5 text-sm sm:text-base font-medium">
                <LuSparkles className="txtColor-Org text-lg sm:text-xl" />&nbsp;&nbsp;15 Academic Tools & Growing</span>
            <h1 className="poppins w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium px-4">
                Academic Tools
            </h1>

            <h1 className="poppins w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-500 font-medium px-4">
                Made Simple
            </h1>

            <p className="my-6 sm:my-8 md:my-12 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4">
                Supercharge your academic productivity with our comprehensive suite of
                <span className="text-amber-500 font-semibold"> AI-powered</span> tools designed specifically for students and researchers.
            </p>

            <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link to={"/tools"}>
                    <ContainBtn label="Explore All Tools" Icon={<LuSparkles />} />
                </Link>
                <Link to={"/about"}>
                    <DisableBtn label="Learn More" />
                </Link>
            </div>

            <div className="mx-auto px-4">
                <SBoxesList />
            </div>


        </section>

    );
}