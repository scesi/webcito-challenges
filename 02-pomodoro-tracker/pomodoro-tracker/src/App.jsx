import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import Counter from './hooks/useStatus';


function App() {
  return (
    <div className="mt-[200px] text-white flex justify-center items-center flex-col rounded-xl bg-[var(--primary-color)] p-5 shadow-2xl shadow-[-3px_0px_20px_#292B2E] ">
      <span className="font-[900] text-2xl ">Pomodoro Tracker</span>

      <div className="grid justify-center items-center w-full">
        <Counter />
      </div>
      
    </div>
  );
}

export default App;
