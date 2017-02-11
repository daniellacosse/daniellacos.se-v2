import { publicFetchFactory } from "helpers/api"
import {
  DRIVE_SOURCE,
  DRIVE_API_HOST,
  DRIVE_FAVORITES,
  DRIVE_PUBLIC_FOLDER,
  PUBLIC_DRIVE_FOLDER_URL
} from "assets/constants"

const driveFetcher = publicFetchFactory({
  entry: "items",
  format: ({ snippet: { resourceId, thumbnails, publishedAt } }) => ({
    id: resourceId.videoId,
    type: "gallery",
    source: DRIVE_SOURCE,
    picture: thumbnails.default.url,
    frame: `https://www.youtube.com/embed/${resourceId.videoId}`,
    date: publishedAt
  }),
  favorites: DRIVE_FAVORITES,
  error: (response) => {
    if (!response.code) return null;

    return `${DRIVE_SOURCE}: (${response.code})`;
  }
})

// TODO: compile gallaries
export default () => driveFetcher(PUBLIC_DRIVE_FOLDER_URL)
