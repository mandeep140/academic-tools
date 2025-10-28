export default function StCard({ icon, title, content, }) {



    return (
        <div className="h-40   w-52  grid  place-items-center ">


            <div className="  h-16 w-16 rounded-[50%] bg-blue-100   grid  place-items-center  text-3xl  txtColor-Org " > {icon}  </div>
            <div className="  text-3xl"> {title}  </div>
            <p className=" text-xl "> {content} </p>

        </div>
    )
}