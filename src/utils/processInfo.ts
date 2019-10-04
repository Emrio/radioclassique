export default function processInfo () {
  const memory = process.memoryUsage()
  process.cpuUsage()
  return {
    memory: {
      current: Math.round(memory.heapUsed / 1024 / 1024),
      max: Math.round(memory.rss / 1024 / 1024)
    }
  }
}
