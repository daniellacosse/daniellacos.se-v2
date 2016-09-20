import PageRoute            from "helpers/Route"
import { buildApplication } from "helpers/Template"

export class IndexRoute extends PageRoute {
  static path = "/"

  dispatch() {
    return buildApplication({
      html: "<h1>Hello World!</h1>",
      script: "alert('Hello World!');"
    });
  }
}
