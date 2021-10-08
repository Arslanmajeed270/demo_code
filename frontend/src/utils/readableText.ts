export const bytesIntoHumanReadableSize = (
  bytes: number,
  decimals = 2,
): string => {
  if (bytes === 0) return `0 B`

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = [`B`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`]

  const sizeName = Math.floor(Math.log(bytes) / Math.log(k))

  return (
    parseFloat((bytes / Math.pow(k, sizeName)).toFixed(dm)) +
    ` ` +
    sizes[sizeName]
  )
}
