import { TimeConstants } from "@constants/index";

export function minutesToSeconds(minutes: number): number {
  return minutes * TimeConstants.SECONDS_IN_MINUTE;
}

export function secondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / TimeConstants.SECONDS_IN_MINUTE);
  const remainingSeconds = seconds % TimeConstants.SECONDS_IN_MINUTE;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
