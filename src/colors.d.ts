/** `0-255` */
export type rgbComponent = number
/** [`0-255`, `0-255`, `0-255`] */
export type rgb = [rgbComponent, rgbComponent, rgbComponent]
/** [`0-255`, `0-255`, `0-255`, `0-1`] */
export type rgba = [rgbComponent, rgbComponent, rgbComponent, rgbComponent]
/** [`0-255`, `0-255`, `0-255`, `0-1`?] */
export type rgb_opt_a = [rgbComponent, rgbComponent, rgbComponent, rgbComponent?]
