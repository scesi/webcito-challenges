import { PomodoroEvent } from "@core/enums";
import { secondsToMinutesAndSeconds } from "@core/utils";
import { eventDispatcher } from "../main";

interface Props {
  time: number;
}

export function PomodoroComponent({ time }: Props) {
  const article = document.createElement("article");

  const label = document.createElement("p");
  label.textContent = `Time: ${secondsToMinutesAndSeconds(time)}`;

  const play = document.createElement("button");
  play.textContent = "Play";

  play.addEventListener("click", () => {
    if (play.textContent === "Play") {
      eventDispatcher.notify({
        eventType: PomodoroEvent.START,
        data: {
          startTime: time,
        },
      });

      play.textContent = "Pause";
    } else {
      eventDispatcher.notify({
        eventType: PomodoroEvent.PAUSE,
        data: {},
      });

      play.textContent = "Play";
    }
  });

  eventDispatcher.subscribe(PomodoroEvent.UPDATE_TIME, {
    update: (data: { time: number }) => {
      label.textContent = `Time: ${secondsToMinutesAndSeconds(data.time)}`;
    },
  });

  article.appendChild(label);
  article.appendChild(play);

  return article;
}
