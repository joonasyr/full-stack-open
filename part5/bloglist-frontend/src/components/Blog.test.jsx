import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', () => {
  const blog = {
    title: 'Test',
    author: 'Testersson',
    url: 'www.google.com',
    likes: 2,
    user: {
      username: 'admin',
      name: 'admin user'
    }
  }

  const currentUser = {
    username: 'admin',
    name: 'admin user'
  }

  const mockHandleLike = vi.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={currentUser}
        handleLike={mockHandleLike}
      />
    )
  })

  test('log renders the blogs title and author, but does not render its URL or number of likes by default', () => {
    expect(screen.getByText('Test Testersson')).toBeVisible()

    const url = screen.getByText('www.google.com')
    const likes = screen.getByText(/likes 2/)
    const userName = screen.getByText('admin user')

    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
    expect(userName).not.toBeVisible()
  })

  test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('www.google.com')).toBeVisible()
    expect(screen.getByText(/likes 2/)).toBeVisible()
    expect(screen.getByText('admin user')).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
  })
})
