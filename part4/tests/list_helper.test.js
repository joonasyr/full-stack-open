const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [ { title: "", author: "", url: "", likes: 5, } ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "", author: "", url: "", likes: 5, },
      { title: "", author: "", url: "", likes: 3, },
      { title: "", author: "", url: "", likes: 20, },
      { title: "", author: "", url: "", likes: 2, }
    ]
    
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 30)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []

    result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test('of one given blog is itself', () => {
    const blogs = [
      { title: "A", author: "A", url: "A", likes: 5, }
    ]

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "A", author: "A", url: "A", likes: 5, },
      { title: "B", author: "B", url: "B", likes: 6, },
      { title: "C", author: "C", url: "C", likes: 8, },
      { title: "D", author: "D", url: "D", likes: 7, },
      { title: "E", author: "E", url: "E", likes: 1, }
    ]

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: "C", author: "C", url: "C", likes: 8, })
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const blogs = []

    result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test('of one author if themself', () => {
    const blogs = [
      { title: "A", author: "A", url: "A", likes: 5, }
    ]

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "A", blogs: 1 })
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "A", author: "A", url: "A", likes: 5, },
      { title: "B", author: "B", url: "B", likes: 6, },
      { title: "B", author: "B", url: "B", likes: 6, },
      { title: "B", author: "B", url: "B", likes: 6, },
      { title: "C", author: "C", url: "C", likes: 8, },
      { title: "D", author: "D", url: "D", likes: 7, },
      { title: "D", author: "D", url: "D", likes: 7, },
      { title: "D", author: "D", url: "D", likes: 7, },
      { title: "D", author: "D", url: "D", likes: 7, },
      { title: "E", author: "E", url: "E", likes: 1, }
    ]

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "D", blogs: 4 })
  })
})
