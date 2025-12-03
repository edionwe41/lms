# Testing Checklist

Use this checklist to verify all features are working correctly.

## 🚀 Initial Setup

- [ ] Backend starts without errors: `uvicorn backend.app.main:app --reload --port 8000`
- [ ] Frontend starts without errors: `cd frontend && npm run dev`
- [ ] Can access frontend at http://localhost:3000
- [ ] Can access API docs at http://localhost:8000/docs
- [ ] No console errors in browser (F12)

---

## 🔐 Authentication Tests

### Registration
- [ ] Can access registration form (click Register tab)
- [ ] Form validation works (try empty fields)
- [ ] Password length validation works (min 6 chars)
- [ ] Can register as student
- [ ] Can register as librarian
- [ ] Shows error for duplicate username
- [ ] Shows success message after registration
- [ ] Auto-switches to login tab after success

### Login
- [ ] Can login with correct credentials
- [ ] Shows error with wrong password
- [ ] Shows error with non-existent user
- [ ] Redirects to books page after login
- [ ] Token stored in localStorage
- [ ] User info displayed in navbar

### Logout
- [ ] Logout button works
- [ ] Redirects to login page
- [ ] Token removed from localStorage
- [ ] Can't access protected pages after logout
- [ ] Auto-redirects to login when accessing protected pages

---

## 📚 Books Page Tests

### As Student
- [ ] Can see all books in grid layout
- [ ] Search bar is visible
- [ ] Can search by title
- [ ] Can search by author
- [ ] Can search by ISBN
- [ ] Search results update correctly
- [ ] Available books show green badge
- [ ] Unavailable books show red badge
- [ ] [Borrow] button visible for available books
- [ ] [Reserve] button visible for unavailable books
- [ ] No [Add Book] button visible
- [ ] No [Edit]/[Delete] buttons visible

### As Librarian
- [ ] Can see [+ Add Book] button in header
- [ ] Can see [Edit] and [Delete] buttons on cards
- [ ] All student features work

### Add Book (Librarian)
- [ ] Click [+ Add Book] opens modal
- [ ] All form fields are present
- [ ] Required fields marked with *
- [ ] Form validation works
- [ ] Can submit with valid data
- [ ] New book appears in grid
- [ ] Modal closes after success
- [ ] Shows error if ISBN already exists

### Edit Book (Librarian)
- [ ] Click [Edit] opens modal
- [ ] Modal title says "Edit Book"
- [ ] Form pre-filled with book data
- [ ] ISBN field is disabled
- [ ] Can update title
- [ ] Can update author
- [ ] Can update total copies
- [ ] Can update description
- [ ] Changes reflected in grid
- [ ] Modal closes after success

### Delete Book (Librarian)
- [ ] Click [Delete] shows confirmation
- [ ] Can cancel deletion
- [ ] Can confirm deletion
- [ ] Book removed from grid
- [ ] Shows success message

### Borrow Book (Any User)
- [ ] Click [Borrow] on available book
- [ ] Shows success message
- [ ] Available count decreases
- [ ] Book shows as unavailable when all copies borrowed
- [ ] Button changes to [Reserve] when unavailable
- [ ] Notification appears in bell

---

## 📖 My Borrows Page Tests

### View Borrows
- [ ] Page shows all user's borrows
- [ ] Table has correct columns
- [ ] Dates formatted correctly
- [ ] Active borrows show "Active" badge (blue)
- [ ] Overdue borrows show "Overdue" badge (red)
- [ ] Returned borrows show "Returned" badge (green)
- [ ] Late fees calculated correctly (₦100/day)
- [ ] Empty state shows when no borrows

### Return Book
- [ ] [Return] button visible for active borrows
- [ ] Click [Return] shows confirmation
- [ ] Can cancel return
- [ ] Can confirm return
- [ ] Status changes to "Returned"
- [ ] Return date displayed
- [ ] [Return] button disappears
- [ ] Notification appears
- [ ] Book's available count increases on Books page

---

## 🔖 Reservations Page Tests

