export default function DisableBtn({ label, icon }) {


    return (

        <button class="  font-bold font-roboto text-lg  text-amber-600   
        border-2  border-solid border-amber-600  rounded-4xl  py-2 px-8  
    hover:bg-amber-600  hover:text-white cursor-pointer  duration-200"> {label}  {icon} </button>
    );
}     