require("dotenv").config();
const express = require ("express");
const Router = express.Router();
const pool = require("../db");


const {createToken} = require('./createToken.js')

Router.post('/adminlogin', async (req, res) => {
 try {
    
    const {og_number, password} = req.body
    const isOgNumExist = await pool.query("SELECT EXISTS (SELECT * FROM admin WHERE og_number = $1)", [og_number] )
    
    console.log (isOgNumExist.rows[0].exists)
    
    if (!isOgNumExist.rows[0].exists) {

        res.status(400).json("Incorrect credentials")
       

    } else {
        const admin = await pool.query("SELECT * FROM admin WHERE og_number = $1", [og_number]) 
        console.log(admin.rows[0])
       const token = createToken(admin);
       res.send(token)
       console.log (token)
    }

 } catch (error) {
     res.status(500).json(error.message)
 }
    
})


module.exports = Router