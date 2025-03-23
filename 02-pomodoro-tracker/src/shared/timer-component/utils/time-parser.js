export const parseTimeToInt = (time) => {
  if (typeof time !== "string" || !time.includes(":")) return 0;

  const timeArray = time.split(":");
  const minutes = parseInt(timeArray[0], 10) || 0;
  const seconds = parseInt(timeArray[1], 10) || 0;

  return minutes * 60 + seconds;
};

export const parseIntToTime = (time) => {
  if (typeof time !== "number") return "00:00";

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
