import { publicFetchFactory } from "helpers/api"
import {
  GITHUB_SOURCE,
  GITHUB_API_HOST,
  GITHUB_REPO_URL,
  GITHUB_GIST_URL
} from "assets/constants"

const githubFetcher = publicFetchFactory({
  format: {
    type: "code",
    source: GITHUB_SOURCE
  },
  error: (response) => {
    if (!response.message) return null;

    return `${GITHUB_SOURCE}: ${message}`;
  }
})

export default (options = {}) => {
  // return Promise.all([
  return githubFetcher(GITHUB_REPO_URL, options)
    //   githubFetcher(GITHUB_GIST_URL)
    // ])
    //   .then(reposAndGists => [].concat.apply([], reposAndGists))
}
