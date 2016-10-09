import { isArray, isString, isFunction } from "lodash"
import {
  mkdirSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
  readFileSync
} from "fs"

import { loadScripts, buildApplication } from "../templating"
import { CACHE_DIRECTORY, DAY_MS } from "assets/constants"

export default class Route {
  constructor(request, response) {
    this.params = request.params;
    this.response = response;
  }

  handler() {
    const hasCache = !!this.constructor.cacheLifeInDays

    const loadCache = this._loadCache(this.params)
    if (hasCache && loadCache)
      return this.response.send(loadCache)

    return this._setupHandler(this)
      .then(HTMLString => {
        if (hasCache)
          this._saveCache(this.params, HTMLString)

        return this.response.send(HTMLString)
      })
  }

  _loadCache(params) {
    const cacheDirectory = this._tryCacheDir()
    const cacheHash = this._cacheHash(params)

    // scan for valid cachefiles to return
    const validCacheDocuments = cacheDirectory
      .filter(filename => {
        // extract timestamp from filename
        const $timestamp = parseInt(
          filename.match(/\$(.+)$/)[1]
        )

        return (
          filename.startsWith(cacheHash) &&
          this._isValidTimestamp($timestamp)
        )
      })

    if (!validCacheDocuments.length) return null

    return readFileSync(
      `./${CACHE_DIRECTORY}/${validCacheDocuments[0]}`, {
        encoding: "utf8"
      }
    )
  }

  _saveCache(params, content) {
    const cacheDirectory = this._tryCacheDir()
    const cacheHash = this._cacheHash(params)

    // delete old documents
    cacheDirectory
      .filter(filename => filename.startsWith(cacheHash))
      .forEach(filename => unlinkSync(`./${CACHE_DIRECTORY}/${filename}`))

    // write fresh cache file
    return writeFileSync(
      `./${CACHE_DIRECTORY}/${cacheHash}\$${Date.now()}`, content
    )
  }

  // TODO: don't hit the file system twice
  _tryCacheDir() {
    let cacheDirectory;

    try {
      cacheDirectory = readdirSync(CACHE_DIRECTORY)
    } catch (error) {
      mkdirSync(CACHE_DIRECTORY)

      cacheDirectory = []
    }

    return cacheDirectory
  }

  _isValidTimestamp(timestamp) {
    return timestamp > Date.now() - DAY_MS * this.constructor.cacheLifeInDays
  }

  _cacheHash(params) {
    let cacheHash = this.constructor.path.replace("/", "-")
    let paramKeys = Object.keys(params)
      .sort()
    let _len = paramKeys.length
    while (_len--) {
      const key = paramKeys[_len]
      cacheHash += `${key}:${params[key]}-`
    }

    return cacheHash
  }

  _setupHandler({ prefetch, params, dispatch }) {
    return new Promise((resolve, reject) => {
      if (!isFunction(prefetch)) resolve(dispatch())

      prefetch(params)
        .then(data => resolve(dispatch(data)))
        .catch(reject)
    })
  }
}

export attachRoutes from "./attachRoutes"
