import getAsset from "./index"

export default function getFavicon() {
  return getAsset("favicon.ico", "image/x-icon")
}
