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
            <ToolCard title="Plagiarism Checker" para="Check text for plagiarism and originality" icon={<SearchOutlinedIcon    />} />
            <ToolCard title="Grammar Checker" para="Check and correct grammar and spelling errors" icon={<TaskAltOutlinedIcon    />} />
            <ToolCard title="Citation Generator" para="Generate APA, MLA, and IEEE citations" icon={<GeneratingTokensOutlinedIcon    />} />
            <ToolCard title="PDF Tools" para="Merge, split, protect, and compress PDFs" icon={<PictureAsPdfOutlinedIcon    />} />

        </div >
    );
}