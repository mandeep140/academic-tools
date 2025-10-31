import { Link } from "react-router-dom";


import Btns from "./btns"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function NavBar() {
    return (
        <div className="bg-white/30  backdrop-blur-lg  w-[90vw]  h-20  shadow-md flex rounded-xl
            items-center  justify-between px-20 fixed top-2 left-[50%]  z-100  -translate-x-1/2" >

            <div className=" flex  items-center ">
                <AutoStoriesIcon /> &nbsp; &nbsp;
                <h3 className=" text-xl  font-bold">Academic Tools</h3>
            </div>


            <div>

                <Link to={"/"}>   <Btns label="Home" /></Link>

                <Link to={"/tools"}> <Btns label="Tools" /> </Link>
                <Link to={"/about"}> <Btns label="About" /> </Link>
            </div>
        </div>
    )
}