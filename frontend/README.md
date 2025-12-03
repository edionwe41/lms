# Library Management System - Frontend

A modern Vue.js frontend for the Library Management System, providing a clean and intuitive interface for managing books, borrows, reservations, and users.

## Features

- **Authentication**: Login and registration with role-based access control
- **Book Catalogue**: Browse, search, and manage books
- **Borrow Management**: Borrow and return books with due date tracking
- **Reservations**: Reserve unavailable books and get notified when available
- **Real-time Notifications**: Server-Sent Events (SSE) for instant updates
- **User Management**: Admin interface for managing users (librarian/admin only)
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **Vue Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and dev server

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.vue     # Navigation bar
│   │   └── Notifications.vue  # Notification dropdown
│   ├── views/             # Page components
│   │   ├── Login.vue      # Login/Register page
│   │   ├── Books.vue      # Book catalogue
│   │   ├── MyBorrows.vue  # User's borrowed books
│   │   ├── Reservations.vue  # Reservation management
│   │   └── Users.vue      # User management
│   ├── services/          # API services
│   │   └── api.js         # Axios instance & API methods
│   ├── stores/            # State management
│   │   ├── auth.js        # Authentication state
│   │   └── notifications.js  # Notification state
│   ├── router/            # Route configuration
│   │   └── index.js       # Vue Router setup
│   ├── App.vue            # Root component
│   ├── main.js            # Application entry point
│   └── style.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Configuration

### API Proxy

The Vite dev server is configured to proxy API requests to the backend:

```javascript
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

## User Roles

- **Student**: Can browse books, borrow/return, and manage reservations
- **Librarian**: Can add/edit/delete books, view all reservations, and manage users
- **Admin**: Full access to all features

## Default Test Accounts

After setting up the backend, you can register accounts with these roles:

1. Register a student account
2. Register a librarian account (requires librarian/admin to create via Users page)

## Features by Page

### Books Page
- Browse all books in the catalogue
- Search by title, author, or ISBN
- Borrow available books
- Reserve unavailable books
- Add/Edit/Delete books (librarian only)

### My Borrows Page
- View all borrowed books
- Check due dates and late fees
- Return books
- See borrowing history

### Reservations Page
- View pending reservations
- Filter by book ID
- Cancel reservations
- Paginated results

### Users Page (Librarian/Admin only)
- View all users
- Add new users
- See user roles and status

### Notifications
- Real-time notifications via SSE
- Visual notification bell with unread count
- Mark notifications as read
- Auto-updates on borrow/return events

## Troubleshooting

### CORS Issues
Make sure the backend has CORS configured to allow requests from `http://localhost:3000`.

### SSE Connection Fails
Check that:
1. Backend is running on `http://localhost:8000`
2. Token is valid and not expired
3. `/api/notifications/stream` endpoint is accessible

### 401 Unauthorized Errors
The app automatically redirects to login on 401 errors. Make sure:
1. You're logged in
2. Token hasn't expired
3. Backend authentication is working

## Development Tips

### Hot Module Replacement
Vite provides fast HMR - changes to Vue files update instantly in the browser.

### Vue DevTools
Install Vue DevTools browser extension for debugging:
- Inspect component hierarchy
- View component state
- Track events

### API Testing
You can test API endpoints directly using the browser console:
```javascript
import api from './services/api'
const books = await api.getBooks()
console.log(books)
```

## License

MIT
