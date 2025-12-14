"use client"
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

import Btns from "./btns"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white/30 backdrop-blur-lg w-[90vw] shadow-md
            fixed top-2 left-[50%] z-100 -translate-x-1/2 rounded-xl overflow-hidden">
            
            <div className="h-20 flex items-center justify-between px-6 md:px-20">
                <div className="flex items-center">
                    <AutoStoriesIcon /> &nbsp; &nbsp;
                    <Link to={"/"} className="text-xl font-bold">Academic Tools</Link>
                </div>

                <div className="hidden md:flex gap-1">
                    <Link to={"/"}>   <Btns label="Home" /></Link>
                    <Link to={"/tools"}> <Btns label="Tools" /> </Link>
                    <Link to={"/about"}> <Btns label="About" /> </Link>
                </div>

                <div className="md:hidden text-3xl cursor-pointer hover:text-amber-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoClose /> : <GiHamburgerMenu />}
                </div>
            </div>

            <div className={`flex flex-col md:hidden transition-all duration-300 ease-in-out
                ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <Link to={"/"} onClick={() => setIsOpen(false)} className="w-full text-center py-3 hover:bg-amber-50 transition-colors">
                    <Btns label="Home" />
                </Link>
                <Link to={"/tools"} onClick={() => setIsOpen(false)} className="w-full text-center py-3 hover:bg-amber-50 transition-colors">
                    <Btns label="Tools" />
                </Link>
                <Link to={"/about"} onClick={() => setIsOpen(false)} className="w-full text-center py-3 hover:bg-amber-50 transition-colors">
                    <Btns label="About" />
                </Link>
            </div>
        </div>
    )
}