const Project = require('./projects-model')

// add middlewares here related to projects
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}` 
    )
    next()
  }

function valId (req, res, next) {
    const { id } = req.params

    Project.get(id)
    .then(item => {
        if(!item) {
            res.status(404).json({ message: "ID not found" })
            next()
        } else {
            req.item = item
            next()
        }
    }) 
    .catch(err => {
        console.log(err)

    })
}


function verifyInfo (req, res, next) {

    const { name, description, completed } = req.body

    if(!name) {
        res.status(400).json({ message: 'Missing required field: name' })
    } 
    if(!description) {
      res.status(400).json({ message: 'Missing required field: description' })
    }
   if(!completed) {
        res.status(400).json({ message: 'Missing required field: completed' })
    } 
    next()
}

    function allValid(req, res, next) {
            const { name, description, completed } = req.body
    if(name != undefined && description != undefined && completed != undefined)
    {
        next();
    } else {
        res.status(400).json({ message: "Please include request body" });
    }
}

  module.exports = {
    logger, 
    valId,
    verifyInfo,
    allValid
} 