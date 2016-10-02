import {
  publicFetch
} from "./index"

import {
  DRIVE_SOURCE,
  DRIVE_API_HOST,
  DRIVE_PUBLIC_FOLDER
} from "../constants"

const PUBLIC_DRIVE_FOLDER_URL = {
  protocol: "https",
  hostname: DRIVE_API_HOST,
  pathname: `/files/${DRIVE_PUBLIC_FOLDER}/children`
}

const format = ({
  items
}) => {
  return items.map(({
      snippet
    }) => snippet)
    .map(({
      resourceId,
      title,
      description,
      publishedAt,
      thumbnails
    }) => {
      return {
        id: resourceId.videoId,
        type: "gallery",
        source: DRIVE_SOURCE,
        url: `https://www.youtube.com/watch?v=${resourceId.videoId}`,
        title,
        body: description,
        previewImage: thumbnails.default.url,
        frameHeight: 400,
        frameUrl: `https://www.youtube.com/embed/${resourceId.videoId}`,
        date: new Date(publishedAt)
          .toLocaleDateString()
      }
    })
}

const error = ({
  code
}) => {
  if (!code) return null;

  return `${DRIVE_SOURCE}: (${code})`;
}

export default ({
  count,
  since
} = {}) => {
  // TODO: compile gallaries
  return publicFetch({
    format,
    error,
    url: PUBLIC_DRIVE_FOLDER_URL
  })
}
