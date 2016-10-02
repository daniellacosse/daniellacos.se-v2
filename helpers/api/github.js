import { publicFetch } from "./index"

import {
  GITHUB_SOURCE, GITHUB_API_HOST
} from "../constants"

const formatFactory = (count) => {
  return (data) => {
    const mappedData = data.map(
      ({ id, post_url, created_at, name, description }) => {
        return {
          id,
          type: "code",
          source: GITHUB_SOURCE,
          url: post_url,
          title: name,
          body: description,
          date: new Date(created_at).toLocaleDateString()
        }
      }
    )

    if (count)
      return mappedData.slice(0, count)

    return mappedData
  }
}

const error = ({ message } = {}) => {
  if (!message) return null;

  return `${GITHUB_SOURCE}: ${message}`;
}

export default ({ count, since } = {}) => {
  return publicFetch({ format: formatFactory(count), error, url: {
    protocol: "https",
    hostname: GITHUB_API_HOST,
    pathname: "/users/daniellacosse/repos",
    query: {
      type: "owner"
    }
  }})
}
