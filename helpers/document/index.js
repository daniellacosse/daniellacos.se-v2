import convertor from "base-conversion"
import { isObject } from "lodash"
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
      tags
    } = {
      ...properties,
      ...additionalProperties
    }

    this.id = convertor(10, 62)(id);
    this.type = type;
    this.source = source;

    this.picture = picture;
    this.permalink =
      `http://daniellacos.se/${this.source.slice(0, 2).toLowerCase()}/${this.id}`

    this.title = title || name;
    this.date = new Date(date || created_at)
      .toLocaleDateString();
    this.frame = isObject(frame) ?
      URL.format(frame) :
      frame;
    this.body = `<p>${(body || description).split("\n").join("</p><p>")}</p>`;
    this.tags = tags;

    // TODO
    this.subdocuments = [];
    this.lastDate = new Date();
  }

  toJSON() {

  }
}
