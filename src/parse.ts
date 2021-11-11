import type { rgba, rgb_opt_a } from "./colors"
import { groupSplit } from "./util"

export type RGBObj = {
  r: number
  g: number
  b: number
  a?: number
}

/**
 * accepts `{ r, g, b }` or `[r, g, b]` or `(r, g, b)` as individual args
 * @returns `[r, g, b]`
 */
export function parseRGB([r, g, b]: rgba): rgba
export function parseRGB({ r, g, b }: RGBObj): rgba
export function parseRGB(r: number, g: number, b: number, a?: number): rgba
export function parseRGB(
  first: RGBObj | rgb_opt_a | number,
  second?: number,
  third?: number,
  fourth?: number,
): rgba {
  if (typeof first === "number" && typeof second === "number" && typeof third === "number") {
    return [first, second, third, fourth ?? 1]
  }

  if (Array.isArray(first)) {
    const [r, g, b, a] = first
    return [r, g, b, a ?? 1]
  }

  if (typeof first === "object") {
    const { r, g, b, a } = first
    return [r, g, b, a ?? 1]
  }

  throw Error("unrecognized input")
}

/**
 * parses a hex-string into an array of RGB values
 *
 * valid inputs: `#f0f`, `f0f`, `#ff00ff`, `#ff00ff55`
 * @param hex some hex representation of a color
 * @returns color in [r, g, b] format
 */
export const parseHEX = (hex: string): rgba => {
  const stripped = hex.replace("#", "")
  let split: string[]

  if (stripped.length === 3) {
    //? hex shortform
    split = stripped.split("").map((c) => c + c)
  } else if (stripped.length === 6 || stripped.length === 8) {
    //? hex longform, 6 or 8 chars
    split = groupSplit(stripped)
  } else throw Error("couldn't parse hex")

  const [r, g, b, a] = split.map((c) => parseInt(c, 16))
  return [r, g, b, a ?? 1]
}
