import ToolCard from "./toolCard";

// icons 
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import GeneratingTokensOutlinedIcon from '@mui/icons-material/GeneratingTokensOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// 


export default function ToolCardList() {
    return (

        <div className="  grid grid-cols-3  grid-rows-2 items-center justify-items-center  gap-y-12  ">

            <ToolCard title="File Converter" para="Convert between PDF, Word, Excel, PPT, and Images" icon={<DescriptionOutlinedIcon      />} />
            <ToolCard title="Image Compressor" para="Compress and resize images efficiently" icon={<CollectionsOutlinedIcon    />} />
            <ToolCard title="Crop / Edit" para="Crop and edit images with precision" icon={<SearchOutlinedIcon    />} />
            <ToolCard title="DOCX ↔ PDF / HTML" para="Convert DOCX to PDF or HTML and vice versa" icon={<TaskAltOutlinedIcon    />} />
            <ToolCard title="Background Removal " para="Remove image backgrounds using AI locally" icon={<GeneratingTokensOutlinedIcon    />} />
            <ToolCard title="PDF Tools" para="Merge, split, protect, and compress PDFs" icon={<PictureAsPdfOutlinedIcon    />} />

        </div >
    );
}