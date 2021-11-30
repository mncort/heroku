const express = require("express")
const Contenedor = require('./contenedor')

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

const app = express()

let archivo = new Contenedor("test.JSON")

const server = app.listen(server_port, server_host, () => {
    console.log(`El servidor esta escuchando en el puerto: ${server.address().port}`)
    archivo.getAll().then(data => console.log(`La 'base de datos' cargo con exito ${data.length} registros`))
})

server.on("error", error => console.log(`El servidor ha sufrido un error ${error}`))

app.get('/productos', (request, response) => {
    archivo.getAll()
        .then(data => response.send(data))
        .catch(e => console.log)
})

//archivo.getAll().then(resp => app.get('/productos', (request, response) => {response.send(resp)}))


app.get('/productoRandom', (request, response) => {
    archivo.getRandom()
        .then(data => response.send(data))
        .catch(e => console.log)
})