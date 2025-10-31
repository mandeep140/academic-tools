import DetailsBoxList from "./detailsBoxList";
import ContainBtn from "./containBtn"
import { BsSearchHeartFill } from "react-icons/bs";


export default function Details() {
    return (

        <section className="w-full  bg-t  h-278  text-center  pt-3">


            <div>
                <h2 className="pt-12">Why Choose Academic Tools?</h2>
                <p className="text-2xl my-8">Built by students, for students. Every tool is designed with academic <br />  excellence in mind.</p>


                <div className="my-20  ">
                    <DetailsBoxList />
                </div>
            </div>





            <div className="mt-48">
                <h2>Ready to boost your productivity?</h2>
                <p className="text-2xl my-8  pb-4" >Join thousands of students who have already transformed their academic <br />  workflow with our tools.</p>



                <div className="flex justify-center">
                    <ContainBtn label="Start Using Tools Now " Icon={< BsSearchHeartFill />} />
                </div>

            </div>



        </section>

    );
}