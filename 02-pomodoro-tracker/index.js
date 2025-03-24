let primaryCurrentState = "work";
let isPaused = false;

const primaryButton = document.querySelector("#primarybtn");
const secondaryButton = document.querySelector("#secondarybtn");
const timer = document.querySelector("#timer");

const pomodoroState = {
  work: "25:00",
  break: "5:00",
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
