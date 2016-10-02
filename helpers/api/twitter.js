import privateFetch from "./private"

import {
  TWITTER_SOURCE,
  TWITTER_API_HOST
} from "../constants"

// TODO: curate into documents
const format = (data) => {
  return data
}

const error = ({
  errors
}) => {
  if (!errors) return null

  return errors.map(({
      code,
      message
    }) => {
      return `${TWITTER_SOURCE}: ${message} (${code})`
    })
    .join(", ")
}

export default ({
  count,
  since
} = {}) => {
  return privateFetch({
    format,
    error,
    source: TWITTER_SOURCE,
    url: {
      protocol: "https",
      hostname: TWITTER_API_HOST,
      pathname: "/statuses/user_timeline.json",
      query: {
        contributor_details: false,
        exclude_replies: true,
        include_rts: false,
        trim_user: true,
        count
      }
    }
  })
}
