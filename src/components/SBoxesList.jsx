import SBoxes from './SBoxes'

export default function SBoxesList() {
    return (

        <div  className='h-40  w-[80%]  flex justify-evenly  mx-auto'>

            <SBoxes  title="X+"  content="Students Helped" />
            <SBoxes  title="X+"  content="Hours Saved" />
            <SBoxes  title="XX"  content="User Rating" />
            <SBoxes  title="15"  content="Powerful Tools" />

        </div>

    );
}