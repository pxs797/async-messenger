import { generateRandId } from "./utils.js";

/**
 * Create a new instance of AsyncMessenger
 * @param {window} target
 * @param {String} origin
 * @return {AsyncMessenger} A new instance of AsyncMessenger
 */
export default class AsyncMessenger {
  constructor(config) {
    this.target = config.target
    this.origin = config.origin
    this.channels = {}
    this.init()
  }

  /**
   * Initialize channel message listener.
   */
  init() {
    window.addEventListener('message', (e) => {
      const { data, channel } = e.data
      if (channel && this.channels[channel]) {
        this.channels[channel](data)
        delete this.channels[channel]
      }
    })
  }

  /**
   * 
   * @param {*} data 
   * @returns {Promise} The Promise to be fulfilled
   */
  post(data) {
    return new Promise(async (resolve) => {
      const channel  = generateRandId()
      this.target.postMessage({ data, channel }, this.origin)
      this.channels[channel] = resolve
    })
  }

  /**
   * 
   * @param {*} data 
   * @returns {void}
   */
  send(data) {
    this.target.postMessage(data, this.origin)
  }

}
