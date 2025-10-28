export default function ToolCard({ title, para, icon }) {
    return (

        <div className=" w-104  h-56   bg-pink-200 rounded-xl text-center">


            <div className="flex  items-center justify-between ml-6 mr-12 mt-4">
                <div className="h-16  w-16 rounded-3xl bg-amber-100 grid  place-items-center text-amber-600   "> {icon}  </div>
                <span className="text-2xl font-semibold  mr-auto  ml-4"> {title}  </span>
            </div>


            <p className="text-xl mt-8 mb-4"> {para} </p>
            <span className="font-medium text-lg  mr-48"> <a href="#"> Try it now &nbsp; -+ </a></span>

        </div>

    );
}