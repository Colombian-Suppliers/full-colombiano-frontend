import { test, expect } from '@playwright/test';

const pages = [
  { path: '/about-us', heading: /Full Colombiano/i },
  { path: '/vendors', heading: /Vende en Full Colombiano/i },
  { path: '/contact-us', heading: /T[uú] nos cuentas/i },
  { path: '/tiendas', heading: /Tiendas/i },
  { path: '/blog', heading: /Blog/i },
  { path: '/tutoriales', heading: /Tutoriales/i },
  { path: '/entradas/articulos', heading: /Entradas y Articulos/i },
  { path: '/entradas/tutoriales-video', heading: /Tutoriales en video/i },
  { path: '/terminos', heading: /Terminos y Condiciones/i },
  { path: '/privacy', heading: /Politica de Privacidad/i },
  { path: '/cookies', heading: /Politica de Cookies/i },
];

for (const p of pages) {
  test(`Visit ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    if (p.path === '/about-us') {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    } else {
      await expect(page.getByRole('heading', { name: p.heading })).toBeVisible();
    }
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });
}
