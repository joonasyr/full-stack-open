import { useState, useEffect } from 'react'
import Filter from './components/Filter.tsx'
import PersonForm from './components/PersonForm.tsx'
import Persons from './components/Persons.tsx'
import axios from 'axios'
import personService from './services/personService.tsx'
import Notification from './components/Notification.tsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (!isDuplicate(newName)){
			personService
				.create(newPerson)
				.then(addedPerson => {
					setPersons(persons.concat(addedPerson))
					setNewNumber('')
					setNewName('')
					setError(false)
					setMessage(`Added ${newPerson.name}`)
				})
			setTimeout(() => setMessage(''), 5000)
		} else {
			const replace =	window.confirm(`${newName} already added to the phonebook, replace the old number with a new one?`)
			const existingPerson = persons.find(p => p.name === newName)
			if (replace && existingPerson) {
				const updatedPerson = { ...existingPerson, number: newNumber }

				personService
					.update(updatedPerson)
					.then(returnedPerson => {
						setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
						setNewName('')
						setNewNumber('')
						setError(false)
						setMessage(`Updated number of ${existingPerson.name}`)
					})
					.catch(error => {
						alert(`Information of ${existingPerson.name} was already removed from the server`)
						setPersons(persons.filter(p => p.id !== existingPerson.id))
					})
				setTimeout(() => setMessage(''), 5000)
			}
		}
	}
	
	const handleDelete = (id)  => {
		const person = persons.find(p => p.id === id)
		if (window.confirm(`Delete ${person.name}?`)) {
			personService.deletePerson(person.id).then(() => {
				setPersons(persons.filter(p => p.id !== id))
			})
		}
	}

	const isDuplicate = (name) => {
		return persons.some(person => person.name === name)
	}

	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}

	const handleNumberChange = (e) =>	setNewNumber(e.target.value)
	

	const handleFilterChange = (e) => setFilter(e.target.value)

  return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} type={error ? 'error' : 'info'} />
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} isDuplicate={isDuplicate} />
			<h3>Numbers</h3>
			<Persons persons={persons} filter={filter} deletePerson={handleDelete} />
		</div>
      )
}

export default App
