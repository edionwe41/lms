# Quick Reference Card

## 🚀 Commands

```powershell
# Start Everything (Easiest!)
.\start.ps1

# Or Start Manually:
# Terminal 1:
uvicorn backend.app.main:app --reload --port 8000

# Terminal 2:
cd frontend
npm run dev

# Build for Production:
cd frontend
npm run build
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 👤 Create Test Accounts

| Role | Username | Password |
|------|----------|----------|
| Student | `student1` | `password123` |
| Librarian | `librarian1` | `password123` |
| Admin | `admin1` | `password123` |

## 📚 Sample Book Data

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "total_copies": 5,
  "description": "A classic American novel"
}
```

## 🎯 Features by Role

### Student
- Browse & search books
- Borrow available books
- Reserve unavailable books
- View my borrows
- Return books
- Get notifications
- Manage reservations

### Librarian (+ All Student Features)
- Add new books
- Edit books
- Delete books
- View all reservations
- Create users
- View all users

### Admin (+ All Librarian Features)
- Full system access

## 📁 Important Files

| File | Purpose |
|------|---------|
| `start.ps1` | Startup script (Windows) |
| `START_HERE.md` | Complete guide |
| `SETUP.md` | Quick setup |
| `TESTING.md` | Test checklist |
| `frontend/src/App.vue` | Root component |
| `frontend/src/router/index.js` | Routes |
| `backend/app/main.py` | Backend entry |

## 🔧 Common Tasks

### Add a Book (Librarian)
1. Login as librarian
2. Click `[+ Add Book]`
3. Fill form
4. Click `[Save]`

### Borrow a Book
1. Login as student
2. Find book
3. Click `[Borrow]`
4. Check notifications 🔔

### Return a Book
1. Go to "My Borrows"
2. Find book
3. Click `[Return]`
4. Confirm

### Reserve a Book
1. Find unavailable book
2. Click `[Reserve]`
3. Check Reservations page

### Create User (Librarian)
1. Go to "Users"
2. Click `[+ Add User]`
3. Fill form
4. Click `[Create User]`

## 🐛 Quick Fixes

### Backend won't start
```powershell
pip install -r requirements.txt
```

### Frontend won't start
```powershell
cd frontend
npm install
```

### Port in use
```powershell
# Change port in start.ps1
# Or kill process:
netstat -ano | findstr :8000
taskkill /PID <pid> /F
```

### Can't login
- Check backend is running
- Clear localStorage
- Try registering new account

### No notifications
- Check SSE connection in Network tab
- Verify token is valid
- Refresh page

## 📊 API Endpoints Quick Reference

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Books
- `GET /api/books/`
- `POST /api/books/`
- `PUT /api/books/{id}`
- `DELETE /api/books/{isbn}`

### Borrows
- `POST /api/borrows/`
- `POST /api/borrows/return/{id}`
- `GET /api/borrows/me`

### Reservations
- `POST /api/reservations/`
- `GET /api/reservations/`
- `DELETE /api/reservations/{id}`

### Users
- `GET /api/users/`
- `POST /api/users/`

### Notifications
- `GET /api/notifications/`
- `POST /api/notifications/mark-read`
- `GET /api/notifications/stream` (SSE)

## 🎨 Color Variables

Edit in `frontend/src/style.css`:

```css
--primary-color: #4a90e2;
--secondary-color: #50c878;
--danger-color: #e74c3c;
--warning-color: #f39c12;
```

## 📱 Keyboard Shortcuts

- `Enter` in search → Search
- `Enter` in forms → Submit
- `Esc` in modals → Close
- `Tab` → Navigate fields

## 🔐 Security

- JWT tokens in localStorage
- Bearer token in API requests
- Role-based access control
- Protected routes
- Auto-logout on 401

## 📞 Support

1. Check browser console (F12)
2. Check terminal output
3. Review documentation
4. Check Network tab for API errors
5. Verify all services running

## ✅ Health Check

```powershell
# Backend
curl http://localhost:8000/healthz

# Frontend
# Open http://localhost:3000 in browser
```

## 📚 Documentation Files

1. **START_HERE.md** ← Read this first!
2. **README.md** - Project overview
3. **SETUP.md** - Setup instructions
4. **IMPLEMENTATION.md** - Technical details
5. **VISUAL_GUIDE.md** - UI reference
6. **TESTING.md** - Test checklist
7. **QUICK_REFERENCE.md** - This file!

---

**Keep this card handy for quick reference!**
