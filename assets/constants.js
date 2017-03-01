export const DATA_TEMPLATE = "@RUNTIME_DATA@"
export const FAVICON_TEMPLATE = "@FAVICON@"
export const CSS_TEMPLATE = "@GLOBAL_CSS@"
export const SCRIPT_TEMPLATE = "@RUNTIME_SCRIPTS@"
export const ICONFONT_TEMPLATE = "@ICONFONT@"
export const NEVIS_TEMPLATE = "@NEVISFONT@"

export const TYPE_TEMPLATE = "@ITEM_TYPE@"
export const TITLE_TEMPLATE = "@TITLE@"
export const DESCRIPTION_TEMPLATE = "@DESCRIPTION@"
export const PREVIEW_IMAGE_TEMPLATE = "@PREVIEW_IMAGE@"
export const URL_TEMPLATE = "@CANONICAL_URL@"

export const CACHE_DIRECTORY = "./_CACHE"
export const DAY_MS = 24 * 60 * 60 * 1000
export const DEFAULT_DOCUMENT_COUNT = 15

export const DRIVE_API_HOST = "www.googleapis.com/drive/v3"
export const DRIVE_SOURCE = "DRIVE"
export const DRIVE_PUBLIC_FOLDER = "0B8GZPuuPCWyzSGN0UE1VTXFjQTQ"

export const PUBLIC_DRIVE_FOLDER_URL = {
  protocol: "https",
  hostname: DRIVE_API_HOST,
  pathname: `/files/${DRIVE_PUBLIC_FOLDER}/children`
}

export const DRIVE_FAVORITES = new Set([

]);

export const GITHUB_API_HOST = "api.github.com"
export const GITHUB_SOURCE = "GITHUB"
export const GITHUB_USERNAME = "daniellacosse"

export const GITHUB_REPO_URL = {
  protocol: "https",
  hostname: GITHUB_API_HOST,
  pathname: `/users/${GITHUB_USERNAME}/repos`,
  query: {
    type: "owner"
  }
}

export const GITHUB_GIST_URL = {
  ...GITHUB_REPO_URL,
  pathname: "/gists"
}

export const GITHUB_RAW_URL = {
  protocol: "https",
  hostname: "raw.githubusercontent.com"
}

export const GITHUB_FAVORITES = new Set([

]);

export const SOUNDCLOUD_API_HOST = "api.soundcloud.com"
export const SOUNDCLOUD_SOURCE = "SOUNDCLOUD"
export const SOUNDCLOUD_USER_ID = "3847120"

export const SOUNDCLOUD_TRACKS_URL = {
  protocol: "https",
  hostname: SOUNDCLOUD_API_HOST,
  pathname: `/users/${SOUNDCLOUD_USER_ID}/tracks`,
  query: {
    client_id: process.env.SOUNDCLOUD_CONSUMER_KEY
  }
}

export const SOUNDCLOUD_FRAME_URL = {
  protocol: "https",
  hostname: "w.soundcloud.com",
  pathname: "/player",
  query: {
    show_artwork: true
  }
}

export const SOUNDCLOUD_FAVORITES = new Set([

]);

export const TUMBLR_API_HOST = "api.tumblr.com/v2"
export const TUMBLR_SOURCE = "TUMBLR"
export const TUMBLR_BLOG = "daniellacosse.tumblr.com"

export const TUMBLR_TEXTS_URL = {
  protocol: "https",
  hostname: TUMBLR_API_HOST,
  pathname: `/blog/${TUMBLR_BLOG}/posts/text`,
  query: {
    filter: "raw"
  }
}

export const TUMBLR_FAVORITES = new Set([

]);

export const TWITTER_API_HOST = "api.twitter.com/1.1"
export const TWITTER_SOURCE = "TWITTER"

export const TWITTER_TIMELINE_URL = {
  protocol: "https",
  hostname: TWITTER_API_HOST,
  pathname: "/statuses/user_timeline.json",
  query: {
    contributor_details: false,
    exclude_replies: true,
    include_rts: false,
    trim_user: true
  }
}

export const TWITTER_OEMBED_URL = {
  ...TWITTER_TIMELINE_URL,
  pathname: "/statuses/oembed.json"
}

export const TWITTER_FAVORITES = new Set([

]);

export const VIMEO_API_HOST = "api.vimeo.com"
export const VIMEO_SOURCE = "VIMEO"

export const VIMEO_VIDEOS_URL = {
  protocol: "https",
  hostname: VIMEO_API_HOST,
  pathname: "/me/videos"
}

export const VIMEO_FAVORITES = new Set([

]);

export const VINE_API_HOST = "archive.vine.co"
export const VINE_SOURCE = "VINE"
export const VINE_TIMELINE = "1144912139522359296"

export const VINE_PROFILE_URL = {
  protocol: "https",
  hostname: VINE_API_HOST,
  pathname: `/profiles/${VINE_TIMELINE}.json`,
}

export const VINE_POST_URL_FACTORY = (id) => ({
  protocol: "https",
  hostname: VINE_API_HOST,
  pathname: `/posts/${id}.json`
})

export const VINE_FAVORITES = new Set([

]);

export const YOUTUBE_API_HOST = "www.googleapis.com/youtube/v3"
export const YOUTUBE_SOURCE = "YOUTUBE"
export const YOUTUBE_CHANNEL_ID = "UUAGXhqiwwgiWkZqK8jdKMgw"

export const YOUTUBE_UPLOADS_URL = {
  protocol: "https",
  hostname: YOUTUBE_API_HOST,
  pathname: "/playlistItems",
  query: {
    part: "snippet",
    playlistId: YOUTUBE_CHANNEL_ID,
    key: process.env.GOOGLE_CONSUMER_KEY
  }
}

export const YOUTUBE_FAVORITES = new Set([

]);
