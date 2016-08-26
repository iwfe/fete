Vue.filter('exceptBy', (array, value) => {
  console.log(array);
  console.log(value);

  for (let i = 0, len = array.length; i < len; i++) {
    const item = array[i]
    if (item.name === value) {
      array.splice(i, 1)
      break
    }
  }
  return array
})
