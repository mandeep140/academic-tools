import DetailsBoxList from "./detailsBoxList";
import ContainBtn from "./containBtn"


export default function Details() {
    return (

        <section className="w-full bg-green-200  h-296  text-center">


            <div>
                <h2 className="pt-12">Why Choose Academic Tools?</h2>
                <p className="text-2xl my-8">Built by students, for students. Every tool is designed with academic
                    excellence in mind.</p>


                <div className="my-20">
                    <DetailsBoxList />
                </div>
            </div>





            <div className="mt-56">
                <h2>Ready to boost your productivity?</h2>
                <p className="text-2xl my-8" >Join thousands of students who have already transformed their academic workflow with our tools.</p>

                <ContainBtn label="Start Using Tools Now ++ " />
            </div>



        </section>

    );
}