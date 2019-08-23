const jwt = require("jsonwebtoken")
const config = require("../config/config")
let User = require("../models/User")
const removeUserAds = require("../services/removeUserAds")
const mail = require("../services/email")


module.exports = {

    // register
    register: (req, res) => {

      let position = req.body.pos

      let htmlBody = `
      
      <body>

        <div>
          <p> Welcome to the UJmart, this email just serves as a way for us to show you that we actually care about our users! Lols am just kidding, we dont care!</p>
        </div>

      </body>

      `

      if(position != 'employee' && position != 'student') {

        if(position == config.adminPhrase) {
          position = 'admin'
        } else {
          position = 'other'
        }

      }

      let newUser = new User({
        name: req.body.name,
        studentNo: req.body.studentNo,
        email: req.body.email,
        password: req.body.password,
        whatsAppNo: req.body.whatsAppNo,
        cellNo: req.body.cellNo,
        campus: req.body.campus,
        pos: position
      })
      
      newUser.save(err => {
        if(err) {
          res.json({message: "Unable to register", error: true, err})
        } else {
          mail(req, res, req.body.email, "Welcome to UJmart", htmlBody, null, "Email not sent", null, null)
          res.json({message: "Successfully registered, you can now login", error: false})
        }
      })


    },

    // get user info
    getSeller: (req, res) => {

      User.findOne({_id: req.params.id}, (err, user) => {
        if(err || user == null || user.email == null || user.email == undefined) {
          res.json({message: "Seller info not found", error: true})
        } else {
          res.json({message: "Seller found", error: false, seller: {
            email: user.email,
            pos: user.pos,
            whatsAppNo: user.whatsAppNo,
            cellNo: user.cellNo,
            campus: user.campus
          }})
        }
      })

    },

    // get profile info
    getProfile: (req, res) => {

      User.findOne({_id: req.user._id}, (err, user) => {
        if(err || user == null || user.email == null || user.email == undefined) {
          res.json({message: "User info not found", error: true})
        } else {
          res.json({message: "User found", error: false, profile: {
            email: user.email,
            pos: user.pos,
            whatsAppNo: user.whatsAppNo,
            cellNo: user.cellNo,
            campus: user.campus,
            name: user.name,
            studentNo: user.studentNo,
            _id: user._id
          }})
        }
      })

    },

     // update profile
     updateProfile: (req, res) => {
      
      let conditions = {
        _id: req.user._id
      }

      let update

      if(req.body.update == 'profile') {
      
        update = {
          name: req.body.values.name,
          email: req.body.values.email,
          whatsAppNo: req.body.values.whatsAppNo,
          cellNo: req.body.values.cellNo,
          campus: req.body.values.campus
        }
        
        User.updateOne(conditions, update,  (err) => {
          if (err) {
            res.json({message: "Error updating profile", error: true, err})
          } else {
            res.json({message: "Profile updated", error: false})
          }
        })

      } else if(req.body.update == 'position') {

        let position = req.body.values.pos

        if(position != 'employee' && position != 'student') {

          if(position == config.adminPhrase) {
            position = 'admin'
          } else {
            position = 'other'
          }

        }

        update = {
          pos: position
        }

        User.updateOne(conditions, update,  (err) => {
          if (err) {
            res.json({message: "Error updating position", error: true, err})
          } else {
            res.json({message: "Position updated", error: false})
          }
        })

      }

      
    },

    // password reset
    pwdChange: (req, res) => {

      User.findOne({_id: req.user._id}, (err, user) => {

        if(err || user == null || !user) {
          res.json({message: "Unexpected error", error: true, err})
        } else {

          if(user.password == req.body.oldPwd) {

            User.updateOne({_id: req.user._id}, {password: req.body.newPwd}, err => {
              if(err) {
                res.json({message: "Unexpected error", error: true, err})
              } else {
                res.json({message: "Password changed", error: false})
              }
            })

          } else {
            res.json({message: "Incorrect old password", error: true})
          }

        }

      })

    },


    // user login
    login: (req, res) => {

      User.findOne({studentNo: req.body.studentNo}, (err, user) => {

        if (!user || err || user == null)  {
          res.json({message: "Not registered, register first or check if you entered the correct credentials", error: true})
        } else if(user.password == req.body.password) {
      
          jwt.sign({
             
            email: user.email,
            name: user.name,
            _id: user._id,
            pos: user.pos
            
          }, config.tokenKey,{expiresIn: "365 days"}, function(err, token) {
            res.status(200).json({message: "Logged In", error: false, token, authData: {pos: user.pos, name: user.name, _id: user._id}}) 
      

          })

        } else {
          res.json({message: "Incorrect password", error: true})
        }
          
      })


    },

    // retrieve users
    getAllUsers: (req, res) => {

      let perPage = 20
      let page = Number(req.params.page) || 1
      
      User
        .find({})
        .sort({joined: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, users) {
          User.countDocuments().exec(function(err, count) {
              if (err) {
                res.json({message: "Error finding users", error: true})
              } else {

                let results = {
                  users,
                  page,
                  pages: Math.ceil(count / perPage)
                }
  
                res.json(
                  {results, error: false}
                )
              }
          })
          })
  

    },


    // remove user
    removeUser: (req, res) => {
      
      User.findOneAndRemove({_id: req.params.id}, (err) => {
        if (err) {
          res.json({message: "Error removing user", error: true})          
        } else {
          removeUserAds(req, res)
          res.json({message: "User Successfully removed", error: false})
        }
      })
      

    },


    // reset password
    resetLink: (req,res) => {


      User.findOne({studentNo: req.body.sNo}, (err,user) => {

        if(err || !user ||user == null || user.email == undefined || user.email == null) {

          res.json({message: "Account not found", error: true}) 

        } else {

          jwt.sign({             
            email: user.email,
            _id: user._id,
            purpose: "PWDRESET"        
          }, config.emailTokenKey,{expiresIn: "1h"}, function(err, token) {

            let htmlBody = `
      
            <body>
            
              <div>
                <p>Click on the link below to reset password</p>
                <a href="http://localhost:8080/pwdreset/${token}"> Reset Password</a>
                <p>http://localhost:8080/pwdreset/${token}</p>
              </div>

            </body>

            `
            
            mail(
              req,
              res,
              user.email, 
              "Password Reset", 
              htmlBody, 
              true, 
              "Error sending link to email", 
              true, 
              `Reset link sent to your email[${user.email}]`

            )
            
          })    

        }

      })

      
    },

    resetPwd: async (req, res) => {

      let token = req.params.token
      let pwd = req.body.pwd

      jwt.verify(token, config.emailTokenKey, (err, decoded) => {

        if (err) {
          res.json({message: "Error accessing this route, your link might have expired, generate a new one", error: true})
        } else {

          User.findOneAndUpdate({email: decoded.email}, {password: pwd}, (err, user) => {

            if(err || !user || user == null) {
              res.json({message: "Error finding data that relates to your link, link could have expired", error: true})
            } else {
              res.json({message: "Your password reset was successful", error: false})
            }

          })

        }
      })

    },

    find: (req, res) => {

      let page = req.params.page || 1
      let pages
      let perPage = 10
      var users = []

      User.search(req.params.query, (err, resp) => {

        for(let i = 0; i < resp.length; i++) {
          users.push(resp[i])
        }

        pages = Math.ceil(users.length / perPage)

        if(pages <= 1) {
          res.json({page: 1, pages, users: users})
        } else if(pages > 1 && page < pages) {
    
          let tUsers = []
    
          for(let i = ((page*perPage) -  1); i < (page*perPage); i++) {
            tUsers.push(users[i])
          }
    
          res.json({page, pages, users: tUsers})
    
        } else if(page == pages) {
    
          let tUsers = []
    
          for(let i = ((page*perPage) -  1); i < users.length; i++) {
            tUsers.push(users[i])
          }
    
          res.json({page, pages, users: tUsers})
    
        }

      })
  
    },


}