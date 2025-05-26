import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import Counter from './hooks/useStatus';

function App() {
  return (
    <div className="mt-[200px] text-white flex-col justify-center items-center rounded-xl bg-[var(--primary-color)] p-5  shadow-[-3px_0px_20px_#292B2E] ">
      <Counter />
    </div>
  );
}

export default App;