### View Reservations
- [ ] Page shows pending reservations
- [ ] Table has correct columns
- [ ] Shows user's full name and username
- [ ] Shows book ID
- [ ] Shows reservation date and time
- [ ] Status badges display correctly
- [ ] Pagination controls visible
- [ ] Empty state shows when no reservations

### Filters
- [ ] Can filter by book ID
- [ ] Can change page size
- [ ] Click [Apply] updates results
- [ ] Results respect filters

### Pagination
- [ ] [Previous] button disabled on page 1
- [ ] [Next] button disabled on last page
- [ ] Page info shows correct numbers
- [ ] Can navigate between pages
- [ ] Results update correctly

### Create Reservation
- [ ] Go to Books page
- [ ] Borrow all copies of a book
- [ ] Click [Reserve] on that book
- [ ] Shows success message
- [ ] Reservation appears in Reservations page

### Cancel Reservation
- [ ] Click [Cancel] shows confirmation
- [ ] Can cancel confirmation
- [ ] Can confirm cancellation
- [ ] Reservation removed from list
- [ ] Shows success message

---

## 👥 Users Page Tests (Librarian/Admin Only)

### Access Control
- [ ] Page visible to librarians
- [ ] Page visible to admins
- [ ] Page NOT visible to students (no link in navbar)
- [ ] Student redirected if accessing URL directly

### View Users
- [ ] Table shows all users
- [ ] Correct columns displayed
- [ ] Role badges color-coded correctly:
  - Admin = Red
  - Librarian = Blue
  - Student = Green
- [ ] Status badges show correctly
- [ ] All user data accurate

### Add User
- [ ] Click [+ Add User] opens modal
- [ ] All form fields present
- [ ] Can select role from dropdown
- [ ] Password field is type="password"
- [ ] Form validation works
- [ ] Can create student account
- [ ] Can create librarian account
- [ ] Can create admin account
- [ ] New user appears in table
- [ ] Shows error for duplicate username
- [ ] Modal closes after success

---

## 🔔 Notifications Tests

### Bell Icon
- [ ] Bell visible in navbar
- [ ] Shows count badge when unread notifications
- [ ] Count updates in real-time
- [ ] Click opens dropdown
- [ ] Click outside closes dropdown

### Notification Dropdown
- [ ] Shows "Notifications" header
- [ ] Shows unread count
- [ ] Lists notifications newest first
- [ ] Limited to 10 most recent
- [ ] Empty state shows when no notifications
- [ ] Icons display based on type:
  - 📚 for borrowed
  - ✅ for returned
  - 🔔 for reservation_ready
  - ⚠️ for overdue

### Real-time Updates
- [ ] Borrow a book → notification appears immediately
- [ ] Return a book → notification appears immediately
- [ ] Count badge updates automatically
- [ ] Unread items have blue background

### Mark as Read
- [ ] Click notification marks it as read
- [ ] Background changes from blue to white
- [ ] Unread count decreases
- [ ] State persists

### SSE Connection
- [ ] Check browser DevTools → Network tab
- [ ] SSE connection to `/api/notifications/stream` established
- [ ] Connection stays open
- [ ] Reconnects automatically if disconnected
- [ ] No errors in console

---

## 🔒 Security & Authorization Tests

### Protected Routes
- [ ] Can't access `/` without login
- [ ] Can't access `/my-borrows` without login
- [ ] Can't access `/reservations` without login
- [ ] Can't access `/users` without login
- [ ] All redirect to `/login`

### Role-Based Access
- [ ] Students can't access `/users` page
- [ ] Students can't see [Add Book] button
- [ ] Students can't see [Edit]/[Delete] buttons
- [ ] Librarians CAN access all pages
- [ ] Admins CAN access all pages

### Token Expiry
- [ ] Delete token from localStorage
- [ ] Refresh page
- [ ] Redirected to login
- [ ] Backend returns 401 for API calls
- [ ] Auto-logout triggered

### API Authorization
- [ ] API requests include Bearer token
- [ ] 401 responses trigger logout
- [ ] Protected endpoints reject unauthenticated requests

---

## 🎨 UI/UX Tests

