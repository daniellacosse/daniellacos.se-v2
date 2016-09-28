import { readFileSync } from "fs"

export default function getApplicationCSS() {
  return cssString = readFileSync("./assets/index.css").toString("utf8")
}
