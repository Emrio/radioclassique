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
