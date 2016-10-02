import privateFetch from "./private"

import {
  VIMEO_SOURCE, VIMEO_API_HOST
} from "../constants"

const format = ({ data }) => {
  return data.map(
    ({ uri, link, created_time, tags, name, description, pictures }) => {
      const id = uri.split("/")[1];

      return {
        id,
        type: "media",
        source: VIMEO_SOURCE,
        url: link,
        title: name,
        frameUrl: `https://player.vimeo.com/video/${id}`
        previewImage: pictures.sizes[pictures.sizes.length - 1].link,
        date: new Date(created_time).toLocaleDateString(),
        body: description,
        tags: tags.map(({ tag }) => tag)
      }
    }
  )
}

const error = () => {
  return null
}

export default ({ count, since } = {}) => {
  return privateFetch({ format, error, source: VIMEO_SOURCE, url: {
    protocol: "https",
    hostname: VIMEO_API_HOST,
    pathname: "/me/videos",
    query: {
      per_page: count
    }
  }})
}
