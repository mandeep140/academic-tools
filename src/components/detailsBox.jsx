export default function DetailsBox({icon, title, para, bgcolor}) {
    return(

        <div  className="h-66  w-md rounded-2xl     grid  place-items-center">
            <div className={ ` rounded-2xl  p-4 ${bgcolor}  `   }  >  {icon} </div>
            <h3 className="text-2xl  font-bold  font-p">   {title} </h3>
            <p className="text-lg ">  {para} </p>
        </div>

    );
}