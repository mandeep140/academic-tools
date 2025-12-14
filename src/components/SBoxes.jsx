export default function StCard({ icon, title, content, }) {



    return (
        <div className="w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] p-4 grid place-items-center">


            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-orange-200/30 backdrop-blur-sm grid place-items-center text-2xl sm:text-3xl txtColor-Org">{icon}</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium mt-2">{title}</div>
            <p className="text-base sm:text-lg md:text-xl text-center">{content}</p>

        </div>
    )
}