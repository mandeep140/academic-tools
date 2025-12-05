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



        <div className="  py-16">

            <span className="text-2xl font-medium ml-16  underline underline-offset-2  font-p  ">Showing  &nbsp; 15  of  15  &nbsp; Tools</span>

            <div className="    grid  grid-cols-1  md:grid-cols-2   lg:grid-cols-3   xl:grid-cols-4  gap-8   mx-16  my-8">




                <Link to={"/fileConverter"}>
                    <ToolKit bgcolor="bg-linear-to-t from-pink-300 to-sky-400" title="File Converter" para="Convert between PDF, Word, Excel, PPT, and Images" tags="File Management" icon={< FaEnvelopeOpenText />} />
                </Link>


                <Link to={"/imageCompressor"}>
                    <ToolKit bgcolor="bg-linear-to-t from-sky-300 to-pink-400" title="Image Compressor & Resizer" para="Compress and resize images efficiently" tags="File Management" icon={< MdPhotoLibrary />} />
                </Link>


                <Link to={"/pdftools"}>
                    <ToolKit bgcolor="  bg-linear-to-t from-pink-300 to-purple-700 " title="PDF Tools" para="Merge, split, protect, and annotate PDFs" tags="File Management" icon={< BsFillFileEarmarkPdfFill />} />
                </Link>

                <Link to={"/imageEditor"}>
                    <ToolKit bgcolor="  bg-linear-to-t from-pink-100 to-pink-900   " title="Image Editor" para="Advanced image editing with filters and effects" tags="Image Tools" icon={< LuListTodo />} />
                </Link>




                <Link to={"/excelFile"}>
                    <ToolKit bgcolor="  bg-linear-to-t from-pink-300 to-yellow-700   " title="Excel File Read / Write" para="Read and write Excel files with ease" tags="File Conversion" icon={<RiBrainFill />} />
                </Link>

                <Link to={"/CropAndEdit"}>
                    <ToolKit bgcolor="  bg-linear-to-t from-sky-100 to-sky-800   " title="Crop / Edit" para="Crop and edit images with precision" tags="Image Tools" icon={<RiMindMap />} />
                </Link>

                <Link to={"/ImageFormatConverter "}>
                    <ToolKit bgcolor="  bg-linear-to-t from-pink-200 to-maroon-800   " title="Format Convert (JPG↔PNG↔WebP) " para="Convert between JPG, PNG, and WebP formats" tags="Image Tools" icon={<RiCurrencyFill />} />
                </Link>

                <Link to={"/BgRemoval"}>

                    <ToolKit bgcolor="  bg-linear-to-t from-red-100 to-purple-800   " title=" Background Removal (AI, local)" para="Remove image backgrounds using AI locally" tags=" Image Tools " icon={<SiDictionarydotcom />} />
                </Link>

                <Link to={"/PdfRenderAndView"}>
                    <ToolKit bgcolor=" bg-linear-to-t from-blue-400 to-pink-600     " title="PDF Render / View" para=" View and render PDF files in your browser" tags="PDF Tools" icon={< GiThermometerScale />} />
                </Link>



                <Link to={"/DocsToHtml"}>
                    <ToolKit bgcolor="  bg-linear-to-t from-red-400 to-purple-800   " title="DOCX ↔ PDF / HTML" para="Convert DOCX to PDF or HTML and vice versa" tags="File Conversion " icon={<GiNotebook />} />
                </Link>




                <ToolKit bgcolor="bg-linear-to-t from-pink-200 to-pink-700" title="Grammar & Spell Checker" para="Check and correct grammar and spelling errors" tags="Writing Tools" icon={< FaCheckToSlot />} />
                <ToolKit bgcolor=" bg-linear-to-t from-yellow-200 to-pink-700     " title="Citation & Reference Generator" para="Generate APA, MLA, and IEEE citations" tags="Writing Tools" icon={<SiUnderarmour />} />

                <ToolKit bgcolor="bg-linear-to-t from-pink-400 to-purple-700" title="Code Formatter & Beautifier" para="Format and beautify code in multiple languages" tags="Development" icon={<FaFileCode />} />
                <ToolKit bgcolor=" bg-linear-to-t from-green-300 to-purple-500  " title="Math Equation Solver" para="Solve mathematical equations step-by-step" tags="Academic" icon={< ImCalculator />} />



            </div>






            <div className=" h-76  w-3/4  mx-auto  text-center rounded-2xl  shadow-xl/20  py-12  mt-20 ">
                <h3 className=" text-4xl  my-8  font-p">Need a specific tool?</h3>
                <p className="text-xl  pb-12">Can't find what you're looking for? We're constantly adding new tools based on user feedback.</p>

                <div className="flex justify-center">
                    <DisableBtn label="Contact Us" />
                </div>

            </div>

        </div >



    );
}