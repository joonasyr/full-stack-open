import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, test } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

    test('form calls the event handler it received as props with the right details when a new blog is created', () => {
        const createBlog = vi.fn()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('Enter title')
        const authorInput = screen.getByPlaceholderText('Enter author')
        const urlInput = screen.getByPlaceholderText('Enter url')
        const submitButton = screen.getByText('create')

        fireEvent.change(titleInput, { target: { value: 'Test' } })
        fireEvent.change(authorInput, { target: { value: 'Testersson' } })
        fireEvent.change(urlInput, { target: { value: 'www.google.com' } })
        fireEvent.click(submitButton)

        expect(createBlog).toHaveBeenCalledTimes(1)
        expect(createBlog).toHaveBeenCalledWith({
            title: 'Test',
            author: 'Testersson',
            url: 'www.google.com'
        })
    })
})
