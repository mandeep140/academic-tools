export default function DetailsBox({icon, title, para, bgcolor}) {
    return(

        <div  className="h-72  w-lg bg-green-200 rounded-2xl      grid  place-items-center">
            <div className={ `h-24 w-24 rounded-3xl  grid  place-items-center ${bgcolor}`   }  >  {icon} </div>
            <h3 className="text-3xl  font-bold">   {title} </h3>
            <p className="text-2xl ">  {para} </p>
        </div>

    );
}