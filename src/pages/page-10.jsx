export default function DocsToHtml() {

    const DocxBox = [

        {
            icon: " $$",
            value: "DOCX → PDF",
            label: "Convert DOCX files to PDF format",
        },

        {
            icon: "",
            value: "DOCX → HTML",
            label: " Convert DOCX  files to HTML format",
        },

        {
            icon: "",
            value: "PDF → DOCX",
            label: " Convert PDF  to DOCX",
        },

        {
            icon: "",
            value: "HTML → DOCX",
            label: " Convert HTML to DOCX",
        },


    ];




    const Card = [

        {
            icon: " $$",
            value: "Preserve Formatting",
            label: "Keep your document style",
        },

        {
            icon: "%%",
            value: "High Quality",
            label: "Professional output ",
        },

        {
            icon: "%%",
            value: "Fast Conversion",
            label: "Process in seconds ",
        },

    ];



    return (
        <div className="bg-two pt-36 text-center pb-28">
            <h2>Document Converter</h2>
            <p className="text-xl p-3">Convert between DOCX, PDF, and HTML formats</p>


            <div className="bg-amber-500  w-2/3  mx-auto rounded-xl  shadow-xl p-4  mt-4">
                <h3 className="font-semibold text-gray-800 text-xl p-3 pt-4">DOCX ↔ PDF / HTML Converter</h3>
                <p className="text-lg pb-8">Select conversion mode and upload your file</p>
                {/* b */}
                <div className="grid  grid-cols-1  md:grid-cols-2 justify-center   ">
                    {DocxBox.map((item, index) => (

                        <div
                            key={index}
                            className="bg-pink-400  rounded-xl  p-4 flex gap-6  items-center justify-center m-8 shadow-lg"
                        >


                            <div className="bg-amber-500  p-4 px-6 "> {item.icon} </div>

                            <div>
                                <h3>{item.value} </h3>
                                <p>{item.label} </p>
                            </div>

                        </div>

                    ))
                    }
                </div>

                {/* c */}



                <div className="rounded-2xl  shadow-xl    bg-amber-100">
                    <div
                        className="border-2 border-dashed border-yellow-100 rounded-xl p-12  mb-4
                        flex flex-col items-center justify-center text-center hover:border-yellow-500 transition"
                    >
                        <div className="text-6xl  text-yellow-600"> %% </div>
                        <h3 className="font-semibold text-gray-800 text-lg p-2 pt-4"> Click to upload DOCX file</h3>
                        <p className="text-sm"> Supported format: DOCX </p>
                    </div>
                </div>


                {/* d */}

                <div className="flex pt-6   justify-around    " >

                    {Card.map((item, index) => (

                        <div
                            key={index}
                            className="bg-red-300  rounded-2xl  shadow-2xl  p-12  px-20 hover:border-yellow-500  hover:border-2 transition hover:scale-105 "
                        >

                            <div className="bg-yellow-500  text-4xl    p-3  rounded-2xl">{item.icon} </div>

                            <div>
                                <h3 className="text-lg  p-2">{item.value} </h3>
                                <p>{item.label}</p>
                            </div>











                        </div>








                    ))};

                </div>











            </div>




















        </div>
    );
}