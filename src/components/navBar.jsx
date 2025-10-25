import { Link } from "react-router-dom";


import Btns from "./btns"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function NavBar() {
    return (
        <div className="bg-yellow-500  w-full  h-20  flex  items-center  justify-around fixed top-0 left-0">

            <div className=" flex  items-center ">
                <AutoStoriesIcon /> &nbsp; &nbsp;
                <h3 className=" text-xl  font-bold">Academic Tools</h3>
            </div>


            <div>

                <Link to={"/"}>   <Btns label="Home" /></Link>

                <Btns label="Tools" />
                <Link to={"/about"}> <Btns label="About" /> </Link>
            </div>
        </div>
    )
}