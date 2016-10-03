import { privateFetchFactory } from "../private"
import {
  TWITTER_SOURCE,
  TWITTER_API_HOST,
  TWITTER_TIMELINE_URL
} from "../../constants"

const twitterFetcher = privateFetchFactory({
  source: TWITTER_SOURCE,
  error: (response = {}) => {
    if (!response.errors) return null

    return errors.map(({ code, message }) => {
        `${TWITTER_SOURCE}: ${message} (${code})`
      })
      .join(a ", ")
  }
})

export default () => twitterFetcher(TWITTER_TIMELINE_URL)
