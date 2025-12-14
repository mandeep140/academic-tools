import React from 'react';
import { Link } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import { RiCameraLensFill } from 'react-icons/ri';
import { BsSearchHeartFill } from 'react-icons/bs';
import ContainBtn from '../components/containBtn';
import DisableBtn from '../components/disableBtn';
import SBoxesList from '../components/SBoxesList';
import ToolCardList from '../components/toolCardList';
import DetailsBoxList from '../components/detailsBoxList';


const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 text-center bg-img">
                <span className="rounded-3xl bg-white mt-12 sm:mt-16 md:mt-24 mb-6 sm:mb-8 w-auto max-w-xs mx-auto flex items-center justify-center text-center px-4 sm:px-5 py-1.5 text-sm sm:text-base font-medium">
                    <LuSparkles className="txtColor-Org text-lg sm:text-xl" />&nbsp;&nbsp;15 Academic Tools & Growing
                </span>
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
                    <Link to="/tools">
                        <ContainBtn label="Explore All Tools" Icon={<LuSparkles />} />
                    </Link>
                    <Link to="/about">
                        <DisableBtn label="Learn More" />
                    </Link>
                </div>

                <div className="mx-auto px-4">
                    <SBoxesList />
                </div>
            </section>

            {/* Tools Section */}
            <section className="w-full bg-radial to-[#D8F2CF] from-[#ABE2C4] min-h-screen py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20 text-center">
                <div className="px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">Popular Tools</h2>
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

            {/* Details Section */}
            <section className="w-full bg-radial from-[#BDE3D8] to-[#E5EFCE] min-h-screen text-center py-8 sm:py-12 px-4 sm:px-8 md:px-12 lg:px-20">
                <div>
                    <h2 className="pt-6 sm:pt-8 md:pt-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4">Why Choose Academic Tools?</h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6 md:my-8 px-4">
                        Built by students, for students. Every tool is designed with academic excellence in mind.
                    </p>

                    <div className="my-10 sm:my-12 md:my-16 lg:my-20">
                        <DetailsBoxList />
                    </div>
                </div>

                <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-48">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4">Ready to boost your productivity?</h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6 md:my-8 pb-4 px-4">
                        Join thousands of students who have already transformed their academic workflow with our tools.
                    </p>

                    <Link to="/tools">
                        <div className="flex justify-center">
                            <ContainBtn label="Start Using Tools Now" Icon={<BsSearchHeartFill />} />
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;