let primaryCurrentState = "work";
let isPaused = false;

const primaryButton = document.querySelector("#primarybtn");
const secondaryButton = document.querySelector("#secondarybtn");
const timer = document.querySelector("#timer");
const breaks = document.querySelector("#breaks");
const pomodoros = document.querySelector("#pomodoros");
const sessions = document.querySelector("#sessions");

const storedSessions = localStorage.getItem("sessionsPomodoro");
if (storedSessions !== null) {
  sessions.innerText = `Sessions: ${storedSessions}`;
}

const pomodoroState = {
  work: "00:01",
  break: "00:01",
};

primaryButton.setAttribute("text", "Start Pomodoro");
primaryButton.addEventListener("click", () => {
  if (timer) {
    timer.setAttribute("switch", "false");
    const currentText = primaryButton.getAttribute("text");
    if (currentText === "Start Break") {
      primaryButton.setAttribute("text", "Start Pomodoro");
      secondaryButton.setAttribute("text", "Pause Break");
      timer.setTime(pomodoroState.break);
      timer.setAttribute("switch", "true");
      primaryCurrentState = "work";
    } else {
      primaryButton.setAttribute("text", "Start Break");
      secondaryButton.setAttribute("text", "Pause Pomodoro");
      timer.setTime(pomodoroState.work);
      timer.setAttribute("switch", "true");
      primaryCurrentState = "break";
    }

    isPaused = false;
    secondaryButton.innerText =
      "Pause " + (primaryCurrentState === "work" ? "Pomodoro" : "Break");
  }
});

timer.addEventListener("timer-finished", () => {
  if (timer) {
    const currentText = primaryButton.getAttribute("text");

    if (currentText === "Start Break") {
      primaryButton.setAttribute("text", "Start Pomodoro");
      secondaryButton.setAttribute("text", "Pause Break");
      timer.setTime(pomodoroState.break);
      timer.startTimer();
      timer.setAttribute("switch", "true");
      primaryCurrentState = "break";
      let pomodoroCount = parseInt(pomodoros.innerText.split(": ")[1]) + 1;
      pomodoros.innerText = `Pomodoros: ${pomodoroCount}`;
      if (pomodoroCount % 4 === 0) {
        let sessionsCount = storedSessions ? parseInt(storedSessions) + 1 : 1;
        localStorage.setItem("sessionsPomodoro", sessionsCount);
        sessions.innerText = `Sessions: ${sessionsCount}`;
      }
    } else {
      primaryButton.setAttribute("text", "Start Break");
      secondaryButton.setAttribute("text", "Pause Pomodoro");
      timer.setTime(pomodoroState.work);
      timer.startTimer();
      timer.setAttribute("switch", "true");
      primaryCurrentState = "work";
      let breakCount = parseInt(breaks.innerText.split(": ")[1]) + 1;
      breaks.innerText = `Breaks: ${breakCount}`;
    }

    isPaused = false;
    secondaryButton.innerText =
      "Pause " + (primaryCurrentState === "work" ? "Pomodoro" : "Break");
  }
});

secondaryButton.addEventListener("click", () => {
  if (timer) {
    if (isPaused) {
      timer.setAttribute("switch", "true");
      secondaryButton.setAttribute(
        "text",
        "Pause " + (primaryCurrentState === "work" ? "Break" : "Pomodoro")
      );
    } else {
      timer.setAttribute("switch", "false");
      secondaryButton.setAttribute(
        "text",
        "Resume " + (primaryCurrentState === "work" ? "Break" : "Pomodoro")
      );
    }

    isPaused = !isPaused;
  }
});

timer.setAttribute("time", pomodoroState.work);