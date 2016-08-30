Vue.filter('exceptBy', (array, value) => {
  const ret = []
  for (let i = 0, len = array.length; i < len; i++) {
    const item = array[i]
    if (item.name !== value) {
      ret.push(item)
    }
  }
  return ret
})
