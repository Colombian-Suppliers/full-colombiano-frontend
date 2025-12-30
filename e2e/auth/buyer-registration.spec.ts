import { test, expect } from '@playwright/test';

test.describe('Buyer Registration E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should complete full buyer registration flow', async ({ page }) => {
    // Step 1: Select buyer account type
    await expect(page.getByText('Selecciona tu tipo de cuenta')).toBeVisible();
    await page.getByText('Comprador').click();

    // Step 2: Fill personal information
    await expect(page.getByLabel('Nombre')).toBeVisible();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Tipo de documento').selectOption('CC');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Step 3: Fill credentials
    await expect(page.getByLabel('Correo electrónico')).toBeVisible();
    await page.getByLabel('Correo electrónico').fill(`test-${Date.now()}@example.com`);
    await page.getByLabel('Confirmar correo').fill(`test-${Date.now()}@example.com`);
    await page.getByLabel('Contraseña', { exact: true }).fill('SecurePass123!');
    await page.getByLabel('Confirmar contraseña').fill('SecurePass123!');
    await page.getByRole('checkbox', { name: /términos y condiciones/i }).check();

    // Submit registration
    await page.getByRole('button', { name: 'Registrarse' }).click();

    // Should redirect to verification page or show success message
    await expect(page).toHaveURL(/verify|success/);
  });

  test('should navigate back through steps', async ({ page }) => {
    // Select buyer
    await page.getByText('Comprador').click();

    // Fill personal info
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Now on credentials step
    await expect(page.getByLabel('Correo electrónico')).toBeVisible();

    // Go back
    await page.getByRole('button', { name: 'Volver' }).click();

    // Should be back on personal info
    await expect(page.getByLabel('Nombre')).toBeVisible();
    await expect(page.getByLabel('Nombre')).toHaveValue('Juan');
  });

  test('should validate required fields', async ({ page }) => {
    // Select buyer
    await page.getByText('Comprador').click();

    // Try to continue without filling fields
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Should still be on the same page
    await expect(page.getByLabel('Nombre')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Navigate to credentials step
    await page.getByText('Comprador').click();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Enter invalid email
    await page.getByLabel('Correo electrónico').fill('invalid-email');
    await page.getByLabel('Correo electrónico').blur();

    // Should show validation error
    await expect(page.getByText(/correo.*inválido/i)).toBeVisible();
  });

  test('should validate password strength', async ({ page }) => {
    // Navigate to credentials step
    await page.getByText('Comprador').click();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Enter weak password
    await page.getByLabel('Contraseña', { exact: true }).fill('weak');

    // Should show password requirements
    await expect(page.getByText(/mínimo 10 caracteres/i)).toBeVisible();
  });

  test('should validate password confirmation match', async ({ page }) => {
    // Navigate to credentials step
    await page.getByText('Comprador').click();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Enter mismatched passwords
    await page.getByLabel('Contraseña', { exact: true }).fill('SecurePass123!');
    await page.getByLabel('Confirmar contraseña').fill('DifferentPass123!');
    await page.getByLabel('Confirmar contraseña').blur();

    // Should show validation error
    await expect(page.getByText(/contraseñas no coinciden/i)).toBeVisible();
  });

  test('should require terms and conditions acceptance', async ({ page }) => {
    // Navigate to credentials step
    await page.getByText('Comprador').click();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Fill all fields except terms
    await page.getByLabel('Correo electrónico').fill('test@example.com');
    await page.getByLabel('Confirmar correo').fill('test@example.com');
    await page.getByLabel('Contraseña', { exact: true }).fill('SecurePass123!');
    await page.getByLabel('Confirmar contraseña').fill('SecurePass123!');

    // Try to submit without accepting terms
    await page.getByRole('button', { name: 'Registrarse' }).click();

    // Should show validation error
    await expect(page.getByText(/debes aceptar.*términos/i)).toBeVisible();
  });

  test('should display progress indicator', async ({ page }) => {
    // Step 1
    await expect(page.getByText(/paso 1/i)).toBeVisible();

    // Select buyer
    await page.getByText('Comprador').click();

    // Step 2
    await expect(page.getByText(/paso 2 de 3/i)).toBeVisible();

    // Continue to step 3
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Step 3
    await expect(page.getByText(/paso 3 de 3/i)).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Complete the form
    await page.getByText('Comprador').click();
    await page.getByLabel('Nombre').fill('Juan');
    await page.getByLabel('Apellido').fill('Pérez');
    await page.getByLabel('Número de documento').fill('1234567890');
    await page.getByRole('button', { name: 'Continuar' }).click();

    await page.getByLabel('Correo electrónico').fill('test@example.com');
    await page.getByLabel('Confirmar correo').fill('test@example.com');
    await page.getByLabel('Contraseña', { exact: true }).fill('SecurePass123!');
    await page.getByLabel('Confirmar contraseña').fill('SecurePass123!');
    await page.getByRole('checkbox', { name: /términos/i }).check();

    // Submit
    await page.getByRole('button', { name: 'Registrarse' }).click();

    // Should show loading state
    await expect(page.getByText(/registrando/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /registrando/i })).toBeDisabled();
  });
});

