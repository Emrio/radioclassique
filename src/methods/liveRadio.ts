import { PassThrough } from 'stream'
import request from 'request'
import utils from '../utils'

export const radio = new PassThrough()

request.get(utils.config.radioclassique.liveradio)
  .on('error', console.error)
  .pipe(radio)
