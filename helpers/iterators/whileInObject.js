import whileInList from "./whileInList";

export default function whileInObject(object, func) {
  const keys = Object.keys(object);

  whileInList(keys, (key) => {
    func(key, object[key])
  })
}
