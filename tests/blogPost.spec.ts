import { test, expect } from '@playwright/test';

test.describe('BlogPost Page', () => {
  test('should display a list of blog posts', async ({ page }) => {
    await page.goto('/blog-posts');
    const blogPostTitles = await page.locator('.blog-post-title').allTextContents();
    expect(blogPostTitles.length).toBeGreaterThan(0);
  });

  test('should create a new blog post', async ({ page }) => {
    await page.goto('/blog-posts');
    await page.click('text=Create New Post');
    await page.fill('input[name="title"]', 'Test Blog Post');
    await page.fill('textarea[name="content"]', 'This is a test blog post.');
    await page.click('text=Submit');

    const successMessage = await page.locator('.success-message').textContent();
    expect(successMessage).toContain('Blog post created successfully');
  });

  test('should update an existing blog post', async ({ page }) => {
    await page.goto('/blog-posts');
    await page.click('text=Edit', { hasText: 'Test Blog Post' });
    await page.fill('input[name="title"]', 'Updated Blog Post');
    await page.click('text=Submit');

    const updatedTitle = await page.locator('.blog-post-title', { hasText: 'Updated Blog Post' }).textContent();
    expect(updatedTitle).toBe('Updated Blog Post');
  });

  test('should delete a blog post', async ({ page }) => {
    await page.goto('/blog-posts');
    await page.click('text=Delete', { hasText: 'Updated Blog Post' });

    const blogPostTitles = await page.locator('.blog-post-title').allTextContents();
    expect(blogPostTitles).not.toContain('Updated Blog Post');
  });
});
