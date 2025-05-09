import { useState } from 'react'
import Filter from './components/Filter.tsx'
import PersonForm from './components/PersonForm.tsx'
import Persons from './components/Persons.tsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (!isDuplicate(newName)){
			setPersons(persons.concat(newPerson))
		} else {
			alert(`${newName} already added to the phonebook`)
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
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} isDuplicate={isDuplicate} />
			<h3>Numbers</h3>
			<Persons persons={persons} filter={filter} />
		</div>
      )
}

export default App
