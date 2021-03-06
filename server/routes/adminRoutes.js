const express = require ('express')
const Router = express.Router()
const pool = require('../db.js') 
const bcrypt = require('bcrypt');


Router.post('/admin', async (req, res)=>{

    try {

        const {og_number, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        const admin = await pool.query('INSERT INTO ADMIN (og_number, password) VALUES ($1, $2) RETURNING *', [og_number, encryptedPassword])
        console.log(admin.rows[0])
        res.status(200).json('admin successfuly registered')

    } catch (error) {
        res.status(500).json(error.message)
    }
})


Router.get('/admins', async (req, res)=>{
try {


    const allCandidates = await pool.query('SELECT * from admin')    
    res.status(200).json(allCandidates.rows[0])

} catch (error) {
    res.send(error.message)
}

})


Router.put('admin/:id', async (req, res)=>{

    const id = request.params.id
    const {newPassword, og_number} = req.body 
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const updateAdminDetails = await pool.query("UPDATE admin SET password = $1, og_number = $2 WHERE id= $3 RETURNING *, [hashedPassword, og_number, id]")
    res.status(200).json(updateAdminDetails.rows[0].og_number);
}) 


Router.delete('admin/:id', async (req, res)=>{

    const id = req.params.id
    const idExist = await pool.query("SELECT EXISTS (select * from admin WHERE id = $1)", [id]); 
    if (!idExist.rows[0].exists) throw new Error ("admin does not exist") 

    const deleteAdmin = await pool.query("DELETE FROM admin WHERE id = $1 RETURNING *", [id])
})

module.exports = Router