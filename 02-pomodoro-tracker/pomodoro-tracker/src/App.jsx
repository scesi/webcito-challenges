import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useTimer from './hooks/useTimer';
import Mybutton from './components/Button/button';
import './App.css';

function App() {
  const { minutes, seconds, start, stop, totalSeconds } = useTimer(25);
  const reminder = minutes * 60 + seconds;
  const progressbar = ((totalSeconds - reminder) / totalSeconds) * 100;
  return (
    <div className="card">
      <span className="card__title">Pomodoro Tracker</span>
      <div className="card__timer">
        <CircularProgressbar
          value={progressbar}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            strokeLinecap: 'round',
            textSize: '24px',
            pathTransitionDuration: 0.3,
            pathColor: `rgba(255, 20, 215, ${minutes / 60})`,
            textColor: '#E046D7',
            trailColor: 'rgba(225, 30, 212, 0.2)',
            backgroundColor: '#E046D7',
          })}
        />
      </div>
      <div className="card__button">
        <Mybutton textColor='white' onClick={start}>
          Start Pomodoro
        </Mybutton>
        <Mybutton textColor='red' onClick={stop}>
          Pause Pomodoro
        </Mybutton>
      </div>
    </div>
  );
}

export default App;
