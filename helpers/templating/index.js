import { readFileSync } from "fs"

import { whileInObject } from "../iterators"
import { getFavicon, getWebFont, getApplicationCSS } from "../asset"
import buildScript from "./script"
import {
  DATA_TEMPLATE,
  FAVICON_TEMPLATE,
  CSS_TEMPLATE,
  SCRIPT_TEMPLATE,
  ICONFONT_TEMPLATE,
  NEVIS_TEMPLATE,
  TYPE_TEMPLATE,
  TITLE_TEMPLATE,
  DESCRIPTION_TEMPLATE,
  PREVIEW_IMAGE_TEMPLATE,
  URL_TEMPLATE
} from "assets/constants"

export default ({ file, meta, scripts, data }) => {
  const buildPoints = {
    [DATA_TEMPLATE]: !!data ? JSON.stringify(data) : "{}",
    [SCRIPT_TEMPLATE]: buildScript(scripts || []),
    [FAVICON_TEMPLATE]: getFavicon(),
    [CSS_TEMPLATE]: getApplicationCSS(),
    [ICONFONT_TEMPLATE]: getWebFont("daniellacosse-icons"),
    // lolll
    [NEVIS_TEMPLATE]: getWebFont("nevis"),

    [TYPE_TEMPLATE]: meta.type,
    [TITLE_TEMPLATE]: meta.title,
    [DESCRIPTION_TEMPLATE]: meta.description,
    [PREVIEW_IMAGE_TEMPLATE]: meta.previewImage,
    [URL_TEMPLATE]: meta.url
  }

  let templateToBuild = readFileSync(`./assets/${file}.html`)
    .toString("utf8")

  whileInObject(buildPoints, (key, value) => {
    const regex = new RegExp(key, "g")

    templateToBuild = templateToBuild.replace(regex, value)
  })

  return templateToBuild
}

export buildApplication from "./application"
export buildScript from "./script"
