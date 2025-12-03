# Library Management System

A full-stack Library Management System with FastAPI backend and Vue.js frontend.

## Features

### Backend (FastAPI)
- RESTful API with FastAPI
- JWT authentication with role-based access control
- SQLAlchemy ORM with SQLite database
- Real-time notifications via Server-Sent Events (SSE)
- Book catalogue management
- Borrow and return tracking with late fees
- Reservation system with notifications

### Frontend (Vue.js)
- Modern, responsive UI built with Vue 3
- Real-time notifications
- Role-based access control
- Book browsing and search
- Borrow management
- Reservation system
- User management (admin/librarian)

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Setup

1. **Install Backend Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Start Backend Server**
   ```bash
   # From project root
   uvicorn backend.app.main:app --reload --port 8000
   ```
   Backend will run at: `http://localhost:8000`
   API docs available at: `http://localhost:8000/docs`

4. **Start Frontend Dev Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run at: `http://localhost:3000`

## Project Structure

```
lms/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration & security
│   │   ├── crud/         # Database operations
│   │   ├── db/           # Database models & session
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   └── main.py           # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── components/   # Vue components
│   │   ├── views/        # Page views
│   │   ├── services/     # API client
│   │   ├── stores/       # State management
│   │   └── router/       # Vue Router
│   ├── index.html
│   └── package.json
├── requirements.txt      # Python dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Books
- `GET /api/books/` - List all books (with optional search)
- `POST /api/books/` - Add book (librarian only)
- `PUT /api/books/{id}` - Update book (librarian only)
- `DELETE /api/books/{isbn}` - Delete book (librarian only)

### Borrows
- `POST /api/borrows/` - Borrow a book
- `POST /api/borrows/return/{id}` - Return a book
- `GET /api/borrows/me` - Get user's borrows

### Reservations
- `POST /api/reservations/` - Create reservation
- `GET /api/reservations/` - List reservations
- `DELETE /api/reservations/{id}` - Cancel reservation

### Users (Librarian/Admin only)
- `GET /api/users/` - List all users
- `POST /api/users/` - Create user

### Notifications
- `GET /api/notifications/` - Get notifications
- `GET /api/notifications/stream` - SSE stream
- `POST /api/notifications/mark-read` - Mark as read

## User Roles

1. **Student** - Can browse, borrow, return, and reserve books
2. **Librarian** - Can manage books, view all reservations, and create users
3. **Admin** - Full system access

## Default Configuration

- Backend Port: `8000`
- Frontend Port: `3000`
- Database: SQLite (`lms.db`)
- JWT Secret: Configured in `backend/app/core/config.py`

## Development

### Backend Development
```bash
# Run with auto-reload
uvicorn backend.app.main:app --reload --port 8000

# Run tests
pytest
```

### Frontend Development
```bash
cd frontend

# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Deployment

### Backend
1. Set environment variables:
   - `SECRET_KEY` - JWT secret key
   - `DATABASE_URL` - Production database URL
2. Use production ASGI server:
   ```bash
   gunicorn backend.app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Frontend
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the `dist/` folder with nginx or similar

## Features Overview

### Book Management
- Add, edit, and delete books
- Track total and available copies
- ISBN-based identification
- Search by title, author, or ISBN

### Borrowing System
- 14-day borrow period
- Automatic due date calculation
- Late fee calculation (₦100 per day)
- Borrow history tracking

### Reservation System
- Reserve unavailable books
- Automatic notifications when available
- Queue management
- Cancel reservations

### Notifications
- Real-time via Server-Sent Events
- Borrow confirmations
- Return confirmations
- Reservation availability alerts
- Overdue warnings

## Troubleshooting

### Backend Issues
- **Database errors**: Delete `lms.db` and restart
- **Port already in use**: Change port in uvicorn command
- **Import errors**: Ensure all dependencies are installed

### Frontend Issues
- **CORS errors**: Check backend CORS configuration
- **API connection failed**: Ensure backend is running on port 8000
- **SSE not working**: Check token validity and backend SSE endpoint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
