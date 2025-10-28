import DisableBtn from "./disableBtn";
import ContainBtn from "./containBtn";
import { LuSparkles } from "react-icons/lu";

import SBoxesList from './SBoxesList'




export default function HeroSec() {
    return (
        <section className="w-full Bg-Color  h-228  py-20 px-20   text-center ">



            
                
                <span  className="rounded-3xl bg-white mt-24  mb-8   w-76  mx-auto  flex  text-center  px-6  py-1.5  font-medium" > 
                    < LuSparkles className=" txtColor-Org  text-xl"/>  &nbsp;  &nbsp;  15 Academic Tools & Growing </span>
            


            <span className="poppins  w-full text-7xl font-medium">Academic Tools </span> <br />
            <span className="  poppins  w-full  text-7xl  text-amber-500 font-medium "> Made Simple </span>



            <p className="my-12 text-2xl/10   ">
                Supercharge your academic productivity with our comprehensive suite  <br /> of
                <span className=" text-amber-500 font-semibold"> AI-powered</span>   tools designed specifically for students and researchers.
            </p>

            <div className="mb-16">
                <ContainBtn label="Explore All Tools -> " />   &nbsp;  &nbsp;
                <DisableBtn label="Learn More " />
            </div>

            <div className="mx-auto  ">
                <SBoxesList />
            </div>


        </section>

    );
}