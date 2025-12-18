import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 16,
    border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }

  return <div style={style}>{message.text}</div>
}

Notification.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success']).isRequired
  })
}

export default Notification
