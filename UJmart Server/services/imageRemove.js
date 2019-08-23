const fs = require("fs")

module.exports = (imageUrl) => {
  fs.unlink(imageUrl, err => {
    return false
  })
}