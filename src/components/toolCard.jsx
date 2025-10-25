export default function ToolCard({ title, para, icon }) {
    return (

        <div className=" w-md  h-56   bg-white rounded-2xl text-center">


            <div className="flex  items-center justify-between ml-6 mr-12 mt-4">
                <div className="h-16  w-16 rounded-3xl bg-amber-100 grid  place-items-center text-amber-600 "> {icon}  </div>
                <span className="text-2xl font-semibold"> {title}  </span>
            </div>


            <p className="text-xl mt-8 mb-4"> {para} </p>
            <span className="font-medium text-xl"> <a href="#"> Try it now &nbsp; -+ </a></span>

        </div>

    );
}