import { readFileSync, readdirSync } from "fs"
import minifyCssString from 'minify-css-string'

import * as icons from "assets/icons"

export function getFaviconURL() {
  return getAssetURL("favicon.ico", "image/x-icon")
}

export function getJPGURL(jpegname) {
  return getAssetURL(`${jpegname}.jpg`, "image/jpg")
}

export function getWebFontURL(fontname) {
  return getAssetURL(`fonts/${fontname}.woff`, "application/x-font-woff")
}

export function getIconFontURL() {
  const iconfontFilename = readdirSync(".")
    .filter((filename) => {
      return filename.startsWith("daniellacosse-icons")
    }
  )[0]

  const assetHash = readFileSync(`./${iconfontFilename}`).toString("base64")

  return `data:x-font-woff;base64,${assetHash}`;
}

export function sanitizeFontIcons() {
  let sanitizedFontIcons = {}

  let iconKeys = Object.keys(icons)
  let _len = iconKeys.length
  while(_len--) {
    const key = iconKeys[_len]
    const { unicode } = icons[key]

    sanitizedFontIcons[key] = unicode[0]
  }

  return sanitizedFontIcons
}

export function getApplicationCSS() {
  const cssString = readFileSync("./assets/index.css").toString("utf8")

  return (process.env.NODE_ENV === "production")
    ? minifyCssString(cssString)
    : cssString
}

export default function getAssetURL(filename, mimetype) {
  const assetHash = readFileSync(`./assets/${filename}`).toString("base64")

  return `data:${mimetype};base64,${assetHash}`
}
