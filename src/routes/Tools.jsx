import React, { useState } from 'react'
import ToolKit from "../components/ToolKit";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { MdPhotoLibrary } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import DisableBtn from '../components/disableBtn';
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import DesignBtn from '../components/designBtn';


const Tools = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Tools');

    // All available tools
    const allTools = [
        {
            to: "/file-convert",
            bgcolor: "bg-linear-to-t from-pink-300 to-sky-400",
            title: "File Converter",
            para: "Convert between PDF, Word, Excel, PPT, and Images",
            tags: "File Conversion",
            icon: <FaEnvelopeOpenText />
        },
        {
            to: "/imageCompressor",
            bgcolor: "bg-linear-to-t from-sky-300 to-pink-400",
            title: "Image Compressor & Resizer",
            para: "Compress and resize images efficiently",
            tags: "Image Tools",
            icon: <MdPhotoLibrary />
        },
        {
            to: "/pdftools",
            bgcolor: "bg-linear-to-t from-pink-300 to-purple-700",
            title: "PDF Tools",
            para: "Merge, split, protect, and annotate PDFs",
            tags: "PDF Tools",
            icon: <BsFillFileEarmarkPdfFill />
        },
        {
            to: "/imageEditor",
            bgcolor: "bg-linear-to-t from-pink-100 to-pink-900",
            title: "Image Editor",
            para: "Advanced image editing with filters and effects",
            tags: "Image Tools",
            icon: <LuListTodo />
        }
    ];

    // Filter tools based on search and category
    const filteredTools = allTools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.para.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.tags.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All Tools' || tool.tags === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <div className=" bg-linear-to-r/decreasing from-sky-100 to-teal-300">
                {/* Search Section */}
                <div className="pt-20 sm:pt-24 md:pt-28 text-center px-4">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl py-6 sm:py-8 font-p">Explore Tools</h3>
                    <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto">
                        Discover our comprehensive collection of academic tools designed to enhance your productivity and learning experience.
                    </p>

                    <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
                        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl sm:text-2xl" />
                        <input 
                            type="text" 
                            placeholder="Search Tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 sm:h-12 rounded-full text-center text-sm sm:text-base my-8 sm:my-10 md:my-12 border border-black w-full pl-10 pr-4 py-2" 
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        <span onClick={() => setSelectedCategory('All Tools')}>
                            <DesignBtn label="All Tools" />
                        </span>
                        <span onClick={() => setSelectedCategory('PDF Tools')}>
                            <DesignBtn label="PDF Tools" />
                        </span>
                        <span onClick={() => setSelectedCategory('Image Tools')}>
                            <DesignBtn label="Image Tools" />
                        </span>
                        <span onClick={() => setSelectedCategory('File Conversion')}>
                            <DesignBtn label="File Conversion" />
                        </span>
                    </div>
                </div>

                <div className="py-8 sm:py-12 md:py-16">
                    <span className="text-lg sm:text-xl md:text-2xl font-medium ml-4 sm:ml-8 md:ml-16 underline underline-offset-2 font-p block">
                        Showing {filteredTools.length} of {allTools.length} Tools
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-8 md:mx-16 my-6 sm:my-8 justify-items-center">
                        {filteredTools.length > 0 ? (
                            filteredTools.map((tool, index) => (
                                <Link to={tool.to} key={index} className="w-full max-w-sm">
                                    <ToolKit 
                                        bgcolor={tool.bgcolor}
                                        title={tool.title}
                                        para={tool.para}
                                        tags={tool.tags}
                                        icon={tool.icon}
                                    />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl sm:text-2xl font-medium text-gray-600">No tools found</p>
                                <p className="text-base sm:text-lg text-gray-500 mt-2">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>

                    <div className="max-w-4xl mx-auto text-center rounded-2xl shadow-xl/20 py-8 sm:py-10 md:py-12 mt-12 sm:mt-16 md:mt-20 px-4">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl my-6 sm:my-8 font-p">Need a specific tool?</h3>
                        <p className="text-base sm:text-lg md:text-xl pb-8 sm:pb-10 md:pb-12">Can't find what you're looking for? We're constantly adding new tools based on user feedback.</p>

                        <div className="flex justify-center">
                            <DisableBtn label="Contact Us" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Tools