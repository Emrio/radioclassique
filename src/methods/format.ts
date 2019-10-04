export interface Correspondances {
  [v: string]: any
}

export function format (str: string, c: Correspondances): string
export function format <T> (arr: T[], c: Correspondances): T[]
export function format <T> (obj: T, c: Correspondances): T

export function format <T> (obj: string | T | T[], c: Correspondances) {
  if (typeof obj === 'string') {
    for (const v in c) {
      obj = obj.replace(new RegExp(`{${v}}`, 'g'), c[v])
    }
  } else if (Array.isArray(obj)) {
    obj = obj.map(elem => format(elem, c))
  } else {
    for (const key in obj) {
      obj[key] = format(obj[key], c)
    }
  }
  return obj
}
