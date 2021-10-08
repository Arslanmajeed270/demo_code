import moment, { argThresholdOpts } from 'moment'

export const humanizeDuration = (
  duration: number,
  argWithSuffix?: boolean,
  argThresholds?: argThresholdOpts,
): string => {
  const _duration = moment.duration(duration)
  return _duration.humanize(argWithSuffix, argThresholds)
}

export const humanizeDurationLite = (
  duration: number,
  addExtraZero = false,
  returnAll = false,
): string => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration - hours * 3600) / 60)
  const seconds = duration - hours * 3600 - minutes * 60

  const arr: string[] = []

  // Adding hours
  if (hours >= 1 || returnAll) {
    const hoursString = addExtraZero && hours < 10 ? `0${hours}` : String(hours)
    arr.push(hoursString)
  }

  // Adding minutes
  const minutesString =
    addExtraZero && hours < 10 ? `0${minutes}` : String(minutes)
  arr.push(minutesString)

  // Adding seconds
  if (seconds >= 1 || returnAll) {
    const secondsString =
      addExtraZero && seconds < 10 ? `0${seconds}` : String(seconds)
    arr.push(secondsString)
  }
  return arr.join(`:`)
}
