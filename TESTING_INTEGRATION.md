# 🧪 Testing Frontend-Backend Integration

## ✅ Integration Complete!

The frontend is now fully integrated with the FastAPI backend using type-safe API calls.

## 🚀 What's Running

### Backend
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: PostgreSQL (seeded with test data)

### Frontend
- **URL**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register

## 🧪 Test Scenarios

### 1. **Login Flow** ✅

#### Test Admin Login
1. Go to http://localhost:3000/login
2. Enter credentials:
   ```
   Email: admin@fullcolombiano.com
   Password: Admin123!
   ```
3. Click "Iniciar Sesión"
4. Should redirect to dashboard
5. Check browser console - no errors
6. Check localStorage - `auth_token` should be saved

#### Test Vendor Login
1. Go to http://localhost:3000/login
2. Enter credentials:
   ```
   Email: vendor1@example.com
   Password: Password123!
   ```
3. Should login successfully and redirect to vendor dashboard

#### Test Customer Login
1. Go to http://localhost:3000/login
2. Enter credentials:
   ```
   Email: customer@example.com
   Password: Password123!
   ```
3. Should login successfully and redirect to marketplace

#### Test Invalid Credentials
1. Go to http://localhost:3000/login
2. Enter wrong credentials:
   ```
   Email: wrong@example.com
   Password: wrongpass
   ```
3. Should show error: "Email o contraseña incorrectos"

### 2. **Registration Flow** ✅

#### Test Customer Registration
1. Go to http://localhost:3000/register
2. Select "Comprador" (Customer)
3. Fill in the form:
   ```
   First Name: Juan
   Last Name: Pérez
   Email: juan.perez@example.com
   Password: SecurePass123!
   Confirm Password: SecurePass123!
   ```
4. Accept terms and privacy
5. Click "Registrarse"
6. Should register successfully
7. Check if logged in automatically

#### Test Vendor Registration
1. Go to http://localhost:3000/register
2. Select "Vendedor" (Vendor)
3. Select person type (Natural/Jurídica)
4. Fill in personal and store information
5. Submit
6. Should register successfully

#### Test Duplicate Email
1. Try to register with existing email: `admin@fullcolombiano.com`
2. Should show error: "El email ya está registrado"

### 3. **Protected Routes** ✅

#### Test Without Login
1. Clear localStorage: `localStorage.clear()`
2. Try to access protected route (e.g., /dashboard)
3. Should redirect to /login

#### Test With Login
1. Login first
2. Access protected routes
3. Should work normally

### 4. **Token Persistence** ✅

#### Test Remember Me
1. Login with "Remember me" checked
2. Close browser
3. Open again and visit site
4. Should still be logged in

#### Test Session Only
1. Login without "Remember me"
2. Refresh page
3. Should still be logged in (token in localStorage)

### 5. **Logout Flow** ✅

1. Login first
2. Click logout button
3. Should clear token from localStorage
4. Should redirect to /login
5. Try accessing protected route
6. Should redirect to /login

## 🔍 Debugging

### Check API Calls

Open browser DevTools (F12) → Network tab:

```javascript
// Should see these requests:
POST /api/v1/auth/login
GET /api/v1/auth/me
GET /api/v1/geo/departments
// etc.
```

### Check Token

Open browser console:

```javascript
// Check if token is saved
console.log(localStorage.getItem('auth_token'));

// Check user data
console.log(localStorage.getItem('user'));

// Test API call manually
fetch('http://localhost:8000/api/v1/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  }
}).then(r => r.json()).then(console.log);
```

### Check Backend Logs

```bash
# View backend logs
docker logs fullcolombiano-api-dev -f

# Should see:
# INFO: POST /api/v1/auth/login
# INFO: GET /api/v1/auth/me
```

## 🐛 Common Issues

### Issue: "Network Error"
**Solution**: Make sure backend is running at http://localhost:8000

```bash
curl http://localhost:8000/health
```

### Issue: "401 Unauthorized"
**Solution**: Token might be expired or invalid

```bash
# Clear localStorage and login again
localStorage.clear();
```

### Issue: CORS Error
**Solution**: Backend should have CORS configured for http://localhost:3000

Check backend `app/main.py`:
```python
allow_origins=["http://localhost:3000"]
```

### Issue: Types Not Found
**Solution**: Regenerate types

```bash
npm run generate:api-types
```

## ✨ Features Working

- ✅ Login with real API
- ✅ Registration with real API
- ✅ Automatic token injection
- ✅ Protected routes
- ✅ Error handling with Spanish messages
- ✅ Loading states
- ✅ Token persistence
- ✅ Logout
- ✅ Type-safe API calls
- ✅ Auto-redirect on 401

## 📊 Test Credentials

### Admin
```
Email: admin@fullcolombiano.com
Password: Admin123!
Role: admin
```

### Vendor 1
```
Email: vendor1@example.com
Password: Password123!
Role: vendor
Store: Tech Store Colombia (Approved)
```

### Vendor 2
```
Email: vendor2@example.com
Password: Password123!
Role: vendor
Store: Fashion Store (Pending)
```

### Customer
```
Email: customer@example.com
Password: Password123!
Role: customer
```

## 🎯 Next Steps

1. ✅ Login/Register working with real API
2. ⏳ Update other pages to use real API:
   - Dashboard
   - Products
   - Orders
   - Profile
3. ⏳ Add email verification flow
4. ⏳ Add password reset flow
5. ⏳ Add loading skeletons
6. ⏳ Add error boundaries

## 🔗 Quick Links

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Login Page**: http://localhost:3000/login
- **Register Page**: http://localhost:3000/register

## 📝 Notes

- All API calls are type-safe using generated types
- Errors are automatically translated to Spanish
- Token is automatically included in all requests
- 401 errors auto-redirect to login
- Types are regenerated on every build

