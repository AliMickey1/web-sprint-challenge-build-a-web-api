const express = require('express');
const server = express();

const { logger } = require('./projects/projects-middleware')
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

server.use(express.json())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter, logger)



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!



server.use('*', (req, res) => {
    res.send(`<h1>Hello, there!</h1>`)
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

// server.use('*', (req, res) => {
//     res.status(404).json({
//         message: 'not found'
//     })
// })

module.exports = server;
