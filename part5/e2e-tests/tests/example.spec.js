const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, getBlogIndexes } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'admin user',
        username: 'admin',
        password: '1234'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is visible', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const locator = await page.getByText('Login');
    await expect(locator).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'admin', '1234')
      await expect(page.getByText('Logged in as admin user')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'admin', '1111')
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('Logged in as admin user')).not.toBeVisible() 
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin', '1234')
      await expect(page.getByText('Logged in as admin user')).toBeVisible()

      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.getByPlaceholder('Enter title').fill('Test')
      await page.getByPlaceholder('Enter author').fill('Testersson')
      await page.getByPlaceholder('Enter url').fill('www.google.com')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('New blog Test by Testersson added')).toBeVisible()
      await expect(page.getByText('Test Testersson')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText('Blog Test by Testersson removed')).toBeVisible()
      await expect(page.getByText('Test Testersson')).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

      await page.getByRole('button', { name: 'Log out' }).click()
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Another User',
          username: 'user',
          password: '1111',
        },
      })
      await loginWith(page, 'user', '1111')

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      // Add one like to the first blog
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()

      // Add a second blog
      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.getByPlaceholder('Enter title').fill('Another Blog')
      await page.getByPlaceholder('Enter author').fill('User')
      await page.getByPlaceholder('Enter url').fill('www.another.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      // Check the order of blogs, expecting the first blog to be before the second blog
      const result1 = await getBlogIndexes(page, 'Test', 'Another Blog');
      console.log('Blogs:', result1.blogTexts);
      expect(result1.indexA).toBeLessThan(result1.indexB);

      // Like the second blog
      await page.getByRole('button', { name: 'like' }).nth(1).click()

      // Check the order again, expecting the first blog to still be before the second blog
      const result2 = await getBlogIndexes(page, 'Test', 'Another Blog');
      console.log('Blogs:', result2.blogTexts);
      expect(result2.indexA).toBeLessThan(result2.indexB);

      //Like the second blog again
      await page.getByRole('button', { name: 'like' }).nth(1).click()
      await expect(page.getByText('likes 2')).toBeVisible()

      // Check the order again, expecting the second blog to be before the first blog
      const result3 = await getBlogIndexes(page, 'Test', 'Another Blog');
      console.log('Blogs:', result3.blogTexts);
      expect(result3.indexB).toBeLessThan(result3.indexA);
    })
  })
})
