import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
Pomodoro.propTypes = {
  seconds: PropTypes.number.isRequired,
  isPomodoro: PropTypes.bool.isRequired,
};

export function Pomodoro({ seconds, isPomodoro }) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const fiveMinutesValue = ((5 * 60 - seconds) / (5 * 60)) * 100;
  const twentyFiveMinutesValue = ((25 * 60 - seconds) / (25 * 60)) * 100;

  const textMinutes = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  return (
    <div className="grid justify-center items-center w-[200px] h-[200px] py-30">
      <CircularProgressbar
        value={isPomodoro ? twentyFiveMinutesValue : fiveMinutesValue}
        text={textMinutes}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: '24px',
          pathTransitionDuration: 0.3,
          pathColor: isPomodoro
            ? `rgba(255, 20, 215, 0.5)`
            : `rgba(44, 180, 153,0.5)`,
          textColor: isPomodoro ? '#E046D7' : '#3AB499',
          trailColor: isPomodoro
            ? 'rgba(225, 30, 212, 0.2)'
            : 'rgba(58, 180, 153,0.2)',
          backgroundColor: '#E046D7',
        })}
      />
    </div>
  );
}
