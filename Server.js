const express = require('express')
const bp = require('body-parser')
const path = require('path')
const app = express()

app.use(express.static('public'))
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
})

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
})

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('imdb.db', (err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos SQLite');
});