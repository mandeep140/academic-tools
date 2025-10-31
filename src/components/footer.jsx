import Btns from "./btns";
import { Link } from "react-router-dom";

export default function Footer() {
    return (

        <div className="text-center  p-8  ">
            <p className="text-lg mb-4">© 2024 Academic Tools. Built to make student productivity faster, easier, and smarter.</p>

            
                <Link to={"/about"}> <Btns label=" About " />  </Link>
                <Link to={"/tools"}> <Btns label=" All Tools " /> </Link>
            





        </div>

    );
}