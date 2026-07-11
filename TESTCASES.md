Test Cases - Ultimez Auth App

Login
1. Try submitting empty login form - should show errors for email and password.
2. Enter invalid email like "abc" - should show email format error.
3. Enter password less than 6 characters - should show password error.
4. Login with developer@gmail.com / 123123 - should go to dashboard.
5. Enter wrong password - should show error and stay on login page.
6. After login, refresh the page - dashboard should still work.
7. Clear storage and open dashboard directly - should redirect to login.

Register
1. Submit empty register form - all fields should show errors.
2. Enter invalid email - should show email error.
3. Enter mobile number that is not 10 digits - should show mobile error.
4. Enter short password - should show password error.
5. Fill all fields correctly with new details - should register and go to login.
6. Click "Login here" from register page - should open login.
7. Click "Register here" from login page - should open register.

Dashboard
1. After login, check table shows fullname, username, country, email, mobile and referral id.
2. Click logout - should clear session and go back to login.
3. Try opening dashboard after logout - should redirect to login.

API
1. Check network tab - login/register requests should have api_key header.
2. Login should hit /user/login and register should hit /user/register.
