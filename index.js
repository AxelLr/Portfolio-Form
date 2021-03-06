require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json( { extended: false } ))


app.post('/Send', (req, res) => {

     const { email, subject, text } = req.body

     if( subject.trim() === '' || text.trim() === '') {
       res.status(400).json('Los campos no deben  estar vacíos. Por favor, intenta de nuevo')
     }

     if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(email)) {
         res.status(400).json('E-mail Inválido, por favor, intenta de nuevo.')
     }    

           let transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: process.env.E_MAIL,
               pass: process.env.PASS_
             }
           })
      
           let mailOptions = {
               from: 'emailSender210@gmail.com',
               to: 'axelleonr12@gmail.com',
               subject: `From: ${email}`,
               text: `asunto: ${subject}, mensaje: ${req.body.text}` 
           }
      
          transporter.sendMail(mailOptions, (err, data) => {
               if(err) {
                   console.log('error', err)
               } else {
                 res.send('Enviado satisfactoriamente')
               }
           })      
})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})
