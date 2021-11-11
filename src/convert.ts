import { rgb, rgb_opt_a } from "./colors"
import { parseHEX } from "./parse"

const RGB = {
  hex: ([r, g, b]: rgb_opt_a) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },
  int: ([r, g, b]: rgb_opt_a) => {
    return (r << 16) + (g << 8) + b
  },
}

const INT = {
  rgb: (int: number): rgb => {
    const r = (int >> 16) & 255
    const g = (int >> 8) & 255
    const b = int & 255
    return [r, g, b]
  },
  hex: (int: number) => RGB.hex(INT.rgb(int)),
}

const HEX = {
  rgb: (hex: string) => {
    return parseHEX(hex)
  },
  int: (hex: string) => {
    const [r, g, b] = parseHEX(hex)
    return (r << 16) + (g << 8) + b
  },
}

export class Convert {
  static rgb = RGB
  static int = INT
  static hex = HEX
}
