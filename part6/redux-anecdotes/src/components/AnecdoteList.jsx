import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

let notificationTimeout

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const f = filter.trim().toLowerCase()
    const filtered = f
      ? anecdotes.filter(a => a.content.toLowerCase().includes(f))
      : anecdotes

    return filtered
  })

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    sendNotif(`you voted ${anecdote.content}'`)
  }

  const sendNotif = (msg) => {
    dispatch(setNotification(msg))
    clearTimeout(notificationTimeout)
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
