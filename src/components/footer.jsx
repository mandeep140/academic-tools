import { Link } from "react-router-dom";

export default function Footer() {
    return (

        <div className="text-center  p-8 shadow-lg ">
            <p className="text-md font-light mb-4">© 2025 Academic Tools. Built to make student productivity faster, easier, and safer.</p>
            <span className="gap-6 flex flex-wrap justify-center items-center">
            <Link to={"/about"}> About </Link>
            <Link to={"/tools"}> All Tools </Link>
            </span>
        </div>

    );
}