const express = require('express')
const sqlite3 = require('sqlite3').verbose();
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
const db = new sqlite3.Database('C:/Users/eduar/OneDrive/Documents/Tarea UNSA/Tercer semestre/pweb 2/Teoria/Teo04/imdb.db', (err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos SQLite');
});

app.post('/search', (req, res) => {
    console.log("peticion recibida");
    const { name, movie_title, year, score, votes } = req.body;

    let query = `
        SELECT Actor.Name, Movie.Title, Movie.Year, Movie.Score, Movie.Votes
        FROM Movie
        INNER JOIN Casting ON Movie.MovieID = Casting.MovieID
        INNER JOIN Actor ON Casting.ActorId = Actor.ActorId
        WHERE 1=1
    `;

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
        console.log(rows.Name);
    });
});

/*
// Ejecuta una consulta
db.serialize(() => {
    db.each(`SELECT name FROM sqlite_master WHERE type='table'`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.name);
    });
});

// Cierra la base de datos
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Cerrada la conexión con la base de datos SQLite.');
});
*/