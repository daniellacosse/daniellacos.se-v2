import getAsset from "./index"

export default function getWebFont(fontname) {
  return getAsset(`fonts/${fontname}.woff`, "application/x-font-woff")
}
