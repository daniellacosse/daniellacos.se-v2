import { readFileSync } from "fs"
import { transform } from "babel-core"
import { minify } from "html-minifier"

import { getFaviconURL, getIconFontURL, getWebFontURL } from "./Asset"

export const dataTemplate = "@RUNTIME_DATA@"
export const faviconTemplate = "@FAVICON@"
export const scriptTemplate  = "@RUNTIME_SCRIPTS@"
export const iconFontTemplate = "@ICONFONT@"
export const nevisFontTemplate = "@NEVISFONT@"

export const typeTemplate = "@ITEM_TYPE@"
export const titleTemplate = "@TITLE@"
export const descriptionTemplate = "@DESCRIPTION@"
export const previewImageTemplate = "@PREVIEW_IMAGE@"
export const URLTemplate = "@CANONICAL_URL@"

export const buildScript = (files, options = {}) => {
  const { isProductionBuild } = options;

  let readString = readFileSync(`./client/_essentials_.js`).toString("utf8")
  let _len = files.length
  while(_len--) {
    const filename = files[_len]

    readString += readFileSync(`./client/${filename}.js`).toString("utf8")
  }

  const presets = isProductionBuild
    ? ["es2015", "stage-0", "babili"]
    : ["es2015", "stage-0"]

  return transform(readString, { presets }).code;
}

export const buildTemplate = ({ file, meta, scripts, data, meta }) => {
  const isProductionBuild = (process.env.NODE_ENV === "production")
  const sanitizedData = (!!data)
    ? JSON.stringify(JSON.stringify(data))
    : "{}"

  const sanitizedScript = buildScript(scripts || [], { isProductionBuild })

  const buildPoints = {
    [dataTemplate]: sanitizedData,
    [scriptTemplate]: sanitizedScript,
    [faviconTemplate]: getFaviconURL(),
    [iconFontTemplate]: getIconFontURL(),
    [nevisFontTemplate]: getWebFontURL("nevis"),

    [typeTemplate]: meta.type,
    [titleTemplate]: meta.title,
    [descriptionTemplate]: meta.description,
    [previewImageTemplate]: meta.previewImage,
    [URLTemplate]: meta.url
  }

  let templateToBuild = readFileSync(`./assets/${file}.html`)
    .toString("utf8")

  let buildPointKeys = Object.keys(buildPoints)
  let _len = buildPointKeys.length
  while(_len--) {
    const key = buildPointKeys[_len]
    const buildPointSource = buildPoints[key]

    templateToBuild.replace(key, buildPointSource)
  }

  return (isProductionBuild)
    ? minify(templateToBuild)
    : templateToBuild
}

export const buildApplication = (templates = {}) => {
  return buildTemplate({ ...templates, file: "index" })
}
