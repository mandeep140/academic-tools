import { Link } from "react-router-dom";


import Btns from "./btns"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function NavBar() {
    return (
        <div className="bg-white  w-full  h-20  shadow-md flex  items-center  justify-around fixed top-0 left-0">

            <div className=" flex  items-center ">
                <AutoStoriesIcon /> &nbsp; &nbsp;
                <h3 className=" text-xl  font-bold">Academic Tools</h3>
            </div>


            <div>

                <Link to={"/"}>   <Btns label="Home" /></Link>

                <Link to={"/tools"}> <Btns  label= "Tools" /> </Link>
                <Link to={"/about"}> <Btns label="About" /> </Link>
            </div>
        </div>
    )
}