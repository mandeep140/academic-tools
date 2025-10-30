//
import { Link } from "react-router-dom";



import ToolKit from "./ToolKit";
import DisableBtn from "./disableBtn"

// icons
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { MdPhotoLibrary } from "react-icons/md";
import { BsSearchHeartFill } from "react-icons/bs";                                                                                                         
import { FaCheckToSlot } from "react-icons/fa6";
import { SiUnderarmour } from "react-icons/si";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { FaFileCode } from "react-icons/fa";
import { ImCalculator } from "react-icons/im";
import { GiThermometerScale } from "react-icons/gi";
import { SiDictionarydotcom } from "react-icons/si";
import { RiCurrencyFill } from "react-icons/ri";
import { RiMindMap } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { RiBrainFill } from "react-icons/ri";
//

import { FaListCheck } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";

import { FaFilePen } from "react-icons/fa6";


















export default function ToolKitList() {
    return (



        <div className="Bg-Color  py-16">

            <span className="text-2xl font-medium ml-16  underline underline-offset-2  font-p  ">Showing  &nbsp; 15  of  15  &nbsp; Tools</span>

            <div className="    grid  grid-cols-1  md:grid-cols-2   lg:grid-cols-3   xl:grid-cols-4  gap-8   mx-16  my-8">




                <Link to={"/fileConverter"}>
                    <ToolKit bgcolor="bg-linear-to-t from-pink-300 to-sky-400" title="File Converter" para="Convert between PDF, Word, Excel, PPT, and Images" tags="File Management" icon={< FaEnvelopeOpenText />} />
                </Link>




                <ToolKit bgcolor="bg-linear-to-t from-sky-300 to-pink-400" title="Image Compressor & Resizer" para="Compress and resize images efficiently" tags="File Management" icon={< MdPhotoLibrary />} />
                <ToolKit bgcolor="bg-linear-to-t from-sky-200 to-blue-500" title="Plagiarism Checker" para="Check text for plagiarism and originality" tags="Writing Tools" icon={<BsSearchHeartFill />} />
                <ToolKit bgcolor="bg-linear-to-t from-pink-200 to-pink-700" title="Grammar & Spell Checker" para="Check and correct grammar and spelling errors" tags="Writing Tools" icon={< FaCheckToSlot />} />
                <ToolKit bgcolor=" bg-linear-to-t from-yellow-200 to-pink-700     " title="Citation & Reference Generator" para="Generate APA, MLA, and IEEE citations" tags="Writing Tools" icon={<SiUnderarmour />} />
                <ToolKit bgcolor="  bg-linear-to-t from-pink-300 to-purple-700 " title="PDF Tools" para="Merge, split, protect, and annotate PDFs" tags="File Management" icon={< BsFillFileEarmarkPdfFill />} />
                <ToolKit bgcolor="bg-linear-to-t from-pink-400 to-purple-700" title="Code Formatter & Beautifier" para="Format and beautify code in multiple languages" tags="Development" icon={<FaFileCode />} />
                <ToolKit bgcolor=" bg-linear-to-t from-green-300 to-purple-500  " title="Math Equation Solver" para="Solve mathematical equations step-by-step" tags="Academic" icon={< ImCalculator />} />
                <ToolKit bgcolor=" bg-linear-to-t from-blue-400 to-pink-600     " title="Unit Converter" para="Convert between different units of measurement" tags="Utilities" icon={< GiThermometerScale />} />
                <ToolKit bgcolor="  bg-linear-to-t from-red-100 to-purple-800   " title="Dictionary & Thesaurus" para="Look up definitions and synonyms" tags="  Reference" icon={<SiDictionarydotcom />} />
                <ToolKit bgcolor="  bg-linear-to-t from-pink-200 to-maroon-800   " title="Currency Converter" para="Convert between different currencies with real-time rates" tags="Utilities" icon={<RiCurrencyFill />} />
                <ToolKit bgcolor="  bg-linear-to-t from-sky-100 to-sky-800   " title="Mind Map & Flowchart Generator" para="Create visual mind maps and flowcharts" tags="Academic" icon={<RiMindMap />} />
                <ToolKit bgcolor="  bg-linear-to-t from-pink-100 to-pink-900   " title="To-Do List & Task Manager" para="Organize tasks with due dates and progress tracking" tags="Productivity" icon={< LuListTodo />} />
                <ToolKit bgcolor="  bg-linear-to-t from-red-400 to-purple-800   " title="Notes Summarizer" para="Generate concise summaries from your notes" tags="Study Tools" icon={<GiNotebook />} />
                <ToolKit bgcolor="  bg-linear-to-t from-pink-300 to-yellow-700   " title="Flashcards & Quiz Generator" para="Create and study with digital flashcards" tags="Study Tools" icon={<RiBrainFill />} />

            </div>






            <div className=" h-76  w-3/4  mx-auto  text-center rounded-2xl  shadow-xl/20  py-12  mt-20 ">
                <h3 className=" text-4xl  my-8  font-p">Need a specific tool?</h3>
                <p className="text-xl  pb-12">Can't find what you're looking for? We're constantly adding new tools based on user feedback.</p>
                <DisableBtn label="Contact Us" />
            </div>

        </div >



    );
}