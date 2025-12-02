import { createRoot } from 'react-dom/client';
import './index.css';
import Sidebar from './components/Sidebar';
import Copilot from './components/Copilot';
import Pomodoro from './components/Pomodoro';
import { useState } from 'react';
import SmallPomodoroTimer from './components/SmallPomodoroTimer';


const App = () => {

  const [selectedPage, setSelectedPage] = useState('Pomodoro');

  const renderPage = () => {
    switch (selectedPage) {
      case 'Copilot chat':
        return <Copilot/>
      case 'Pomodoro':
        return <Pomodoro/>
      case 'Make a quiz':
        return <div className="text-white p-5">Ovo je Quiz</div>;
      case 'Flashcards':
        return <div className="text-white p-5">Ovo su Flashcards</div>;
      case 'Humanize text':
        return <div className="text-white p-5">Humanize Text page</div>;
      case 'Summarize text':
        return <div className="text-white p-5">Summarize Text page</div>;
      default:
        return <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-white">Welcome to Student Copilot</div>;
    }
  };

  return (
    <div className='relative flex w-full h-full bg-zinc-800'>
      {selectedPage !== 'Pomodoro' && <SmallPomodoroTimer/>}
      <Sidebar selected={selectedPage} onSelect={setSelectedPage} />
      <div className='w-4/5 h-full'>
        {renderPage()}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />)