/**
Import Modules
**/
const express = require('express') //Node server and routing
const shell = require('node-powershell') //Powershell in Node.js
const adduser = require('./ps-adduser') //Global object

/**
Configurations
**/
const app = express()
app.use(express.json())

/**
Router
**/
app.post('/', (req, res) => {

        //PS configuration
        let ps = new shell({
          executionPolicy: 'Bypass',
          noProfile: true
        });

        // Prepare PS Script
        ps.addCommand(adduser(req.body))

        // Execute PS Script
        ps.invoke()

        //Do something with the Output...
        .then(output => {
          console.log(output);
        })

        // Do something with the error...
        .catch(err => {
          console.log(err);
          ps.dispose();
        });


})

/**
Server Configurations
**/
const port = 3000
app.listen(port, () => console.log(`Test app listening on port ${port}!`))
