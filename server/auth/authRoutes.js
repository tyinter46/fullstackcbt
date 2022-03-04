const express = require ("express");
const Router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require ('cookie-parser');
const pool = require("../db");


Router.post('/adminlogin', async (req, res) => {
 try {
    
    const {og_number, password} = req.body
    const isOgNumExist = await pool.query("SELECT EXISTS (SELECT og_number FROM ADMIN WHERE og_number = $1)", [og_number] )
    console.log (isOgNumExist.rows[0].exists)

    if (isOgNumExist.rows[0].exists){

    } else {
        res.status(200).json("Incorrect credentials")
    }

 } catch (error) {
     res.status(500).json(error.message)
 }
    
})


module.exports = Router