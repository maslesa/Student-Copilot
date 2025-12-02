import { usePomodoroStore } from "../store/pomodoroStore";

export default function SmallPomodoroTimer() {

    const {
        timeLeft,
        mode,
        isRunning,
        currentSession
    } = usePomodoroStore();

    if(!isRunning) return null;

    const format = (t) => {
        const m = Math.floor(t / 60);
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="absolute flex flex-col justify-center items-center w-66 h-40 bg-zinc-800 bottom-5 left-5 rounded-lg text-white">
            <div className="text-4xl font-bold mb-3">{format(timeLeft)}</div>
            <div className="text-xl opacity-70 uppercase">
                Mode: {mode}
            </div>
            <div className="text-xl opacity-70 uppercase">
                Session: {currentSession}
            </div>
        </div>
    );

}