import {
  publicFetch
} from "./index"

import {
  GITHUB_SOURCE,
  GITHUB_API_HOST
} from "../constants"

const GITHUB_REPO_URL = {
  protocol: "https",
  hostname: GITHUB_API_HOST,
  pathname: "/repos",
  query: {
    type: "owner"
  }
}

const GITHUB_GIST_URL = {
  ...GITHUB_REPO_URL,
  pathname: "/gists"
}

const formatFactory = (count) => {
  return (data) => {
    const mappedData = data.map(
      ({
        id,
        post_url,
        created_at,
        name,
        description
      }) => {
        return {
          id,
          type: "code",
          source: GITHUB_SOURCE,
          url: post_url,
          title: name,
          body: description,
          date: new Date(created_at)
            .toLocaleDateString()
        }
      }
    )

    if (count)
      return mappedData.slice(0, count)

    return mappedData
  }
}

const error = ({
  message
} = {}) => {
  if (!message) return null;

  return `${GITHUB_SOURCE}: ${message}`;
}

export default ({
  count,
  since
} = {}) => {
  return Promise.all([
    publicFetch({
      format: formatFactory(count),
      error,
      url: GITHUB_REPO_URL
    }),
    publicFetch({
      format: formatFactory(count),
      error,
      url: GITHUB_GIST_URL
    })
  ])
}
