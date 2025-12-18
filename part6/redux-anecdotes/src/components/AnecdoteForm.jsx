import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

let notificationTimeout

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnec = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnec))
    sendNotif(`you created '${content}'`)
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
