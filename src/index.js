import AsyncMessenger from './AsyncMessenger'

const asyncMessenger = {}
const defaultConfig = {
  target: window,
  origin: '*'
}

asyncMessenger.create = function (config) {
  return new AsyncMessenger(Object.assign(defaultConfig, config))
}

asyncMessenger.AsyncMessenger = AsyncMessenger

asyncMessenger.default = asyncMessenger

export default asyncMessenger
