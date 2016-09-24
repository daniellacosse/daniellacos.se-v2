import { readFileSync } from "fs"
import { transform } from "babel-core"
import Minimizer from "minimize"

import {
  getFaviconURL,
  getIconFontURL,
  getWebFontURL,
  getApplicationCSS
} from "./Asset"

export const dataTemplate = "@RUNTIME_DATA@"
export const faviconTemplate = "@FAVICON@"
export const cssTemplate = "@GLOBAL_CSS@"
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

  let readString = readFileSync(`./client/libraries/_essentials_.js`).toString("utf8")
  let _len = files.length
  while(_len--) {
    const filename = files.reverse()[_len]

    readString += readFileSync(`./client/${filename}.js`).toString("utf8")
  }

  return transform(readString, {
      env: {
        production: {
          minified: true,
          comments: false,
        }
      }
    }).code;
}

export const buildTemplate = ({ file, meta, scripts, data }) => {
  const sanitizedData = (!!data)
    ? JSON.stringify(JSON.stringify(data))
    : "{}"

  const sanitizedScript = buildScript(scripts || [])

  const buildPoints = {
    [dataTemplate]: sanitizedData,
    [scriptTemplate]: sanitizedScript,
    [faviconTemplate]: getFaviconURL(),
    [cssTemplate]: getApplicationCSS(),
    [iconFontTemplate]: getIconFontURL(),
    [nevisFontTemplate]: getWebFontURL("nevis"),

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

  return (process.env.NODE_ENV === "production")
    ? new Minimizer().parse(templateToBuild)
    : templateToBuild
}

export const buildApplication = (templates = {}) => {
  return buildTemplate({ ...templates, file: "index" })
}
