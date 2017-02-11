import got from "got"
import URL from "url"
import { publicFetchFactory } from "helpers/api"
import {
  GITHUB_SOURCE,
  GITHUB_API_HOST,
  GITHUB_FAVORITES,
  GITHUB_REPO_URL,
  GITHUB_GIST_URL,
  GITHUB_RAW_URL
} from "assets/constants"

const githubFetcher = publicFetchFactory({
  format: ({ full_name }) => {
    return got(
        URL.format({
          ...GITHUB_RAW_URL,
          pathname: `/${full_name}/master/readme.md`
        })
      )
      .then(({ body }) => ({
        type: "code",
        source: GITHUB_SOURCE,
        markdown: body
      }));
  },
  favorites: GITHUB_FAVORITES,
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
