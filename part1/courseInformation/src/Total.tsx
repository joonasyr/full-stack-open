const Total = (props) => {
	const sum = props.total.reduce((a, b) => a + b, 0)

	return (
		<p>Number of exercises {sum}</p>
	)
}

export default Total
