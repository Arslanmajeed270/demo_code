export const roundToDecimalPlaces = (
  number: number,
  roundto: number,
): number => {
  const multipleOfTen = Math.pow(10, roundto)
  return Math.round(number * multipleOfTen) / multipleOfTen
}
