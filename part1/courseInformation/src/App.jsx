import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Header.tsx'
import Content from './Content.tsx'
import Total from './Total.tsx'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total total={parts} />
		</div>
	)
}

export default App
