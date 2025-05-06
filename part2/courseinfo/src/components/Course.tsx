const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
		{props.parts.map((part, index) => (
			<Part part={part} key={index} />
		))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
	let sum = 0
	props.parts.map(part => sum += part.exercises)

	return (
		<p>total of {sum} exercises</p>
	)
}
         
const Course = ({course}) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

export default Course
