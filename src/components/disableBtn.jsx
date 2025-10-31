export default function DisableBtn({ label, Icon }) {


    return (

        <button class="  font-bold font-roboto text-lg  text-amber-600   flex items-center  gap-3 
        border-2  border-solid border-amber-600  rounded-4xl  py-2 px-8  
    hover:bg-amber-600  hover:text-white cursor-pointer  duration-200"> {label}  {Icon} </button>
    );
}     