const multer = require("multer")



const multerStorage = multer.diskStorage({

  destination: (req, file, cb) => {

    let dir = '../public/upload/temp'
    cb(null, dir)

  },

  filename: (req, file, cb) => {
    cb(
      null, 
        Date.now() + 
        req.user._id + 
        (Math.ceil(Math.random()*20)) +  "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    )
  }

})


const fileFilter = (req, file, cb) => {
  
  let types = ["image/jpeg", "image/png", "image/gif"]

  if(types.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid image type"), false)
  }

}


const upload = multer({
  storage: multerStorage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

module.exports = upload