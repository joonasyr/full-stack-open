const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0

  blogs.forEach(blog => {
    sum += blog.likes
  })

  return sum
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null

  let maxLikes = 0
  let favoriteBlog = {
    title: "",
    author: "",
    url: "",
    likes: 0,
  }

  blogs.forEach(blog => {
    if (blog.likes >= maxLikes) {
      maxLikes = blog.likes
      favoriteBlog = blog
    } 
  })

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return null

  let authors = {}
  
  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })

  let maxBlogs = 0
  let topAuthor = ""

  for (const author in authors) {
    if (authors[author] > maxBlogs) {
      maxBlogs = authors[author]
      topAuthor = author
    }
  }

  return { author: topAuthor, blogs: maxBlogs } 
}

const mostLikes = (blogs) => {
  if (!blogs.length) return null

  let authors = {}
  
  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
  })

  let maxLikes = 0
  let topAuthor = ""

  for (const author in authors) {
    if (authors[author] > maxLikes) {
      maxLikes = authors[author]
      topAuthor = author
    }
  }

  return { author: topAuthor, likes: maxLikes } 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
