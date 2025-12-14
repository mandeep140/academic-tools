import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosWarning } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import ContainBtn from '../components/containBtn';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-100 via-green-100 to-amber-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Icon */}
                <div className="mb-8 mt-20 flex justify-center">
                    <div className="relative">
                        <div className="text-9xl font-bold text-amber-500/20">404</div>
                        <IoIosWarning className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-amber-500" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Oops! Page Not Found
                </h1>

                {/* Message */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaTools className="text-3xl text-amber-500" />
                        <h2 className="text-2xl font-semibold text-gray-700">Tool Not Available</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        The tool you are looking for does not exist or is currently in development.
                    </p>
                    <p className="text-md text-gray-500 mt-4">
                        We're constantly working on adding new features and tools to enhance your experience.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/tools">
                        <div className="transform hover:scale-105 transition-transform">
                            <ContainBtn 
                                label="Browse Available Tools" 
                                Icon={<FaTools />}
                            />
                        </div>
                    </Link>
                    
                    <Link to="/">
                        <button className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-xl border-2 border-amber-500 hover:bg-amber-50 transition-colors shadow-md">
                            Go to Home
                        </button>
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-sm text-gray-500">
                    <p>Looking for something specific?</p>
                    <p className="mt-2">Let us know what tools you need and we'll prioritize development.</p>
                </div>
            </div>
        </div>
    );
}
