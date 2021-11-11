import { rgb, rgb_opt_a } from "./colors"

export const between = (min: number, max: number, value: number) => {
  return Math.min(Math.max(min, value), max)
}

export const normalize = (n: number | undefined, index: number) => {
  return index === 3 ? n ?? 1 : (n ?? 255) / 255
}

/**
 * deviated from https://github.com/ricokahler/color2k/blob/c697ea23010dc654f5b553dba75dc6d063021daa/src/mix.ts#L7
 */
export const mix = (color1: rgb_opt_a, color2: rgb_opt_a, weight: number): rgb => {
  // 3rd index is alpha channel which is already normalized

  const [r1, g1, b1, a1 = 1] = color1.map(normalize)
  const [r2, g2, b2, a2 = 1] = color2.map(normalize)

  // The formula is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  const alphaDelta = a2 - a1
  const x = weight * 2 - 1
  const y = x * alphaDelta === -1 ? x : x + alphaDelta
  const z = 1 + x * alphaDelta
  const weight2 = (y / z + 1) / 2.0
  const weight1 = 1 - weight2

  const r = (r1 * weight1 + r2 * weight2) * 255
  const g = (g1 * weight1 + g2 * weight2) * 255
  const b = (b1 * weight1 + b2 * weight2) * 255
  // const a = a2 * weight + a1 * (1 - weight)

  return [r, g, b]
}

/**
 * splits a given string into groups of X (default: 2) characters
 * @param input
 * @returns
 */
export const groupSplit = (input: string, groupLength = 2): string[] => {
  let ret: string[] = []

  const groups = Math.floor(input.length / groupLength)
  for (let i = 0; i < groups; i++) {
    ret.push(input.slice(i * groupLength, i * groupLength + groupLength))
  }

  return ret
}
