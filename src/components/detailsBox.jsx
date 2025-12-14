export default function DetailsBox({icon, title, para, bgcolor}) {
    return(

        <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 grid place-items-center gap-3 sm:gap-4">
            <div className={`rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-amber-400 to-orange-500`}>{icon}</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-p text-center">{title}</h3>
            <p className="text-sm sm:text-base md:text-lg text-center max-w-sm">{para}</p>
        </div>

    );
}