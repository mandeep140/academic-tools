

export default function OrgButton({ label, Icon, onClick, disabled }) {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}

            className={`text-xl bg-amber-500 text-white font-bold rounded-4xl py-2 px-8 flex items-center gap-3 
            border border-solid border-amber-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-amber-600'} duration-150`}

        > {label } {Icon} </button>

    );
}