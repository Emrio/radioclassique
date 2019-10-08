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
    return obj
  } else if (Array.isArray(obj)) {
    return obj.map(elem => format(elem, c))
  } else {
    const newobj: any = {}
    for (const key in obj) {
      newobj[key] = format(obj[key], c)
    }
    return newobj as T
  }
}
