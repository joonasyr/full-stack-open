const loginWith = async (page, username, password)  => {
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

async function getBlogIndexes(page, titleA, titleB) {
  const blogElements = await page.locator('[data-testid="blog"]').elementHandles();
  const blogTexts = await Promise.all(
    blogElements.map(el => el.evaluate(node => node.innerText))
  );

  const indexA = blogTexts.findIndex(text => text.includes(titleA));
  const indexB = blogTexts.findIndex(text => text.includes(titleB));

  return { indexA, indexB, blogTexts };
}

export { loginWith, getBlogIndexes }
