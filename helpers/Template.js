// TODO: minify/uglify (in production)
// import { flow } from "lodash"
// import { minify } from "html-minifier"
// import { parse, uglify } from "uglify-js"
import { readFileSync } from "fs"
import { transform } from "babel-core"

import { getFaviconURL, getIconFontURL, getWebFontURL } from "./Asset"

export const metaTemplate    = "@META_TAGS@"
export const htmlTemplate    = "@HTML_CONTENT@"
export const dataTemplate    = "@RUNTIME_DATA@"
export const faviconTemplate = "@FAVICON@"
export const libraryTemplate = "@SCRIPT_LIBRARY@"
export const scriptTemplate  = "@RUNTIME_SCRIPT@"
export const iconFontTemplate = "@ICONFONT@"
export const nevisFontTemplate = "@NEVISFONT@"

// export const compressScript = flow([
//   parse,
//   uglify.ast_mangle,
//   uglify.ast_squeeze,
//   uglify.gen_code
// ]);

export const loadScript = (filename) => {
  const readString = readFileSync(`./client/${filename}.js`).toString("utf8")

  return transform(readString).code;
}

export const loadScripts = (scripts) => {
  const files = scripts.map((script) => `scripts/${script}`)

  return files.map(loadScript).join("\n// --- PAGE BREAK --- //\n")
}

export const loadLibraries = (scripts) => {
  const files = [
    "libraries/_essentials_",
    ...scripts.map((script) => `libraries/${script}`)
  ]

  return files.map(loadScript).join("\n// --- PAGE BREAK --- //\n")
}

export const buildTemplate = ({ file, meta, scripts, libraries, data, html }) => {
  // const script = compressScript(script)
  const builtHTML = readFileSync(`./assets/${file}.html`)
    .toString("utf8")
    .replace(metaTemplate, meta || "")
    .replace(htmlTemplate, html || "")
    // DOUBLE STRINGIFYYYYYY
    // (to DEFINITELY escape all quotation characters)
    .replace(dataTemplate,    JSON.stringify(JSON.stringify(data)) || "{}")
    .replace(faviconTemplate, getFaviconURL())
    .replace(scriptTemplate,  loadScripts(scripts) || "")
    .replace(libraryTemplate, loadLibraries(libraries) || "")
    .replace(iconFontTemplate, getIconFontURL())
    .replace(nevisFontTemplate, getWebFontURL("nevis"))

  // return minify(builtHTML)
  return builtHTML
}

export const buildApplication = (templates = {}) => {
  return buildTemplate({ ...templates, file: "index" })
}
