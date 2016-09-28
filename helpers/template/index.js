import { readFileSync } from "fs"

import {
  getFavicon, getIconFont, getWebFont, getApplicationCSS
} from "../asset"

import {
  dataTemplate,
  faviconTemplate,
  cssTemplate,
  scriptTemplate,
  iconFontTemplate,
  nevisFontTemplate,
  typeTemplate,
  titleTemplate,
  descriptionTemplate,
  previewImageTemplate,
  URLTemplate
} from "../constants"


export buildApplication from "./application"
export buildScript from "./script"

export default ({ file, meta, scripts, data }) => {
  const sanitizedData = (!!data)
    ? JSON.stringify(JSON.stringify(data))
    : "{}"

  const sanitizedScript = buildScript(scripts || [])

  const buildPoints = {
    [dataTemplate]: sanitizedData,
    [scriptTemplate]: sanitizedScript,
    [faviconTemplate]: getFavicon(),
    [cssTemplate]: getApplicationCSS(),
    [iconFontTemplate]: getIconFont(),
    [nevisFontTemplate]: getWebFont("nevis"),

    [typeTemplate]: meta.type,
    [titleTemplate]: meta.title,
    [descriptionTemplate]: meta.description,
    [previewImageTemplate]: meta.previewImage,
    [URLTemplate]: meta.url
  }

  let templateToBuild = readFileSync(`./assets/${file}.html`).toString("utf8")

  let buildPointKeys = Object.keys(buildPoints)
  let _len = buildPointKeys.length
  while(_len--) {
    const key = buildPointKeys[_len]
    const buildPointSource = buildPoints[key]
    const regex = new RegExp(key, "g")

    templateToBuild = templateToBuild.replace(regex, buildPointSource)
  }

  return templateToBuild
}
