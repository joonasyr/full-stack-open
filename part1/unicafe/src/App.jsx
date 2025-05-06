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
			<h2>statistics</h2>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {all > 0 ? (good - bad) / all : 0}</p>
			<p>positive {all > 0 ? (good) / all * 100 : 0} %</p>
		</>
	)
}

export default App
