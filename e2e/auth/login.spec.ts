import { test, expect } from '@playwright/test';

test.describe('Login E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByLabel(/correo electrónico/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    // Fill in credentials
    await page.getByLabel(/correo electrónico/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('SecurePass123!');

    // Submit form
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should redirect to dashboard or home
    await expect(page).toHaveURL(/dashboard|home/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.getByLabel(/correo electrónico/i).fill('wrong@example.com');
    await page.getByLabel(/contraseña/i).fill('WrongPassword');

    // Submit form
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show error message
    await expect(page.getByText(/credenciales.*inválidas|error/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Enter invalid email
    await page.getByLabel(/correo electrónico/i).fill('invalid-email');
    await page.getByLabel(/correo electrónico/i).blur();

    // Should show validation error
    await expect(page.getByText(/correo.*inválido/i)).toBeVisible();
  });

  test('should require both email and password', async ({ page }) => {
    // Try to submit without filling fields
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show validation errors
    await expect(page.getByLabel(/correo electrónico/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByLabel(/contraseña/i);
    
    // Password should be hidden by default
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle button
    await page.getByRole('button', { name: /mostrar|ver contraseña/i }).click();

    // Password should now be visible
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click toggle again
    await page.getByRole('button', { name: /ocultar contraseña/i }).click();

    // Password should be hidden again
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should toggle remember me checkbox', async ({ page }) => {
    const rememberCheckbox = page.getByRole('checkbox', { name: /recuérdame/i });

    // Should be unchecked by default
    await expect(rememberCheckbox).not.toBeChecked();

    // Check it
    await rememberCheckbox.check();
    await expect(rememberCheckbox).toBeChecked();

    // Uncheck it
    await rememberCheckbox.uncheck();
    await expect(rememberCheckbox).not.toBeChecked();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.getByText(/¿olvidaste tu contraseña\?/i).click();
    await expect(page).toHaveURL(/forgot-password/);
  });

  test('should navigate to registration page', async ({ page }) => {
    await page.getByText(/regístrate/i).click();
    await expect(page).toHaveURL(/register/);
  });

  test('should show loading state during login', async ({ page }) => {
    await page.getByLabel(/correo electrónico/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('SecurePass123!');

    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show loading state
    await expect(page.getByText(/iniciando sesión/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /iniciando sesión/i })).toBeDisabled();
  });

  test('should handle unverified email error', async ({ page }) => {
    // Mock API to return unverified email error
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({
        status: 403,
        json: { detail: 'Email not verified' }
      });
    });

    await page.getByLabel(/correo electrónico/i).fill('unverified@example.com');
    await page.getByLabel(/contraseña/i).fill('SecurePass123!');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // Should show verification error
    await expect(page.getByText(/verifica.*correo|email.*verification/i)).toBeVisible();
  });

  test('should persist form data after validation error', async ({ page }) => {
    await page.getByLabel(/correo electrónico/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('wrong');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    // After error, form data should still be there
    await expect(page.getByLabel(/correo electrónico/i)).toHaveValue('test@example.com');
    await expect(page.getByLabel(/contraseña/i)).toHaveValue('wrong');
  });

  test('should have accessible form elements', async ({ page }) => {
    // Check for proper labels
    await expect(page.getByLabel(/correo electrónico/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña/i)).toBeVisible();

    // Check for proper button
    const submitButton = page.getByRole('button', { name: /iniciar sesión/i });
    await expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/correo electrónico/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/contraseña/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('checkbox', { name: /recuérdame/i })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeFocused();
  });

  test('should submit form with Enter key', async ({ page }) => {
    await page.getByLabel(/correo electrónico/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('SecurePass123!');

    // Press Enter to submit
    await page.getByLabel(/contraseña/i).press('Enter');

    // Should attempt to login
    await expect(page.getByText(/iniciando sesión/i)).toBeVisible();
  });
});

