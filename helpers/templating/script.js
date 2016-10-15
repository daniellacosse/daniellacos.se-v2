import { readFileSync } from "fs"
import optimize from "optimize-js"

import { whileInList } from "../iterators"

export default (files) => {
  let readString = readFileSync("./client/_framework_.js")
    .toString("utf8")

  whileInList(files, (file) => {
    readString += readFileSync(`./client/${file}.js`)
      .toString("utf8")
  })

  return optimize(readString);
}
