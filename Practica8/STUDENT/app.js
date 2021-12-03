const express = require('express')
const mysql = require('mysql')

const app = express()
 //acepte formato json
app.use(express.json())
app.set('view engine', 'ejs')

var connection
//conexion bd
const openConnection = () => {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'practica8'
    })
}
//DESCONECCION BD
const closeConnection = () => {
    connection.end()
}

app.get('/professors', (req, res) => {
    openConnection()

    connection.query('SELECT id, first_name AS firstName, last_name AS lastName, ' +
                     'birth_date AS birthDate, city, salary FROM professor', (error, rows) => {

        if (error) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({response: 'error'}))
            closeConnection()
            return
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows))
    })
})

app.post('/professors', (req, res) => {
    openConnection()
    let professor = req.body

    connection.query('INSERT INTO professor(first_name, last_name, birth_date, city, salary) ' +
                     'VALUES (?, ?, ?, ?, ?)',
                     [professor.firstName, professor.lastName, professor.birthDate,professor.city, professor.salary],
                     (error, rows) => {
        
        if (error) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({response: 'error'}))
            closeConnection()
            return
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows))
    })
})

app.put('/professors', (req, res) => {
    openConnection()
    let professor = req.body

    connection.query('UPDATE professor SET first_name = ?, last_name = ?, birth_date = ?, city = ?, semester = ? ' +
                     'WHERE id = ?',
                     [professor.firstName, professor.lastName, professor.birthDate, professor.city, professor.salary, professor.id],
                     (error, rows) => {
        
        if (error) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({response: 'error'}))
            closeConnection()
            return
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows))
    })
})

app.delete('/professors/:id', (req, res) => {
    openConnection()
    let id = req.params.id

    connection.query('DELETE FROM professor WHERE id = ?', [id],
                     (error, rows) => {
        
        if (error) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({response: 'error'}))
            closeConnection()
            return
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows))
    })
})

app.listen(3000, () => {
    console.log('Server initialized')
})
