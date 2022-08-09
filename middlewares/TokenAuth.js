const jwt = require('jsonwebtoken');
const routes = require('../utilities/RouteHandler')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const url = routes[req.url.replace('/','')]    
  const allowed = url.join(", ")

  if (token == null) {
    return res.status(401).send({status: "error", message : 'Authorization required' })
  }
  else if (req.cookies['session'] !== token) {
    return res.status(401).send({status: "error", message : 'Invalid User session'})
  }
  else{
    jwt.verify(req.cookies['session'],process.env.TOKEN_SECRET ,(err, user) => {
      if (err)  {
        return res.status(403).send({status: "error", message : 'No session. Please login' })
      }
      else{
        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
          
          if (err) return res.status(403).send({status: "error", message : 'Access to this resource forbidden' })
          let role = user.role
          
          if (!url.includes(role)) {
            res.status(403).send({status :"error", message : "Only a " + allowed + " have access to this route" })
          } 
          else {
            req.user = user
            next()
          }
        })
      }
    })
  }
  
}

module.exports = authenticateToken