import { useState } from 'react'

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
			<div>
				filter shown with <input value={filter} onChange={handleFilterChange}/>
			</div>
			<h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			{persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
</div>
  )
}

export default App
