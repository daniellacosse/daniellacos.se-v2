require("babel-polyfill");

import { flow } from "lodash";

import { sortByDate, collapseIntoGallaries } from "../document";
import { whileInObject } from "../iterators";
import * as sources from "sources";

// TODO: ensure temporal concurrecy across sources
// TODO: keep hitting all endpoints until you've gotten the proper # of records

export default async function fetchAll (options = {}) {
  let fetchPromises = [];

  whileInObject(sources,
    (key, source) => fetchPromises.push(source(options))
  );

  const allDocuments = flow([ sortByDate, collapseIntoGallaries ])([].concat.apply([], await Promise.all(fetchPromises))) // flatten;

  return (options.count)
    ? allDocuments.slice(0, options.count)
    : allDocuments;
}
