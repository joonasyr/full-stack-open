const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('Number One'))
})

test('blog unique identifier is changed from _id to id', async () => {
  const response = await api.get('/api/blogs')
  
  const ids = response.body.map(e => e.id)
  assert(ids.length === response.body.length)
})

test('a new blog post is created', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'www.new.com',
    likes: 10,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('New Blog'))
})

test('if likes is missing from request, it will default to 0', async () => {
  const newBlog = {
    title: 'New Likes',
    author: 'New Author with likes',
    url: 'www.new.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is rejected with 400', async () => {
  const newBlog = {
    author: 'Author Only',
    url: 'http://example.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog without url is rejected with 400', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: 'To be deleted',
    author: 'Author',
    url: 'http://delete.me',
    likes: 1
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogToDelete = response.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfter = await api.get('/api/blogs')
  const ids = blogsAfter.body.map(b => b.id)

  assert(!ids.includes(blogToDelete.id))
})

test('update likes of a blog post', async () => {
  const newBlog = {
    title: 'Update Likes',
    author: 'Tester',
    url: 'http://example.com',
    likes: 0
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogToUpdate = postResponse.body

  const updateResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 10 })
    .expect(200)

  assert.strictEqual(updateResponse.body.likes, 10)
})

after(async () => {
  await mongoose.connection.close()
})
