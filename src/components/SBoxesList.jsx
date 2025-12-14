import SBoxes from './SBoxes'


import { FaUserGroup } from "react-icons/fa6";
import { BsFillStopwatchFill } from "react-icons/bs";
import { RiStarSmileFill } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";



export default function SBoxesList() {
    return (

        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>

            <SBoxes title="X+" content="Students Helped" icon={<FaUserGroup/>} />
            <SBoxes title="X+" content="Hours Saved" icon={<BsFillStopwatchFill/>} />
            <SBoxes title="XX" content="User Rating" icon={<RiStarSmileFill/>} />
            <SBoxes title="04" content="Powerful Tools" icon={<FaBoxes />} />

        </div>

    );
}