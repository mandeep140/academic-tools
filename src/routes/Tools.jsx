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
                <div className="pt-28 text-center">
                    <h3 className="text-5xl py-8 font-p">Explore Tools</h3>
                    <p className="text-xl">
                        Discover our comprehensive collection of academic tools designed to enhance your <br /> 
                        productivity and learning experience.
                    </p>

                    <div className="relative w-1/3 mx-auto">
                        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl" />
                        <input 
                            type="text" 
                            placeholder="Search Tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 rounded-full text-center text-sm my-12 border border-black w-full pl-10 pr-4 py-2" 
                        />
                    </div>

                    <div>
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

                <div className="py-16">
                    <span className="text-2xl font-medium ml-16 underline underline-offset-2 font-p">
                        Showing {filteredTools.length} of {allTools.length} Tools
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-16 my-8">
                        {filteredTools.length > 0 ? (
                            filteredTools.map((tool, index) => (
                                <Link to={tool.to} key={index}>
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
                                <p className="text-2xl font-medium text-gray-600">No tools found</p>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>

                    <div className="h-76 w-3/4 mx-auto text-center rounded-2xl shadow-xl/20 py-12 mt-20">
                        <h3 className="text-4xl my-8 font-p">Need a specific tool?</h3>
                        <p className="text-xl pb-12">Can't find what you're looking for? We're constantly adding new tools based on user feedback.</p>

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