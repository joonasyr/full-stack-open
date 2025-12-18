import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, user, handleLike, deleteBlog }) => {
  const blogStylings = {
    paddingTop: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 4
  }

  const isOwner = blog.user && user && blog.user.username === user.username

  return(
    <div style={blogStylings}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' hideButtonLabel='hide'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.name : 'Unknown user'}
        </div>
        {isOwner &&
        <div>
          <button onClick={() => deleteBlog(blog)}>delete</button>
        </div>}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
