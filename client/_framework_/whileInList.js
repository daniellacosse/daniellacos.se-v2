function whileInList(list = [], func) {
  const { length } = list

  let _len = length
  while (_len--) {
    let index = (length - 1) - _len

    func(list[index], index)
  }
}

function mapToList(list, func) {
  let result = [];

  whileInList(list, (item) => {
    result.push(func(item))
  })

  return result
}

function whileInObject(object = {}, func) {
  const keys = Object.keys(object);

  whileInList(keys, (key) => {
    func(key, object[key])
  })
}

// function mapToObject(object, func) {
//   let result = {}
//
//   whileInObject(object, (key, value) => {
//     result[key] = value
//   })
//
//   return result;
// }
