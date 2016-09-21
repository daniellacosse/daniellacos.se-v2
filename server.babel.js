import express              from "express"
import compression          from "compression"
import secrets              from "node-env-file"

import * as routes          from "routes"
import { attachRoutes }     from "helpers/Route"

const APPLICATION = express()
const PORT        = process.env.PORT || 9999

secrets("./.secrets")
attachRoutes(APPLICATION, routes)

APPLICATION.use(compression())
APPLICATION.listen(PORT, () => {
  console.log(
    `daniellacos.se live @ localhost:${PORT}`
  )
})
