import convertor from "base-conversion"
import { sanitize } from "html-parser"
import { isObject, isNumber } from "lodash"
import marked from "marked"
import URL from "url"

export default class Document {
  constructor(properties = {}, additionalProperties = {}) {
    const {
      id,
      type,
      source,
      picture,
      permalink,
      title,
      name,
      date,
      created_at,
      frame,
      frameHeight,
      body,
      markdown,
      description,
      subdocuments,
      tags,
      favorites
    } = {
      ...properties,
      ...additionalProperties
    }

    this.id = isNumber(id) ? convertor(10, 62)(id) : id;
    this.permalink =
      `http://daniellacos.se/${source.slice(0, 2).toLowerCase()}/${this.id}`

    this.title = title || name;
    this.description = description;
    this.date = new Date(date || created_at);
    this.frame = isObject(frame) ?
      URL.format(frame) :
      frame;
    this.frameHeight = frameHeight;

    let textToSanitize = body || description

    if (markdown) {
      this.body = marked(markdown)
    } else if (textToSanitize) {
      this.body = sanitize(
        textToSanitize
        .replace(/'/g, "&rsquo;")
        .replace(/[\n\r]+/gm, "<br>"), {
          elements: ["script"]
        }
      );
    }

    this.type = type;
    // this.isFavorite = favorites.has(id) || favorites.has(this.id);
    this.source = source;
    this.picture = picture;
    this.tags = tags;
    this.subdocuments = subdocuments;
  }

  curate() {
    const {
      id,
      type,
      isFavorite,
      picture,
      permalink,
      title,
      description,
      date,
      frame,
      frameHeight,
      body,
      tags,
      subdocuments
    } = this

    const requiredParams = {
      id,
      date: date.toLocaleDateString(),
      type,
      isFavorite,
      picture,
      permalink,
      title
    };

    let result = requiredParams
    if (tags && tags.length)
      result = {...result, tags }

    if (subdocuments && subdocuments.length)
      result = {...result, subdocuments: subdocuments.map((doc) => doc.curate()) }

    if (body) result = {...result, body }
    if (description) result = {...result, description }
    if (frame) result = {...result, frame, frameHeight }

    return result;
  }
}

export sortByDate from "./sortByDate"
export collapseIntoGallaries from "./collapseIntoGallaries"
