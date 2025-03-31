let primaryCurrentState = "work";
let isPaused = false;

const primaryButton = document.querySelector("#primarybtn");
const secondaryButton = document.querySelector("#secondarybtn");
const timer = document.querySelector("#timer");
const breaks = document.querySelector("#breaks");
const pomodoros = document.querySelector("#pomodoros");
const sessions = document.querySelector("#sessions");

const pomodoroState = {
  work: "00:05",
  break: "00:05",
};

const colors = {
  primary: "#465BE0",
  secondary: "#3AB499",
  inactive: "#E04B46",
};

function updateSessionCount() {
  let storedSessions = localStorage.getItem("sessionsPomodoro");
  if (storedSessions !== null) {
    sessions.innerText = `Sessions: ${storedSessions}`;
  }
}

function toggleState() {
  const isBreak = primaryCurrentState === "break";
  primaryCurrentState = isBreak ? "work" : "break";

  primaryButton.setAttribute(
    "text",
    isBreak ? "Start Pomodoro" : "Start Break"
  );
  secondaryButton.setAttribute(
    "text",
    isBreak ? "Pause Break" : "Pause Pomodoro"
  );
  timer.setTime(pomodoroState[primaryCurrentState]);
  timer.setAttribute("switch", "true");

  const newColor = isBreak ? colors.secondary : colors.primary;
  const circles = timer.shadowRoot.querySelectorAll("circle");
  const timerHeader = timer.shadowRoot.querySelector("h2");
  timerHeader.style.color = newColor;
  circles.forEach((circle) => {
    circle.setAttribute("stroke", newColor);
  });
  isPaused = false;
  secondaryButton.innerText = `Pause ${
    primaryCurrentState === "work" ? "Pomodoro" : "Break"
  }`;
}

const handleTimerFinished = () => {
  toggleState();

  if (primaryCurrentState === "work") {
    let pomodoroCount = parseInt(pomodoros.innerText.split(": ")[1]) + 1;
    pomodoros.innerText = `Pomodoros: ${pomodoroCount}`;

    if (pomodoroCount % 4 === 0) {
      let storedSessions = localStorage.getItem("sessionsPomodoro");
      let sessionsCount = storedSessions ? parseInt(storedSessions) + 1 : 1;
      localStorage.setItem("sessionsPomodoro", sessionsCount);
      sessions.innerText = `Sessions: ${sessionsCount}`;
    }
  } else {
    let breakCount = parseInt(breaks.innerText.split(": ")[1]) + 1;
    breaks.innerText = `Breaks: ${breakCount}`;
  }
};

function togglePause() {
  isPaused = !isPaused;
  timer.setAttribute("switch", isPaused ? "false" : "true");
  secondaryButton.setAttribute(
    "text",
    `${isPaused ? "Resume" : "Pause"} ${
      primaryCurrentState === "work" ? "Pomodoro" : "Break"
    }`
  );
}

primaryButton.setAttribute("text", "Start Pomodoro");
primaryButton.addEventListener("click", toggleState);
timer.addEventListener("timer-finished", handleTimerFinished);
secondaryButton.addEventListener("click", togglePause);

updateSessionCount();
timer.setAttribute("time", pomodoroState.work);
timer.setAttribute("timecolor", colors.inactive);
