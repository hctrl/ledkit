import { rgb, rgb_opt_a } from "./colors"
import { between, mix } from "./util"

export const getScale = (...colors: rgb_opt_a[]): ((n: number) => rgb) => {
  return (n) => {
    const lastIndex = colors.length - 1
    const lowIndex = between(0, lastIndex, Math.floor(n * lastIndex))
    const highIndex = between(0, lastIndex, Math.ceil(n * lastIndex))

    const color1 = colors[lowIndex]
    const color2 = colors[highIndex]

    const unit = 1 / lastIndex
    const weight = (n - unit * lowIndex) / unit

    return mix(color1, color2, weight)
  }
}

/**
 * create a gradient from a list of colors
 * @param colors an array of colors in the format [r, g, b]
 * @param stops the amount of stops, e.g. length of your strip
 * @param wrap use the first color again at the end to create a loop
 * @returns rgb array
 */
export const gradient = (colors: rgb_opt_a[], stops: number, wrap = true) => {
  if (wrap) colors = [...colors, colors[0]]
  const scale = getScale(...colors)

  return Array.from({ length: stops }, (_, i) => scale(i / (stops - 1)))
}
