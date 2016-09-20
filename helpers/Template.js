// import { flow } from "lodash"
// import { minify } from "html-minifier"
// import { parse, uglify } from "uglify-js"
import { readFileSync } from "fs"
import { transform } from "babel-core"

export const metaTemplate = "@META_TAGS@"
export const htmlTemplate = "@HTML_CONTENT@"
export const dataTemplate = "@RUNTIME_DATA@"
export const scriptTemplate = "@RUNTIME_SCRIPT@"

// export const compressScript = flow([
//   parse,
//   uglify.ast_mangle,
//   uglify.ast_squeeze,
//   uglify.gen_code
// ]);

export const loadScript = (filename) => {
  const readString = readFileSync(`./source/${filename}.js`).toString("utf8")

  return transform(readString).code;
}

export const loadScripts = (scripts) => {
  const files = [ "_essentials_", ...scripts ]

  return files.map(loadScript).join("// --- PAGE BREAK --- //\n")
}

export const buildTemplate = ({ file, meta, script, data, html }) => {
  // const script = compressScript(script)
  const builtHTML = readFileSync(file)
    .toString("utf8")
    .replace(metaTemplate, meta || "")
    .replace(htmlTemplate, html || "")
    .replace(dataTemplate, data || "{}")
    .replace(scriptTemplate, script || "")

  // return minify(builtHTML)
  return builtHTML
}

export const buildApplication = (templates = {}) => {
  return buildTemplate({ ...templates, file: "./index.html" })
}
