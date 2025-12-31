import { test, expect } from '@playwright/test';

test.describe('Home Hero CTAs', () => {
  test('CTA REGISTRATE navigates to /register', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /^(REGISTRATE|UNETE AHORA|CREA TU TIENDA)$/ })
      .click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test('CTA CONOCE MAS navigates to /about-us', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Ir a slide 1' }).click();
    await page.getByRole('link', { name: 'CONOCE MAS' }).click();
    await expect(page).toHaveURL(/\/about-us$/);
  });
});
