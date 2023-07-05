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
        if(item) {
        req.item = item
        next()
        } else {
            res.status(404).json({ message: "ID not found" })
        }
    }) 
    .catch(err => {
        res.status(500).json({ message: 'Project not found' })

    })
}


function verifyInfo (req, res, next) {
   try {
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
   catch(err) {
    res.status(500).json({ 
        message: 'Error',
        err: err.message,
        stack: err.stack,
      })
   }
}

  module.exports = {
    logger, 
    valId,
    // verifyMoreInfo, 
    // requiredBody,
    verifyInfo
} 