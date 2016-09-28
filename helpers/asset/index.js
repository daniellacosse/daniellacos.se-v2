import { readFileSync } from "fs"

export default function getAssetURL(filename, mimetype) {
  const assetHash = readFileSync(`./assets/${filename}`).toString("base64")

  return `data:${mimetype};base64,${assetHash}`
}
