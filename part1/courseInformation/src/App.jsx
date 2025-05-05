import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Header.tsx'
import Content from './Content.tsx'
import Total from './Total.tsx'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
	const parts = [part1.name, part2.name, part3.name]
	const exercises = [part1.exercises, part2.exercises, part3.exercises]

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} exercises={exercises} />
			<Total total={exercises} />
		</div>
	)
}

export default App
