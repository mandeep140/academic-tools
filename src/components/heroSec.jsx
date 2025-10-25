import DisableBtn from "./disableBtn";
import ContainBtn from "./containBtn";

import SBoxesList from './SBoxesList'




export default function HeroSec() {
    return (
        <section className="w-full bg-[#dfffc4]  h-228  py-16 px-20  text-center ">



            <div className="rounded-2xl bg-white mt-12  mb-8  h-8 w-84  mx-auto">
                icon
                <span  >  15 Academic Tools & Growing </span>
            </div>


            <span className="w-full text-8xl font-medium">Academic Tools </span> <br />
            <span className="w-full  text-8xl  text-amber-500 font-medium "> Made Simple </span>



            <p className="my-16 text-3xl">
                Supercharge your academic productivity with our comprehensive suite of <br />
                <span className=" text-amber-500 font-semibold"> AI-powered</span>   tools designed specifically for students and researchers.
            </p>

            <div className="mb-16">
                <ContainBtn label="Explore All Tools -> " />   &nbsp;  &nbsp;
                <DisableBtn label="Learn More " />
            </div>

            <div className="mx-auto">
                <SBoxesList />
            </div>


        </section>

    );
}