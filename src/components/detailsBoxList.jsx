import DetailsBox from "./detailsBox";

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


export default function DetailsBoxList() {
    return(
        <div  className="grid  place-items-center grid-cols-3 ">

            <DetailsBox  title="Lightning Fast "  para="Get results in seconds, not minutes. Our optimized tools work at the speed of thought."  icon={ <ElectricBoltIcon sx={{ fontSize: 48 }} /> } bgcolor="bg-red-600"  />
            <DetailsBox  title="Academic Focused"  para="Every feature is designed specifically for academic work. No bloat, just what you need."  icon={ <TrackChangesIcon/> }/>
            <DetailsBox  title="Always Free"  para="Quality academic tools should be accessible to everyone. All features, completely free."  icon={ <AutoAwesomeIcon/> }/>

        </div>
    );
}