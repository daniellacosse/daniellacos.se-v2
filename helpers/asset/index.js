import {
  readFileSync
} from "fs"

export getApplicationCSS from "./getApplicationCSS"
export getFavicon from "./getFavicon"
export getJPEG from "./getJPEG"
export getWebFont from "./getWebFont"

export default function getAssetURL(filename, mimetype) {
  const assetHash = readFileSync(`./assets/${filename}`)
    .toString("base64")

  return `data:${mimetype};base64,${assetHash}`
}
