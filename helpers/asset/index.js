import { readFileSync } from "fs"

export default function getAssetURL(filename, mimetype) {
  const assetHash = readFileSync(`./assets/${filename}`)
    .toString("base64")

  return `data:${mimetype};base64,${assetHash}`
}

export function getApplicationCSS() {
  return readFileSync("./assets/index.css")
    .toString("utf8")
}

export function getFavicon() {
  return getAssetURL("favicon.ico", "image/x-icon")
}

export function getJPEG(jpegname) {
  return getAssetURL(`${jpegname}.jpg`, "image/jpg")
}

export function getWebFont(fontname) {
  return getAssetURL(`${fontname}.woff`, "application/x-font-woff")
}
