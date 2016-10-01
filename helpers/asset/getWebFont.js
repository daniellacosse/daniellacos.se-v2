import getAsset from "./index"

export default function getWebFont(fontname) {
  return getAsset(`${fontname}.woff`, "application/x-font-woff")
}
