const fs = require("fs")

module.exports = (imageUrl) => {
  fs.unlink(imageUrl, err => {
    console.log(err)
    return false
  })
}