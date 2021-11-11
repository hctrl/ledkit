const app = document.querySelector<HTMLDivElement>("#app")!
const buttons = app.querySelector<HTMLDivElement>("#buttons")!

export default class Button {
  private el: HTMLButtonElement

  constructor(label: string, fn: () => void) {
    this.el = document.createElement("button")
    this.el.innerText = label
    this.el.onclick = () => fn()
    buttons.appendChild(this.el)
  }

  remove() {
    this.el.remove()
  }
}
