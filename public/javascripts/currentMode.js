function currentMode(sort) {
  let mode = ''
  switch (sort) {
    case "A > Z":
      mode = { name: 'asc' }
      break;
    case "Z > A":
      mode = { name: 'desc' }
      break;
    case "類別":
      mode = { category: 'asc' }
      break;
    case "地區":
      mode = { location: 'asc' }
  }
  return mode
}


module.exports = currentMode