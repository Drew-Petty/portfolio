const express = require('express')
const connectDatabase = require('./config/Database.config')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')

app.use(cors())

connectDatabase()

app.use(express.json({extended:false}))

app.use('/api/host', require('./routes/host.route'))
app.use('/api/email', require('./routes/email.route'))

app.use(express.static('./public'))

const server = app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))