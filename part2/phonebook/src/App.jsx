import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			{persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
