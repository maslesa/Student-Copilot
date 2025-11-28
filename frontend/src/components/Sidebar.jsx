

export default function Sidebar(){

    return(
        <aside className="flex flex-col text-left gap-4 w-1/5 h-full font-bold text-white text-2xl bg-neutral-900 p-10">
            <h2 className="">Menu</h2>
            <div className="flex flex-col w-full h-full text-xl">
                <div className="flex justify-left items-center w-full h-16 p-4 hover:bg-neutral-800 rounded-lg duration-200 cursor-pointer">Pomodoro</div>
                <div className="flex justify-left items-center w-full h-16 p-4 hover:bg-neutral-800 rounded-lg duration-200 cursor-pointer">Summarize text</div>
                <div className="flex justify-left items-center w-full h-16 p-4 hover:bg-neutral-800 rounded-lg duration-200 cursor-pointer">Make a quiz</div>
            </div>
        </aside>
    );

}