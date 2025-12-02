import { create } from "zustand";

export const usePomodoroStore = create((set, get) => ({
    focus: 45 * 60,
    shortBreak: 15 * 60,
    longBreak: 30 * 60,
    sessions: 4,

    timeLeft: 0,
    mode: "focus",
    currentSession: 1,
    isRunning: false,
    intervalId: null,

    applySettings: ({ focus, shortBreak, longBreak, sessions }) => {
        set({
            focus: focus * 60,
            shortBreak: shortBreak * 60,
            longBreak: longBreak * 60,
            sessions,
            mode: "focus",
            currentSession: 1,
            timeLeft: focus * 60
        });
    },

    start: () => {
        const { mode, focus, shortBreak, longBreak } = get();
        const time = 
            mode === "focus" ? focus :
            mode === "short break" ? shortBreak :
            longBreak;

        get().startTimer(time);
    },

    startTimer: (seconds) => {
        clearInterval(get().intervalId);

        set({ timeLeft: seconds, isRunning: true });

        const id = setInterval(() => {
            const { timeLeft } = get();

            if (timeLeft <= 1) {
                clearInterval(id);
                get().nextMode();
                return;
            }

            set({ timeLeft: timeLeft - 1 });
        }, 1000);

        set({ intervalId: id });
    },

    stop: () => {
        clearInterval(get().intervalId);
        set({ isRunning: false });
    },

    nextMode: () => {
        const { mode, currentSession, sessions } = get();

        if (mode === "focus") {
            if (currentSession === sessions) {
                set({ mode: "long break" });
                get().start();
            } else {
                set({ mode: "short break", currentSession: currentSession + 1 });
                get().start();
            }
        } else if (mode === "short break") {
            set({ mode: "focus" });
            get().start();
        } else if (mode === "long break") {
            set({ mode: "focus", currentSession: 1 });
            get().start();
        }
    }
}));
