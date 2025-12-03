# Quick Setup Guide

## Step 1: Verify Installation

Make sure you have:
- Python 3.8+ installed
- Node.js 16+ installed
- All backend dependencies: `pip install -r requirements.txt`
- All frontend dependencies: Already installed ✓

## Step 2: Start the Application

### Option A: Use the startup script (Recommended)
```powershell
.\start.ps1
```
This will open two terminal windows - one for backend and one for frontend.

### Option B: Manual start

**Terminal 1 - Backend:**
```powershell
uvicorn backend.app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## Step 3: Access the Application

1. Open your browser and go to: **http://localhost:3000**
2. You'll see the login/register page
3. Register a new account to get started

## Step 4: Create Test Users

### Register a Student Account
- Username: `student1`
- Full Name: `John Doe`
- Password: `password123`
- Role: `Student`

### Register a Librarian Account
- Username: `librarian1`
- Full Name: `Jane Smith`
- Password: `password123`
- Role: `Librarian`

## Step 5: Add Sample Books (as Librarian)

1. Login with librarian account
2. Click "+ Add Book" button
3. Add sample books:

**Book 1:**
- Title: The Great Gatsby
- Author: F. Scott Fitzgerald
- ISBN: 978-0-7432-7356-5
- Total Copies: 5
- Description: A classic American novel

**Book 2:**
- Title: To Kill a Mockingbird
- Author: Harper Lee
- ISBN: 978-0-06-112008-4
- Total Copies: 3
- Description: A gripping tale of racial injustice

**Book 3:**
- Title: 1984
- Author: George Orwell
- ISBN: 978-0-452-28423-4
- Total Copies: 4
- Description: A dystopian social science fiction

## Step 6: Test Features

### As Student:
1. Browse books on the home page
2. Borrow a book
3. Go to "My Borrows" to see your borrowed books
4. Try to borrow all copies of a book, then reserve it
5. Return a book
6. Check notifications

### As Librarian:
1. Add, edit, and delete books
2. View all reservations
3. Create new users
4. See all system features

## Troubleshooting

### Backend not starting?
- Make sure port 8000 is not in use
- Check Python dependencies are installed: `pip list`
- Verify you're in the project root directory

### Frontend not starting?
- Make sure port 3000 is not in use
- Delete `node_modules` and run `npm install` again
- Check Node.js version: `node --version` (should be 16+)

### Can't login?
- Make sure backend is running and accessible at http://localhost:8000
- Check browser console for errors (F12)
- Try registering a new account

### No notifications?
- Notifications use Server-Sent Events (SSE)
- Make sure you're logged in
- Try borrowing/returning a book to trigger a notification
- Check browser console for SSE connection errors

## API Documentation

Once the backend is running, you can access interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Next Steps

1. Explore all features
2. Test the reservation system
3. Try the real-time notifications
4. Manage users (as librarian/admin)
5. Customize the UI in `frontend/src/style.css`

## Support

If you encounter any issues:
1. Check the terminal output for error messages
2. Review the README.md for detailed information
3. Check the browser console (F12) for frontend errors
4. Verify all dependencies are correctly installed

Enjoy using the Library Management System! 📚
