const express = require('express')
const Router = express.Router()
const pool = require('../db.js')
const score = require('../public/script').default

console.log(score)


Router.post('/score', async (req, res) => {
    
      try {

                  
      } catch (error) {
          
      }

})
Router.post('/candidates', async (req, res) => {

    try {
       
        const { full_name, og_number, file_number } = req.body
        const og_Number_Exist = await pool.query("SELECT EXISTS (select * from candidates WHERE og_number = $1)", [og_number]); 
       // console.log(og_Number_Exist)
        if (og_Number_Exist.rows[0].exists) throw new Error ("candidate already exist") 

        const candidate = await pool.query('INSERT INTO CANDIDATES (full_name, og_number, file_number) VALUES ($1, $2, $3) RETURNING *', [full_name, og_number, file_number])
    //  res.redirect("http://localhost:5000/tescomcbtor.html")
        res.status(200).json('candidate successfuly registered')
      
    } catch (error) {
        res.status(500).json(error.message)
    }
})


Router.get('/candidates', async (req, res) => {
    try {


        const allCandidates = await pool.query("SELECT * from candidates")
        res.status(200).json(allCandidates.rows)

    } catch (error) {
        res.send(error.message)
    }

})


Router.put('/candidate/:id', async (req, res) => {

    try {
        const  id = req.params.id

        const { full_name, og_number, file_number } = req.body

        const updateCandidateDetails = await pool.query("UPDATE candidates SET full_name = $1, og_number =$2, file_number = $3 WHERE id = $4 RETURNING *", [full_name, og_number, file_number, id])

        res.status(200).json("candidate's details updated successfuly")

    } catch (error) {
        res.status(500).json(error.message)
    }

})

Router.delete('/candidate/:id', async (req, res) =>{
    try {
       
        const id = req.params.id 
        const idExist = await pool.query("SELECT EXISTS (select * from candidates WHERE id = $1)", [id]); 
      
       if (!idExist.rows[0].exists) throw new Error ("candidate not available") 

        const deleteOneCandidate = await pool.query("DELETE  FROM CANDIDATES WHERE id = $1 RETURNING *", [id]) 

        res.status(200).json("candidate successfully deleted")


    } catch (error) {
     res.status(500).json(error.message)   
    }
})

module.exports = Router