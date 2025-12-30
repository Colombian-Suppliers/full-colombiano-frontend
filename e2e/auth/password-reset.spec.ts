import { test, expect } from '@playwright/test';

test.describe('Password Reset E2E', () => {
  test.describe('Forgot Password Flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/forgot-password');
    });

    test('should display forgot password form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /¿olvidaste tu contraseña\?/i })).toBeVisible();
      await expect(page.getByLabel(/correo electrónico/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /enviar enlace/i })).toBeVisible();
    });

    test('should send password reset email', async ({ page }) => {
      // Mock successful API response
      await page.route('**/api/auth/forgot-password', async route => {
        await route.fulfill({
          status: 200,
          json: { message: 'Email sent successfully' }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('test@example.com');
      await page.getByRole('button', { name: /enviar enlace/i }).click();

      // Should show success message
      await expect(page.getByText(/correo enviado/i)).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.getByLabel(/correo electrónico/i).fill('invalid-email');
      await page.getByLabel(/correo electrónico/i).blur();

      // Should show validation error
      await expect(page.getByText(/correo.*inválido/i)).toBeVisible();
    });

    test('should show loading state during submission', async ({ page }) => {
      await page.route('**/api/auth/forgot-password', async route => {
        // Delay response
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          json: { message: 'Email sent' }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('test@example.com');
      await page.getByRole('button', { name: /enviar enlace/i }).click();

      // Should show loading state
      await expect(page.getByText(/enviando/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /enviando/i })).toBeDisabled();
    });

    test('should implement cooldown period', async ({ page }) => {
      await page.route('**/api/auth/forgot-password', async route => {
        await route.fulfill({
          status: 200,
          json: { message: 'Email sent' }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('test@example.com');
      await page.getByRole('button', { name: /enviar enlace/i }).click();

      await expect(page.getByText(/correo enviado/i)).toBeVisible();

      // Resend button should be disabled
      const resendButton = page.getByText(/reenviar/i);
      await expect(resendButton).toBeDisabled();

      // Should show countdown
      await expect(page.getByText(/segundos/i)).toBeVisible();
    });

    test('should navigate back to login', async ({ page }) => {
      await page.getByText(/volver.*inicio de sesión/i).click();
      await expect(page).toHaveURL(/login/);
    });

    test('should handle API errors gracefully', async ({ page }) => {
      await page.route('**/api/auth/forgot-password', async route => {
        await route.fulfill({
          status: 404,
          json: { detail: 'Email not found' }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('nonexistent@example.com');
      await page.getByRole('button', { name: /enviar enlace/i }).click();

      // Should show error message
      await expect(page.getByText(/error|no encontrado/i)).toBeVisible();
    });
  });

  test.describe('Reset Password Flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/reset-password?token=valid-token-123');
    });

    test('should display reset password form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /restablecer contraseña/i })).toBeVisible();
      await expect(page.getByLabel(/nueva contraseña/i)).toBeVisible();
      await expect(page.getByLabel(/confirmar contraseña/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /restablecer contraseña/i })).toBeVisible();
    });

    test('should reset password successfully', async ({ page }) => {
      await page.route('**/api/auth/reset-password', async route => {
        await route.fulfill({
          status: 200,
          json: { message: 'Password reset successful' }
        });
      });

      await page.getByLabel(/nueva contraseña/i).fill('NewSecurePass123!');
      await page.getByLabel(/confirmar contraseña/i).fill('NewSecurePass123!');
      await page.getByRole('button', { name: /restablecer contraseña/i }).click();

      // Should show success and redirect to login
      await expect(page).toHaveURL(/login/);
    });

    test('should validate password strength', async ({ page }) => {
      await page.getByLabel(/nueva contraseña/i).fill('weak');
      await page.getByLabel(/nueva contraseña/i).blur();

      // Should show password requirements
      await expect(page.getByText(/mínimo 10 caracteres/i)).toBeVisible();
      await expect(page.getByText(/mayúscula/i)).toBeVisible();
      await expect(page.getByText(/minúscula/i)).toBeVisible();
      await expect(page.getByText(/número/i)).toBeVisible();
      await expect(page.getByText(/carácter especial/i)).toBeVisible();
    });

    test('should validate password confirmation match', async ({ page }) => {
      await page.getByLabel(/nueva contraseña/i).fill('SecurePass123!');
      await page.getByLabel(/confirmar contraseña/i).fill('DifferentPass123!');
      await page.getByLabel(/confirmar contraseña/i).blur();

      // Should show error
      await expect(page.getByText(/contraseñas no coinciden/i)).toBeVisible();
    });

    test('should toggle password visibility', async ({ page }) => {
      const newPasswordInput = page.getByLabel(/nueva contraseña/i);
      
      // Should be hidden by default
      await expect(newPasswordInput).toHaveAttribute('type', 'password');

      // Toggle visibility
      const toggleButtons = page.getByRole('button', { name: /mostrar|ver/i });
      await toggleButtons.first().click();

      // Should be visible
      await expect(newPasswordInput).toHaveAttribute('type', 'text');
    });

    test('should show loading state during submission', async ({ page }) => {
      await page.route('**/api/auth/reset-password', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          json: { message: 'Success' }
        });
      });

      await page.getByLabel(/nueva contraseña/i).fill('NewSecurePass123!');
      await page.getByLabel(/confirmar contraseña/i).fill('NewSecurePass123!');
      await page.getByRole('button', { name: /restablecer contraseña/i }).click();

      // Should show loading state
      await expect(page.getByText(/restableciendo/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /restableciendo/i })).toBeDisabled();
    });

    test('should handle invalid token', async ({ page }) => {
      await page.goto('/reset-password?token=invalid-token');

      // Should show error message
      await expect(page.getByText(/enlace inválido|expirado/i)).toBeVisible();
    });

    test('should handle missing token', async ({ page }) => {
      await page.goto('/reset-password');

      // Should show error message
      await expect(page.getByText(/enlace inválido|no encontrado/i)).toBeVisible();
    });

    test('should handle expired token', async ({ page }) => {
      await page.route('**/api/auth/reset-password', async route => {
        await route.fulfill({
          status: 400,
          json: { detail: 'Token expired' }
        });
      });

      await page.getByLabel(/nueva contraseña/i).fill('NewSecurePass123!');
      await page.getByLabel(/confirmar contraseña/i).fill('NewSecurePass123!');
      await page.getByRole('button', { name: /restablecer contraseña/i }).click();

      // Should show error
      await expect(page.getByText(/expirado|inválido/i)).toBeVisible();
    });
  });

  test.describe('Complete Password Reset Journey', () => {
    test('should complete full password reset flow', async ({ page }) => {
      // Step 1: Request password reset
      await page.goto('/forgot-password');

      await page.route('**/api/auth/forgot-password', async route => {
        await route.fulfill({
          status: 200,
          json: { message: 'Email sent' }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('test@example.com');
      await page.getByRole('button', { name: /enviar enlace/i }).click();

      await expect(page.getByText(/correo enviado/i)).toBeVisible();

      // Step 2: Click reset link (simulated)
      await page.goto('/reset-password?token=valid-token-123');

      // Step 3: Reset password
      await page.route('**/api/auth/reset-password', async route => {
        await route.fulfill({
          status: 200,
          json: { message: 'Password reset successful' }
        });
      });

      await page.getByLabel(/nueva contraseña/i).fill('NewSecurePass123!');
      await page.getByLabel(/confirmar contraseña/i).fill('NewSecurePass123!');
      await page.getByRole('button', { name: /restablecer contraseña/i }).click();

      // Should redirect to login
      await expect(page).toHaveURL(/login/);

      // Step 4: Login with new password
      await page.route('**/api/auth/login', async route => {
        await route.fulfill({
          status: 200,
          json: { access_token: 'token', user: { id: 1, email: 'test@example.com' } }
        });
      });

      await page.getByLabel(/correo electrónico/i).fill('test@example.com');
      await page.getByLabel(/contraseña/i).fill('NewSecurePass123!');
      await page.getByRole('button', { name: /iniciar sesión/i }).click();

      // Should successfully login
      await expect(page).toHaveURL(/dashboard|home/);
    });
  });
});

