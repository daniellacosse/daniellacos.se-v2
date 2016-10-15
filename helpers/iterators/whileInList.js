export default function whileInList(list, func) {
  const { length } = list

  let _len = length
  while (_len--) {
    let index = (length - 1) - _len

    func(list[index], index)
  }
}
