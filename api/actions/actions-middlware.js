const Action = require('./actions-model')

// add middlewares here related to actions
  async function validateActionId (req, res, next) {
    const { id } = req.params

    try{
        const action = await Action.get(id)

        if(!action) {
            res.status(404).json({ message: 'Action ID not found' })
            next()

        } else {
            res.status(201).json(action)
            req.action = action
            next()
        }
    }
    catch(err) {
      console.log(err)
    }
}

function verifyActionInfo (req, res, next) {
    try {
      const { notes, description, project_id } = req.body

    if(!notes) {
        res.status(400).json({ message: 'Missing required field: notes' })
    } 
    if(!description) {
      res.status(400).json({ message: 'Missing required fieldj: description' })
    }
   if(!project_id) {
    res.status(400).json({ message: 'Missing required field: project_id' })
    } else {
         next()
    }
  }
  catch (err) {
    res.status(500).json({ 
      message: 'Error',
      err: err.message,
      stack: err.stack,
    })
  }

}

  module.exports = {
     validateActionId, 
    verifyActionInfo
} 