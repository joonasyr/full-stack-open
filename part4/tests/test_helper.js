const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Number One',
    author: 'Resis Posse',
    url: 'www.books.com',
    likes: 5,
  },
  {
    title: 'Number Two',
    author: 'Anthony Barela',
    url: 'www.google.com',
    likes: 200,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb,
}
