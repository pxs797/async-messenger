import { generateRandId } from "./utils.js";

export default class MessageWrapper {
  constructor(wrapper, origin="*") {
    this.wrapper = wrapper
    this.origin = origin
    this.channels = {}
    this.init()
  }

  init() {
    window.addEventListener('message', (e) => {
      const { data, channel } = e.data
      if (channel && [channel] in this.channels) {
        this.channels[channel](data)
        delete this.channels[channel]
      }
    })
  }

  post(data) {
    return new Promise(async (resolve) => {
      const channel  = generateRandId()
      this.wrapper.postMessage({ ...data, channel }, this.origin)
      this.channels[channel] = resolve
    })
  }

  send(data) {
    this.wrapper.postMessage(data, this.origin)
  }


}
