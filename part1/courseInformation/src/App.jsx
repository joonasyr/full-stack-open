import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Header.tsx'
import Content from './Content.tsx'
import Total from './Total.tsx'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
	const parts = [part1, part2, part3]
	const exercises = [exercises1, exercises2, exercises3]

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} exercises={exercises} />
			<Total total={exercises} />
		</div>
	)
}

export default App
