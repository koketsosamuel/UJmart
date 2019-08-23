const mail = require("nodemailer")
const config = require("../config/config")

module.exports = (req, res, to, subject, html, errHandle, errMsg, resHandle, resMsg) => {

  let transport = mail.createTransport({
    service: config.smtpCredentials.service,
    auth: {
      user: config.smtpCredentials.user,
      pass: config.smtpCredentials.pass
    }
  })
  
  let mailOptions = {
    from: config.smtpCredentials.user,
    to: to,
    subject: subject,
    html: html
  } 
  
  transport.sendMail(mailOptions, (err, info) => {
    
    if(err && errHandle) {
      res.json({message: errMsg, error: true})
    } else if(resHandle) {
      res.json({message: resMsg, error: false})
    } else {
      console.log(err)
      return false
    }

  })

}