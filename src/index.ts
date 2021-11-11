export * from "./convert"
export * from "./parse"
export * from "./gradient"

export type Leds = number[]
export type RenderFn = (leds: Leds) => void
export type MiddlewareFn = (leds: Leds) => Leds
export class Ledkit {
  public leds: Leds
  public middlewares: MiddlewareFn[] = [
    // idle animation
    (leds) => [...leds.slice(this.idleAnimation.shift), ...leds.slice(0, this.idleAnimation.shift)],
  ]
  public idleAnimation = {
    shift: 1,
  }

  private attachedRenderFn?: RenderFn

  constructor(public length = 300, public fps = 30) {
    this.leds = Array.from({ length }, () => 0x0)
  }

  /**
   * internal render function to apply middleware
   */
  private renderFrame = () => {
    if (!this.attachedRenderFn) return

    for (const fn of this.middlewares) {
      this.leds = fn(this.leds)
    }

    this.attachedRenderFn(this.leds)
    setTimeout(this.renderFrame, 1e3 / this.fps)
  }

  /**
   * Attach a render function to ledkit, starting the animation loop
   * @param fn the render function to be called on each frame
   * @returns true if the render function was attached, false if it was already attached
   */
  attach = (fn: RenderFn) => {
    if (this.attachedRenderFn) return false

    this.attachedRenderFn = fn
    this.renderFrame()

    return true
  }

  detach = () => {
    this.attachedRenderFn = undefined
  }
}
