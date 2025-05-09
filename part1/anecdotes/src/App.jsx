import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState({})

	const handleVote = (selected) => {
		const temp = {...votes}

		if (!votes[selected]) {
			temp[selected] = 1
			setVotes(temp)
		} else {
			temp[selected] += 1
			setVotes(temp)
		}
	}

	const getMostVoted = () => {
		const keys = Object.keys(votes)
		if (keys.length === 0) return null

		let maxIndex = keys[0]
		for (let key of keys) {
			if (votes[key] > votes[maxIndex]) {
				maxIndex = key
			}
		}
		return Number(maxIndex)
	}

	const mostVotedIndex = getMostVoted()

  return (
    <div>
      <p>{anecdotes[selected]}</p>
			<p>has {votes[selected] || 0} votes</p>
			<button onClick={() => handleVote(selected)}>vote</button>
			<button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
			<h2>Anecdote with most votes</h2>
			<p>{anecdotes[mostVotedIndex]}</p>
			<p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App 