### Responsive Design
- [ ] Resize browser to mobile width (<768px)
- [ ] Navbar stacks vertically
- [ ] Book grid becomes 1 column
- [ ] Tables scroll horizontally
- [ ] Buttons remain accessible
- [ ] Forms are full-width

### Loading States
- [ ] Spinner shows while loading books
- [ ] Spinner shows while loading borrows
- [ ] Spinner shows while loading reservations
- [ ] Spinner shows while loading users
- [ ] Buttons show "Loading..." text during submit

### Error Handling
- [ ] Form errors display in red
- [ ] API errors show alert messages
- [ ] Network errors handled gracefully
- [ ] 404 errors for non-existent resources

### Animations & Transitions
- [ ] Buttons have hover effects
- [ ] Active nav links highlighted
- [ ] Modals fade in/out
- [ ] Notifications slide in
- [ ] Smooth page transitions

---

## 📊 Data Validation Tests

### Books
- [ ] Can't add book without title
- [ ] Can't add book without author
- [ ] Can't add book without ISBN
- [ ] Total copies must be >= 1
- [ ] Description is optional

### Users
- [ ] Username required
- [ ] Full name required
- [ ] Password required
- [ ] Password must be 6+ characters
- [ ] Role must be selected

### Forms
- [ ] Required fields show validation errors
- [ ] Email format validated (if applicable)
- [ ] Number fields only accept numbers
- [ ] Date fields formatted correctly

---

## 🔄 Integration Tests

### End-to-End Workflows

**Student Borrows Book**:
1. [ ] Login as student
2. [ ] Search for book
3. [ ] Click [Borrow]
4. [ ] Check notification appears
5. [ ] Go to My Borrows
6. [ ] See borrowed book
7. [ ] Click [Return]
8. [ ] Check notification appears
9. [ ] Status changes to Returned

**Librarian Manages Books**:
1. [ ] Login as librarian
2. [ ] Add new book
3. [ ] Book appears in catalogue
4. [ ] Edit the book
5. [ ] Changes reflected
6. [ ] Delete the book
7. [ ] Book removed

**Reservation Flow**:
1. [ ] Login as student1
2. [ ] Borrow all copies of a book
3. [ ] Logout
4. [ ] Login as student2
5. [ ] Try to borrow same book
6. [ ] Click [Reserve] instead
7. [ ] Go to Reservations page
8. [ ] See reservation listed
9. [ ] Logout
10. [ ] Login as student1
11. [ ] Return the book
12. [ ] Login as student2
13. [ ] Check if notified (in future implementation)

---

## 🐛 Bug Testing

### Common Scenarios
- [ ] Multiple rapid clicks don't cause duplicates
- [ ] Empty search returns all books
- [ ] Special characters in search don't break
- [ ] Very long book titles display correctly
- [ ] Very long descriptions display correctly
- [ ] Pagination works with different page sizes
- [ ] Date formatting handles different timezones
- [ ] Notifications don't duplicate

### Edge Cases
- [ ] Try to borrow book with 0 copies
- [ ] Try to return already returned book
- [ ] Try to reserve available book
- [ ] Try to access other user's borrows via URL
- [ ] Try SQL injection in forms
- [ ] Try XSS in text fields
- [ ] Try accessing deleted book

---

## ✅ Final Checks

- [ ] No console errors in browser
- [ ] No 404s in Network tab
- [ ] No CORS errors
- [ ] All images/icons load
- [ ] All links work
- [ ] All buttons work
- [ ] App works after refresh
- [ ] App works in incognito mode
- [ ] Multiple tabs work correctly
- [ ] Logout works from all tabs

---

## 📝 Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

---

## 🎉 Production Readiness

- [ ] Run `npm run build` successfully
- [ ] Preview build with `npm run preview`
- [ ] Production build works correctly
- [ ] No development warnings in console
- [ ] Environment variables configured
- [ ] CORS configured for production
- [ ] Database backed up

---

## Summary

**Total Tests**: ~200
**Must Pass**: All core functionality tests
**Nice to Have**: All edge case and browser tests

Mark each checkbox as you test. If any test fails, document the issue and fix before deploying to production.
