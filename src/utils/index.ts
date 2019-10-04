import debug from './debug'
import config from './config'
import packageJson from '../../package.json'

const dependencies = Object.keys(packageJson.dependencies).filter(dep => !dep.includes('type'))

export default { debug, config, packageJson, dependencies }
