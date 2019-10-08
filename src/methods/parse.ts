export function parseTimelapse (t: number): string {
  if (t < 1000) { // 0-1000 ms
    return `${t} ms`
  } else if (t < 1000 * 60) { // 1-60 s
    return `${Math.floor(t / 1000)} s`
  } else if (t < 1000 * 60 * 60) { // 1-60 min
    return `${Math.floor(t / 1000 / 60)} min`
  } else if (t < 1000 * 60 * 60 * 24) { // 1-24 hr
    return `${Math.floor(t / 1000 / 60 / 60)} hr`
  } else if (t < 1000 * 60 * 60 * 24 * 7) { // 1-7 d
    return `${Math.floor(t / 1000 / 60 / 60 / 24)} d`
  } else { // 1+ week
    return `${Math.floor(t / 1000 / 60 / 60 / 24 / 7)} w`
  }
}

export function parseDataSize (t: number): string {
  if (t < 1024) { // 0-1024 bytes
    return `${t} bytes`
  } else if (t < 1024 * 1024) { // 1-1024 kB
    return `${Math.floor(t / 1024 * 100) / 100} kB`
  } else if (t < 1024 * 1024 * 1024) { // 1-1024 MB
    return `${Math.floor(t / 1024 / 1024 * 100) / 100} MB`
  } else if (t < 1024 * 1024 * 1024 * 1024) { // 1-1024 GB
    return `${Math.floor(t / 1024 / 1024 / 1024 * 100) / 100} GB`
  } else { // 1+ TB
    return `${Math.floor(t / 1024 / 1024 / 1024 / 1024 * 100) / 100} TB`
  }
}
