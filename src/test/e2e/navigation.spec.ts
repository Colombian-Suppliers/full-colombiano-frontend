import { test, expect } from '@playwright/test';

test.describe('Public navigation', () => {
  test('Header: Productos navigates to catalog', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Productos' }).click();
    await expect(page).toHaveURL(/\/productos$/);
    await expect(page.getByPlaceholder(/Buscar productos/i)).toBeVisible();
  });

  test('Homepage shows quick benefits and categories', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Crea tu cuenta')).toBeVisible();
    await expect(
      page.getByText('Encuentra la categoria adecuada para tus productos')
    ).toBeVisible();
  });

  test('Newsletter button and placeholder', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'Suscribirme' })
    ).toBeVisible();
    const input = page.locator('input[aria-label="Correo electronico"]');
    await expect(input).toBeVisible();
  });

  test('Marketplace accessible without login', async ({ page }) => {
    await page.goto('/marketplace');
    await expect(page).toHaveURL(/\/marketplace$/);
    await expect(page.getByText(/Producto\s+\d+/).first()).toBeVisible();
  });

  test('Footer: Terminos y condiciones', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Terminos y condiciones' }).click();
    await expect(page).toHaveURL(/\/terminos$/);
    await expect(
      page.getByRole('heading', { name: 'Terminos y Condiciones' })
    ).toBeVisible();
  });

  test('Header: Blog exists', async ({ page }) => {
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });
});
