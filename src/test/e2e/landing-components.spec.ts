import { test, expect } from '@playwright/test';

test.describe('Landing components', () => {
  test('Categorias: arrows and title', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto('/');
    await expect(
      page.getByText('Encuentra la categoria adecuada para tus productos')
    ).toBeVisible();
    const left = page.getByRole('button', { name: 'Anterior' });
    const right = page.getByRole('button', { name: 'Siguiente' });
    await expect(left).toBeVisible();
    await expect(right).toBeVisible();
    await right.click();
    await expect(left).not.toBeDisabled();
  });

  test('Tiendas: grid has 12 items', async ({ page }) => {
    await page.goto('/tiendas');
    const cards = page.locator('section >> .grid > div');
    await expect(cards).toHaveCount(12);
  });

  test('Newsletter: shows thank you message on submit', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[aria-label="Correo electronico"]');
    await input.fill('user@example.com');
    await page.getByRole('button', { name: 'Suscribirme' }).click();
    await expect(page.getByText('Gracias por suscribirte!')).toBeVisible();
  });
});
