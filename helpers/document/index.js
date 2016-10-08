import convertor from "base-conversion"
import { isObject, isNumber } from "lodash"
import URL from "url"

export default class Document {
  constructor(properties, additionalProperties) {
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
      body,
      description,
      subdocuments,
      tags
    } = {
      ...properties,
      ...additionalProperties
    }

    this.id = isNumber(id) ? convertor(10, 62)(id) : id;
    this.type = type;
    this.source = source;

    this.picture = picture;
    this.permalink =
      `http://daniellacos.se/${this.source.slice(0, 2).toLowerCase()}/${this.id}`

    this.title = title || name;
    this.date = new Date(date || created_at);
    this.frame = isObject(frame) ?
      URL.format(frame) :
      frame;
    // this.body = // TODO: sanitize body
    //   `<p>${(body || description || "").split("\n").join("</p><p>")}</p>`;
    this.tags = tags;

    this.subdocuments = subdocuments;
  }

  curate() {
    const {
      type,
      picture,
      permalink,
      title,
      date,
      frame,
      body,
      tags,
      subdocuments
    } = this

    const requiredParams = {
      date: date.toLocaleDateString(),
      type,
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
    if (frame) result = {...result, frame }

    return result;
  }
}

export sortByDate from "./sortByDate"
export collapseIntoGallaries from "./collapseIntoGallaries"
