if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('mongoose=ON'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)


/*
const http = require('http')
const fs = require('fs')
const port = 3000
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html', function(error, data) {
        if(error) {
            res.writeHead(404)
            res.write('error 404 =(')
        } else {
            res.write(data)
        }
        res.end()
    })
    
})

server.listen(port, function(error) {
    if (error) {
        console.log("ops", error)
    } else {console.log('yay, on port ' + port)}
})
*/