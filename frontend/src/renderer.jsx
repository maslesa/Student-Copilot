import { createRoot } from 'react-dom/client';
import './index.css';
import Sidebar from './components/Sidebar';

const App = () => {
  return(
    <div className='w-full h-full bg-zinc-800'>
      <Sidebar />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App/>)