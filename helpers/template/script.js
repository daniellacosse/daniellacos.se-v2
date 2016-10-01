import { readFileSync } from "fs"
import optimize from "optimize-js"

export default (files) => {
  let readString = readFileSync(`./client/libraries/_essentials_.js`).toString("utf8")
  let _len = files.length
  while(_len--) {
    const filename = files.reverse()[_len]

    readString += readFileSync(`./client/${filename}.js`).toString("utf8")
  }

  return optimize(readString);
}
