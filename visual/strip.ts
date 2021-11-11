const app = document.querySelector<HTMLDivElement>("#app")!
const leds = app.querySelector<HTMLDivElement>("#leds")!

export default class Strip {
  private leds: HTMLDivElement[]
  private createLED = (): HTMLDivElement => {
    const led = document.createElement("div")
    led.classList.add("led")
    return led
  }

  constructor(length = 300) {
    // const elements = Array(length).fill(0).map(this.createLED)
    const elements = Array.from({ length }, this.createLED)
    for (const el of elements) leds.appendChild(el)
    this.leds = elements
  }

  render = (colors: number[]) => {
    for (let i = 0; i < this.leds.length; i++) {
      const led = this.leds[i]
      const color = colors[i].toString(16)
      if (!led?.style) console.log("outta bounds", led, i, colors.length, this.leds.length)
      else led.style.color = `#${color.padStart(6, "0")}`
    }

    // for (let i = 0; i < colors.length; i++) {
    //   const color = colors[i].toString(16)
    //   if (!this.leds?.[i]?.style) console.log("outta bounds", i, colors.length, this.leds.length)
    //   this.leds[i].style.color = `#${color.padStart(6, "0")}`
    // }
  }
}
