# 🧪 Test Login Flow

## Steps to Test

1. **Open Browser Console** (F12 → Console tab)

2. **Go to Login Page**: http://localhost:3000/login

3. **Enter Credentials**:
   ```
   Email: admin@fullcolombiano.com
   Password: Admin123!
   ```

4. **Click "Iniciar sesión"**

5. **Watch Console Output**:
   ```
   User from localStorage: {...}
   User role: admin
   Redirecting to: /d
   ```

6. **Expected Behavior**:
   - Toast message: "Inicio de sesión exitoso"
   - Console shows user data and redirect URL
   - Page redirects to `/d` (Dashboard)

## Debug Steps

### Check if API is working:

Open browser console and run:

```javascript
// Test API directly
fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin@fullcolombiano.com',
    password: 'Admin123!'
  })
})
.then(r => r.json())
.then(data => {
  console.log('API Response:', data);
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  console.log('Token saved:', data.token);
  console.log('User saved:', data.user);
});
```

### Check localStorage:

```javascript
// Check what's in localStorage
console.log('Token:', localStorage.getItem('auth_token'));
console.log('User:', localStorage.getItem('user'));
```

### Manual redirect test:

```javascript
// After login, manually redirect
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user.role);

if (user.role === 'admin' || user.role === 'vendor') {
  window.location.href = '/d';
} else {
  window.location.href = '/marketplace';
}
```

## Common Issues

### Issue 1: No redirect happening
**Solution**: Check console for errors. The `window.location.href` should force a redirect.

### Issue 2: Redirects to landing instead
**Solution**: Check if there's a middleware or auth guard redirecting. Look for console logs showing the redirect URL.

### Issue 3: Token not saved
**Solution**: Check if the API response includes `token` and `user` fields.

## Test All Roles

### Admin
```
Email: admin@fullcolombiano.com
Password: Admin123!
Expected: Redirect to /d
```

### Vendor
```
Email: vendor1@example.com
Password: Password123!
Expected: Redirect to /d
```

### Customer
```
Email: customer@example.com
Password: Password123!
Expected: Redirect to /marketplace
```

## What Should Happen

1. ✅ Form submits
2. ✅ API call to `/api/v1/auth/login`
3. ✅ Response with `token` and `user`
4. ✅ Token saved to localStorage
5. ✅ User saved to localStorage
6. ✅ Console logs show user role
7. ✅ Console logs show redirect URL
8. ✅ `window.location.href` changes
9. ✅ Page redirects to dashboard or marketplace
10. ✅ Dashboard/Marketplace loads user data

## If Still Not Working

Run this in console after login:

```javascript
// Force redirect based on role
const userStr = localStorage.getItem('user');
if (userStr) {
  const user = JSON.parse(userStr);
  console.log('User:', user);
  console.log('Role:', user.role);
  
  if (user.role === 'admin' || user.role === 'vendor') {
    console.log('Redirecting to dashboard...');
    window.location.href = '/d';
  } else {
    console.log('Redirecting to marketplace...');
    window.location.href = '/marketplace';
  }
}
```

