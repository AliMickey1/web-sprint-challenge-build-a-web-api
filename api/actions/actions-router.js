// Write your "actions" router here!
const express = require('express')

const router = express.Router()

const Action = require('./actions-model')

const { validateActionId, verifyActionInfo } = require('./actions-middlware')

router.get('/', (req, res) => {

    Action.get()
    .then(action => {
        console.log(action)
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ message: 'Error getting actions' })
    })
})

router.get('/:id', validateActionId, (req, res) => {
    console.log(req.action)
    res.status(200).json(req.action)
})

router.post('/', verifyActionInfo, async (req, res) => {
    try {
        const newAction = await Action.insert(req.body)
        res.status(200).json(newAction)
    }
    catch(err) {
        console.log(err)
    }
})

router.put('/:id', verifyActionInfo, async (req, res) => {
    try { 
        const updatedAction = await Action.update(req.params.id, req.body)
           res.status(200).json(updatedAction)
    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Action ${req.params.id} has been deleted`})
        } else {
            res.status(404).json({ message: `Action ${req.params.id} was not found`})
        }
    })
    .catch(err => {
        console.log(err)
    })

})

module.exports = router