const Total = (props) => {
	let sum = 0
	props.total.map(part => sum += part.exercises)

	return (
		<p>Number of exercises {sum}</p>
	)
}

export default Total
