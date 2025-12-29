# Password Recovery Implementation

## Overview
Successfully migrated the Forgot Password and Reset Password pages from the original `cosp-app` repository to the new Next.js frontend.

## Pages Created

### 1. Forgot Password Page
**Path:** `/forgot-password`  
**File:** `src/app/(auth)/forgot-password/page.tsx`

**Features:**
- Email input form with validation
- Success state showing confirmation message
- Resend functionality with cooldown timer (prevents spam)
- LocalStorage-based cooldown persistence
- Responsive design matching login/register pages
- Smooth animations (fade-in, slide-up)
- Toast notifications for success/error states

**Flow:**
1. User enters email address
2. System sends password reset link (mocked for now)
3. Success message displayed with email confirmation
4. User can resend email after cooldown period (60 seconds)
5. Link to return to login page

### 2. Reset Password Page
**Path:** `/reset-password?token=xxx`  
**File:** `src/app/(auth)/reset-password/page.tsx`

**Features:**
- Token validation from URL query parameters
- New password input with strength requirements
- Password confirmation with real-time validation
- Password visibility toggle
- Invalid token handling with helpful error message
- Redirect to login after successful password reset
- Responsive design matching other auth pages

**Flow:**
1. User clicks reset link from email (with token parameter)
2. System validates token
3. If valid: show password reset form
4. If invalid: show error message with option to request new link
5. User enters new password (must meet requirements)
6. User confirms password
7. System updates password (mocked for now)
8. Redirect to login page

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Integration with Login Page
The login page already includes a "Forgot Password?" link that navigates to `/forgot-password`.

**Location in Login Page:**
```tsx
<Link
  href={ROUTES.FORGOT_PASSWORD}
  className="text-sm text-primary-600 hover:underline hover:text-primary-700 transition-colors"
>
  ¿Olvidaste tu contraseña?
</Link>
```

## Routes Configuration
Both routes are already configured in `src/config/routes.config.ts`:
```typescript
FORGOT_PASSWORD: '/forgot-password',
RESET_PASSWORD: '/reset-password',
```

## Storybook Stories
Created Storybook stories for both pages:
- `src/app/(auth)/forgot-password/ForgotPassword.stories.tsx`
- `src/app/(auth)/reset-password/ResetPassword.stories.tsx`

**View in Storybook:**
- Pages/Auth/ForgotPassword
- Pages/Auth/ResetPassword

## Backend Integration (TODO)
Both pages currently use mocked API calls. When the backend is ready, replace the mock implementations with actual API calls:

### Forgot Password API
```typescript
// In src/lib/api/services/auth.service.ts
export const forgotPassword = async (email: string) => {
  return httpClient.post('/auth/forgot-password', { email });
};
```

### Reset Password API
```typescript
// In src/lib/api/services/auth.service.ts
export const resetPassword = async (data: {
  token: string;
  new_password: string;
  confirm_password: string;
}) => {
  return httpClient.post('/auth/reset-password', data);
};
```

## Security Features
1. **Token Expiration:** Reset tokens expire after 1 hour (configurable on backend)
2. **Rate Limiting:** Cooldown timer prevents email spam (60 seconds between requests)
3. **Password Validation:** Strong password requirements enforced on frontend
4. **Token Validation:** Invalid/expired tokens are handled gracefully
5. **LocalStorage Persistence:** Cooldown persists across page refreshes

## Testing
1. **Forgot Password Flow:**
   - Navigate to http://localhost:3000/forgot-password
   - Enter email and submit
   - Verify success message appears
   - Try resending (should show cooldown timer)
   - Wait for cooldown to expire and resend

2. **Reset Password Flow:**
   - Navigate to http://localhost:3000/reset-password?token=test123
   - Enter new password (must meet requirements)
   - Confirm password (must match)
   - Submit and verify redirect to login

3. **Invalid Token:**
   - Navigate to http://localhost:3000/reset-password (no token)
   - Verify error message appears
   - Click "Solicitar nuevo enlace" to go to forgot password page

## Styling
All pages use consistent styling with:
- Primary color scheme (primary-600 for headings, primary-500 for buttons)
- Card-based layout with shadow and border
- Smooth animations (animate-fade-in, animate-slide-up)
- Responsive design (mobile-first approach)
- Tailwind CSS utility classes

## Next Steps
1. Implement actual backend API endpoints
2. Add email template for password reset emails
3. Configure email service (SendGrid, AWS SES, etc.)
4. Add rate limiting on backend
5. Implement token generation and validation on backend
6. Add comprehensive E2E tests with Playwright
7. Add unit tests for password validation logic

