import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotifMessage(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)
      const enrichedBlog = {
        ...returnedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id
        }
      }
      setNotifMessage({
        text: `New blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'success',
      })
      setTimeout(() => {
        setNotifMessage(null)
      }, 2000)
    } catch (exception) {
      setNotifMessage({ text: 'Error adding new blog' })
      setTimeout(() => {
        setNotifMessage(null)
      }, 2000)
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      const enrichedBlog = {
        ...returnedBlog,
        user: blog.user
      }
      setBlogs(blogs.map(b => b.id !== blog.id ? b : enrichedBlog))
      setBlogs(updatedBlogs => updatedBlogs.sort((a,b) => b.likes - a.likes))
    } catch (error) {
      setNotifMessage({ text: 'Error liking blog', type: 'error' })
      setTimeout(() => {
        setNotifMessage(null)
      }, 2000)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotifMessage({
          text: `Blog ${blog.title} by ${blog.author} removed`,
          type: 'success',
        })
        setTimeout(() => {
          setNotifMessage(null)
        }, 2000)
      } catch (error) {
        console.error('Error deleting blog:', error)
        setNotifMessage({ text: 'Error deleting blog', type: 'error' })
        setTimeout(() => {
          setNotifMessage(null)
        }, 2000)
      }
    }
  }

  return (
    <div>
      {user === null
        ?
        <div>
          <Notification message={notifMessage} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div>
        :
        <div>
          <Notification message={notifMessage} />
          <h2>Blogs</h2>
          <p style={{ marginBottom: 0 }}>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel='Create blog' hideButtonLabel='close' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} deleteBlog={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
