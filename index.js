/**
Import Modules
**/
const express = require('express') //Node server and routing
const addUser = require('./ps-adduser') //Global object

/**
Configurations
**/
const app = express()
app.use(express.json())

/**
Router
**/
app.post('/adduser', (req, res) => {
    //testing
    req.body.map(data => addUser(data.form.sections))
})

/**
Server
**/
const port = 1234
app.listen(port, () => console.log(`Test app listening on port ${port}!`))
