import { useState } from 'react'

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const handleClick = (type) => {
		setAll(all + 1)

		if (type === 'good') {
			setGood(good + 1)
		} else if (type === 'neutral') {
			setNeutral(neutral + 1)
		} else if (type === 'bad') {
			setBad(bad + 1)
		}
	}

	return (
		<>
			<h2>give feedback</h2>
			<button onClick={() => handleClick('good')}>good</button>
			<button onClick={() => handleClick('neutral')}>neutral</button>
			<button onClick={() => handleClick('bad')}>bad</button>
			<Statistics all={all} good={good} neutral={neutral} bad={bad} />
		</>
	)
}

export default App

const Statistics = ({all, good, neutral, bad}) => {
	return (
		<>
		{all > 0 ?
			<>
				<h2>statistics</h2>
				<p>good {good}</p>
				<p>neutral {neutral}</p>
				<p>bad {bad}</p>
				<p>all {all}</p>
				<p>average {(good - bad) / all}</p>
				<p>positive {(good) / all * 100} %</p>
			</>
			: <p>no feedback given</p>}
		</>
	)
}
