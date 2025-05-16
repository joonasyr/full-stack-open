const Persons = (props) => {
	return ( 
		<div>
		{props.persons
  .filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase()) ||
    person.number.includes(props.filter)
  )
  .map(person => (
    <div key={person.id}>
      <p>{person.name} {person.number} {person.id}</p>
      <button onClick={() => props.deletePerson(person.id)}>Delete</button>
    </div>
  ))}
</div>
	)
}
export default Persons
