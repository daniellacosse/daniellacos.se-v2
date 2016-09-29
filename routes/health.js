import Route from "helpers/routing"

export default class HealthRoute extends Route {
  static path = "/health"

  dispatch() {
    return {
      ok: true
    }
  }
}
