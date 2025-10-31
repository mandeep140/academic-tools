import ToolCardList from './toolCardList'
import DisableBtn from './disableBtn';
import { RiCameraLensFill } from "react-icons/ri";
import { MdGeneratingTokens } from "react-icons/md";


export default function ToolsSec() {
    return (

        <section className="w-full bg-[#e9f8d8]  h-256  py-16 px-20 text-center">

            <div className="">
                <h2> Popular Tools</h2>
                <p className="text-2xl  my-8"> Discover our most-used academic tools that help thousands of students <br /> excel in their studies.</p>
            </div>

            <div className="my-20" >
                <ToolCardList />
            </div>

            <div className='flex justify-center '>
                <DisableBtn label="View All 15 Tools  " Icon={<RiCameraLensFill />} className="flex  justify-center " />
            </div>
        </section>

    );
}