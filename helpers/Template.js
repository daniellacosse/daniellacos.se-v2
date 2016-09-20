// import { flow } from "lodash"
// import { minify } from "html-minifier"
// import { parse, uglify } from "uglify-js"
import { readFileSync } from "fs"

export const metaTemplate = "@META_TAGS@"
export const htmlTemplate = "@HTML_CONTENT@"
export const scriptTemplate = "@RUNTIME_SCRIPT@"

// export const compressScript = flow([
//   parse,
//   uglify.ast_mangle,
//   uglify.ast_squeeze,
//   uglify.gen_code
// ]);

export const buildTemplate = ({ file, meta, script, html }) => {
  // const script = compressScript(script)
  const builtHTML = readFileSync(file)
    .toString("utf8")
    .replace(metaTemplate, meta || "")
    .replace(htmlTemplate, html || "")
    .replace(scriptTemplate, script || "")

  // return minify(builtHTML)
  return builtHTML
}

export const buildApplication = (templates = {}) => {
  return buildTemplate({ ...templates, file: "./index.html" })
}
