import getAsset from "./index"

export default function getJPEG(jpegname) {
  return getAsset(`${jpegname}.jpg`, "image/jpg")
}
