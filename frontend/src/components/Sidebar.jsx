

export default function Sidebar({onSelect, selected}){

    const navs = [
        { title: 'Copilot chat', image: '/logo.png' },
        { title: 'Pomodoro', image: '/pomodoro.png' },
        { title: 'Generate quiz', image: '/quiz.png' },
        { title: 'Flashcards', image: '/flash-cards.png' },
        { title: 'Humanize text', image: '/humanize.png' },
        { title: 'Summarize text', image: '/summarize.png' },
    ];

    return(
        <aside className="flex flex-col text-left gap-4 w-1/5 h-full font-bold text-white text-2xl bg-neutral-900 p-5">
            <h2 className="">Menu</h2>
            <div className="flex flex-col gap-2 w-full h-full text-xl">
                {navs.map((nav) => (
                    <div key={nav.title} onClick={() => onSelect(nav.title)} 
                    className={`flex justify-left items-center w-full h-16 p-4 rounded-lg duration-200 cursor-pointer text-sm ${selected === nav.title ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}>
                        <img className="size-8 mr-3" src={nav.image} alt={nav.title} />
                        <h2 className="text-lg">{nav.title}</h2>
                    </div>
                ))}
            </div>
        </aside>
    );

}