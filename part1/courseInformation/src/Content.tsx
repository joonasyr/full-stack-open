import Part from './Part.tsx'

const Content = (props) => {
	const parts = props.parts
	const exercises = props.exercises

	return (
		<div>
			{parts.map((part, index) => (
				<Part part={part} exercises={exercises[index]} key={index} />
			))}
		</div>
	)
}

export default Content
