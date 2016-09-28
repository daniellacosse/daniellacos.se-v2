import { readFileSync } from "fs"
import { transform } from "babel-core"

export default (files, options = {}) => {
  const { isProductionBuild } = options;

  let readString = readFileSync(`./client/libraries/_essentials_.js`).toString("utf8")
  let _len = files.length
  while(_len--) {
    const filename = files.reverse()[_len]

    readString += readFileSync(`./client/${filename}.js`).toString("utf8")
  }

  return transform(readString, {
    env: {
      production: {
        minified: true, comments: false
      }
    }
  }).code;
}
