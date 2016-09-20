import express              from "express";

import * as routes          from "routes";
import { attachRoutes }     from "helpers/Route";

const APPLICATION = express();
const PORT        = process.env.PORT || 9999;

attachRoutes(APPLICATION, routes);
APPLICATION.listen(PORT, () => {
  console.log(
    `daniellacos.se live @ localhost:${PORT}`
  );
});
