require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')

const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const personsAmount = persons.length
  const now = new Date()
  const time = now.toString()

  response.send(`
    <div>
      <p>Phonebook has info for ${personsAmount} people</p>
      <p>${time}</p>
    </div>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      response.json(person)
    })
    .catch(error => {
      response.status(400).json({
        error: error.message
      })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!request.body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!request.body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  /*
  const nameExists = persons.some(p => p.name === request.body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  */

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
  console.log("New person:", newPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

