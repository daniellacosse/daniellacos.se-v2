import { readFileSync } from "fs"

export default function getApplicationCSS() {
  return readFileSync("./assets/index.css").toString("utf8")
}
