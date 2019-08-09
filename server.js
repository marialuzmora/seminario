const express = require('express') // los tres puntos aparecen xq no aparece la libreria
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express() //app seria nuestro servidor de express

const port = process.env.PORT || 5000 // si el servidor me da un puerto o puedo usar otro (por ej 5000)

app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}) //se conecta a la bd
const connection = mongoose.connection // "instncia" una conexion

connection.once('open', () => {console.log("mongodb BD conectada exitosamente")})
//se conecta y luego se manda por consola un msj de conectado exitosamente
//a continuación se crean rutas
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)
//

app.listen(port, () => {console.log('servidor corriendo en puerto ${port}')}) //le digo a mi app que escuche, ejecute
