import DetailsBoxList from "./detailsBoxList";
import ContainBtn from "./containBtn"
import { BsSearchHeartFill } from "react-icons/bs";

import { Link } from "react-router-dom";


export default function Details() {
    return (

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

    );
}