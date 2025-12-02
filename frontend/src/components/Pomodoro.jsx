import { useState } from "react";
import { usePomodoroStore } from "../store/pomodoroStore";


export default function Pomodoro() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [focus, setFocus] = useState(45);
    const [shortBreak, setShortBreak] = useState(15);
    const [longBreak, setLongBreak] = useState(30);
    const [sessions, setSessions] = useState(3);

    const {
        timeLeft,
        mode,
        isRunning,
        applySettings,
        start,
        stop,
        currentSession
    } = usePomodoroStore();

    const format = (t) => {
        const m = Math.floor(t / 60);
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="flex flex-col max-w-full h-full font-bold text-2xl text-white">
            <div className="flex justify-center items-center w-full min-h-1/10">Pomodoro</div>
            <div className="relative w-full h-full flex flex-col">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="text-9xl mb-5">{format(timeLeft)}</div>
                    <div className="text-2xl mb-2 opacity-70 uppercase">
                        Mode: {mode}
                    </div>
                    <div className="text-2xl mb-10 opacity-70 uppercase">
                        Session: {currentSession}
                    </div>
                    {!isRunning ? (
                        <button onClick={start} className="bg-green-700 px-6 py-3 rounded-lg cursor-pointer">
                            Start
                        </button>
                    ) : (
                        <button onClick={stop} className="bg-red-700 px-6 py-3 rounded-lg cursor-pointer">
                            Stop
                        </button>
                    )}
                </div>
                {menuOpen ?
                    (<div className="absolute flex flex-col items-center w-1/3 h-full bg-neutral-900 right-0 p-5 pt-10 pb-10 rounded-l-xl">
                        <div className="flex w-full pl-5 pr-5 items-center justify-between mb-5">
                            <h2>Timer</h2>
                            <img onClick={() => setMenuOpen(false)} className="w-7 cursor-pointer hover:scale-105 duration-200" src="/close.png" alt="close" />
                        </div>
                        <div className="flex flex-col gap-5 w-full h-full p-5">
                            <div className="flex flex-col gap-3">
                                <h3 className="opacity-50 font-light">Focus: {focus}min</h3>
                                <input type="range" min={30} max={60} step={5} value={focus} onChange={(e) => setFocus(e.target.value)} className="color-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="opacity-50 font-light">Short break: {shortBreak}min</h3>
                                <input type="range" min={5} max={20} step={5} value={shortBreak} onChange={(e) => setShortBreak(e.target.value)} className="color-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="opacity-50 font-light">Long break: {longBreak}min</h3>
                                <input type="range" min={30} max={60} step={5} value={longBreak} onChange={(e) => setLongBreak(e.target.value)} className="color-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="opacity-50 font-light">Sessions: {sessions}</h3>
                                <input type="range" min={1} max={5} step={1} value={sessions} onChange={(e) => setSessions(e.target.value)} />
                            </div>
                            <button className="mt-5 flex justify-center items-center bg-zinc-800 w-1/2 p-3 rounded-lg text-xl cursor-pointer hover:bg-white hover:text-zinc-800 duration-200"
                                onClick={() => {applySettings({
                                    focus, shortBreak, longBreak, sessions}); setMenuOpen(false);}}>
                                Apply
                            </button>
                        </div>
                    </div>) : (
                        <div onClick={() => setMenuOpen(true)} className="flex justify-center items-center absolute w-10 h-10 right-5 cursor-pointer hover:scale-105 duration-200">
                            <img className="w-8" src="/menu.png" alt="" />
                        </div>
                    )}
            </div>
        </div>
    );

}