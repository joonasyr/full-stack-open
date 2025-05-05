import Part from './Part.tsx'

const Content = (props) => {
	const parts = props.parts
	const exercises = props.exercises

	return (
		<div>
			{parts.map(part => (
				<Part part={part.name} exercises={part.exercises} key={part.name} />
			))}
		</div>
	)
}

export default Content
