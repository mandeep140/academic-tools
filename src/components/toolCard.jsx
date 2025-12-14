import { Link } from 'react-router-dom';

export default function ToolCard({ title, para, icon, to = '/tools' }) {
    return (
        <Link to={to} className="block h-full">
            <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 border border-red-200/50 flex flex-col cursor-pointer">

                <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white shadow-md"> {icon} </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-left line-clamp-2"> {title} </h3>
                </div>

                <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed text-left flex-grow line-clamp-3"> {para} </p>
                
                <span className="font-semibold text-lg text-amber-600 hover:text-amber-700 inline-flex items-center gap-2 transition-colors group mt-auto">
                    Try it now 
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </span>

            </div>
        </Link>
    );
}