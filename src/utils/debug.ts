import debug from 'debug'

export default function (subprocess: string): debug.Debugger {
  const log = debug(`radioclassique:${subprocess}`)
  log.log = console.log
  return log
}
