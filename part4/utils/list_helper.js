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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
