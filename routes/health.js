import PageRoute                         from "helpers/Route"

export default class HealthRoute extends PageRoute {
  static path = "/health"

  dispatch() {
    return {
      ok: true
    }
  }
}
