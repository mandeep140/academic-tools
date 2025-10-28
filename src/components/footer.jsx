import Btns from "./btns";


export default function Footer() {
    return(

        <div className="text-center  p-8  ">
            <p className="text-xl mb-4">© 2024 Academic Tools. Built to make student productivity faster, easier, and smarter.</p>
        <Btns label=" About "  />
        <Btns label=" All Tools "  />
        
        </div>

    );
}