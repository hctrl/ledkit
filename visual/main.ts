import Strip from "./strip"
import "./style.css"
import { Convert, gradient, Ledkit } from "../src"
import Button from "./button"

const length = 300
const strip = new Strip(length)
// @ts-expect-error for debugging
window.strip = strip

strip.render(Array(length).fill(0xff00ff))

//*--- relevant code below this line

const ledkit = new Ledkit(length)
// @ts-expect-error for debugging
window.ledkit = ledkit

const gradientColors = ["#ff00ff", "#ff0"].map(Convert.hex.rgb)
ledkit.leds = gradient(gradientColors, ledkit.length).map(Convert.rgb.int)
ledkit.attach(strip.render)

new Button("attach", () => ledkit.attach(strip.render))
new Button("detach", ledkit.detach)
