import ToolCard from "./toolCard";

// icons 
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



export default function ToolCardList() {
    return (

        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mx-auto mb-12 sm:mb-16 md:mb-24 px-4">

            <ToolCard to="/file-convert" title="File Converter" para="Convert between PDF, Word, Excel, PPT, and Images" icon={<DescriptionOutlinedIcon />} />
            <ToolCard to="/imageCompressor" title="Image Compressor" para="Compress and resize images efficiently" icon={<CollectionsOutlinedIcon />} />
            <ToolCard to="/imageEditor" title="Image Editor" para="Crop, edit and enhance images with precision" icon={<SearchOutlinedIcon />} />
        </div>
    );
}