import { readdirSync, readFileSync } from "fs"

import * as icons from "assets/icons"

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

export default function getIconFont() {
  const iconfontFilename = readdirSync(".")
    .filter((filename) => {
      return filename.startsWith("daniellacosse-icons")
    }
  )[0]

  const assetHash = readFileSync(`./${iconfontFilename}`).toString("base64")

  return `data:x-font-woff;base64,${assetHash}`;
}
