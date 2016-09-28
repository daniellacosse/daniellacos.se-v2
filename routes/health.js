import Route from "helpers/route"

export default class HealthRoute extends Route {
  static path = "/health"

  dispatch() {
    return {
      ok: true
    }
  }
}
