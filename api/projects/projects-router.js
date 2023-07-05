// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const projects = require('./projects-model')
const { verifyInfo, valId, allValid } = require('./projects-middleware')

router.get('/', (req, res) => {
    
    projects.get()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        err: err.message,
        res.status(500).message(`[]`)
    })
})



router.get('/:id', valId, (req, res) => {
    res.status(200).json(req.item)
})

router.post('/', verifyInfo, (req, res) => {
    const Project = req.body
    projects.insert(Project)
    .then(Project => {
        res.status(201).json(Project)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message,
    })
    })

 })

router.put('/:id', valId, allValid, async (req, res) => {

        const updatedProject = await projects.update(req.params.id, req.body)
    try {
        res.status(201).json(updatedProject)
    }
   catch(err){ 
        console.log(err)
   }
})

router.delete('/:id', valId, (req, res) => {
    projects.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Project ${req.params.id} has been deleted`})
        } else {
            res.status(404).json({ message: `Project ${req.params.id} was not found`})
        }
    })
    .catch(err => {
        console.log(err)
    })
    
})

router.get('/:id/actions', valId, (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.send('[]')
    })
})

module.exports = router