import buildTemplate from "./index"

export default (templates = {}) => {
  return buildTemplate({ ...templates, file: "index" })
}
