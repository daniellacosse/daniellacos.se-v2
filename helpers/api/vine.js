import {
  publicFetch
} from "./index"

import {
  VINE_SOURCE,
  VINE_API_HOST,
  VINE_TIMELINE
} from "../constants"

const formatFactory = (count) => {
  return ({
    data
  }) => {
    const mappedData = data.records.map(({
      id,
      description,
      created,
      entities,
      permalinkUrl,
      thumbnailUrl
    }) => {
      return {
        id,
        type: "media",
        source: VINE_SOURCE,
        url: permalinkUrl,
        body: description,
        previewImage: thumbnailUrl,
        frameHeight: 400,
        frameUrl: `${permalinkUrl}/embed/wide`,
        date: new Date(created)
          .toLocaleDateString(),
        tags: entities
          .filter(({
            type
          }) => type === "tag")
          .map(({
            title
          }) => title)
      }
    })

    if (count)
      return mappedData.slice(0, count)

    return mappedData
  }
}

const error = ({
  code
}) => {
  if (!code) return null;

  return `${VINE_SOURCE}: (${code})`;
}

export default ({
  count,
  since
} = {}) => {
  return publicFetch({
    format: formatFactory(count),
    error,
    url: {
      protocol: "https",
      hostname: VINE_API_HOST,
      pathname: `/timelines/users/${VINE_TIMELINE}`,
    }
  })
}
