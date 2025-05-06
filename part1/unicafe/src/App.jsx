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
			<Button onClick={() => handleClick('good')} text={'good'} />
			<Button onClick={() => handleClick('neutral')} text={'neutral'} />
			<Button onClick={() => handleClick('bad')} text={'bad'} />
			<Statistics all={all} good={good} neutral={neutral} bad={bad} />
		</>
	)
}

export default App

const Button = ({onClick, text}) => {
	return <button onClick={onClick}>{text}</button>
}

const Statistics = ({all, good, neutral, bad}) => {
	return (
		<>
		{all > 0 ?
			<>
				<h2>statistics</h2>
				<StatisticsLine text={'good'} value={good} />
				<StatisticsLine text={'neutral'} value={neutral} />
				<StatisticsLine text={'bad'} value={bad} />
				<StatisticsLine text={'all'} value={all} />
				<StatisticsLine text={'average'} value={(good - bad) / all} />
				<StatisticsLine text={'positive'} value={`${(good / all * 100).toFixed(3)} %`} />
			</>
			: <p>no feedback given</p>}
		</>
	)
}

const StatisticsLine = ({text, value}) => {
	return (
		<p>{text} {value}</p>
	)
}
