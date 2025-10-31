

export default function OrgButton({ label,  Icon  }) {

    const handleclick = () => {
        console.log("btn clicked");
    };

    return (
        <button onClick={handleclick} 

            className="  text-xl    bg-amber-500  text-white font-bold  rounded-4xl  py-2 px-8  flex  items-center gap-3 
            border  border-solid border-amber-500 cursor-pointer "

        > {label } {Icon} </button>

    );
}