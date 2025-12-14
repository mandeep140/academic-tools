import DetailsBox from "./detailsBox";

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


export default function DetailsBoxList() {
    return(
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 place-items-center px-4">

            <DetailsBox title="Lightning Fast" para="Get results in seconds, not minutes. Our optimized tools work at the speed of thought." icon={<ElectricBoltIcon sx={{ fontSize: 40 }} />}  />
            <DetailsBox title="Academic Focused" para="Every feature is designed specifically for academic work. No bloat, just what you need." icon={<TrackChangesIcon sx={{ fontSize: 40 }}/>}  />
            <DetailsBox title="Always Free" para="Quality academic tools should be accessible to everyone. All features, completely free." icon={<AutoAwesomeIcon sx={{ fontSize: 40 }} />}  />

        </div>
    );
}