export default function StCard({ icon, title, content, }) {



    return (
        <div className="h-40   w-52  grid  place-items-center ">


            <div className="  h-16 w-16 rounded-[50%] bg-green-400 grid  place-items-center  text-[#f9b94e]" > 333{icon}  </div>
            <div className="  text-4xl"> {title}  </div>
            <p className=" text-2xl "> {content} </p>

        </div>
    )
}