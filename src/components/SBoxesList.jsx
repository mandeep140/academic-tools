import SBoxes from './SBoxes'


import { FaUserGroup } from "react-icons/fa6";
import { BsFillStopwatchFill } from "react-icons/bs";
import { RiStarSmileFill } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";



export default function SBoxesList() {
    return (

        <div  className='h-40  w-[80%]   justify-evenly  mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4' >

            <SBoxes  title="X+"  content="Students Helped"           icon={<FaUserGroup/>}          />
            <SBoxes  title="X+"  content="Hours Saved"            icon={<BsFillStopwatchFill/>}          />
            <SBoxes  title="XX"  content="User Rating"           icon={< RiStarSmileFill/>}          />
            <SBoxes  title="15"  content="Powerful Tools"           icon={<FaBoxes />}          />

        </div>

    );
}