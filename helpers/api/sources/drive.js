import { publicFetchFactory } from "../factory"
import {
  DRIVE_SOURCE,
  DRIVE_API_HOST,
  DRIVE_PUBLIC_FOLDER,
  PUBLIC_DRIVE_FOLDER_URL
} from "../../constants"

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
  error: (response) => {
    if (!response.code) return null;

    return `${DRIVE_SOURCE}: (${response.code})`;
  }
})

// TODO: compile gallaries
export default () => driveFetcher(PUBLIC_DRIVE_FOLDER_URL)
