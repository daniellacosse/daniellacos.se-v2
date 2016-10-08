import convertor from "base-conversion"
import { isObject, isNumber } from "lodash"
import URL from "url"

export sortByDate from "./sortByDate"
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
    this.body = // TODO: sanitize body
      `<p>${(body || description || "").split("\n").join("</p><p>")}</p>`;
    this.tags = tags;

    this.subdocuments = subdocuments;
  }

  curate() {
    const { type, picture, permalink, title, date, frame, body, tags } = this

    return {
      date: date.toLocaleDateString(),
      type,
      picture,
      permalink,
      title,
      frame,
      body,
      tags
    }
  }
}
