import { publicFetchFactory } from "../factory"
import {
  GITHUB_SOURCE,
  GITHUB_API_HOST,
  GITHUB_REPO_URL,
  GITHUB_GIST_URL
} from "../../constants"

const githubFetcher = publicFetchFactory({
  format: (post) => ({
    type: "code",
    source: GITHUB_SOURCE
  }),
  error: (response) => {
    if (!response.message) return null;

    return `${GITHUB_SOURCE}: ${message}`;
  }
})

export default () => {
  return Promise.all([
    githubFetcher(GITHUB_REPO_URL),
    githubFetcher(GITHUB_GIST_URL)
  ])
}
