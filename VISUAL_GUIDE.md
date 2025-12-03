# Visual Guide - Library Management System

## 🎨 Page Layouts and Features

### 1. Login/Register Page
**URL**: `http://localhost:3000/login`

**Layout**:
```
┌─────────────────────────────────────┐
│  Library Management System          │
│                                     │
│  [Login] [Register]  ← Tabs        │
│                                     │
│  Username: [________________]       │
│  Password: [________________]       │
│                                     │
│  [       Login Button       ]       │
│                                     │
└─────────────────────────────────────┘
```

**Features**:
- Toggle between Login and Register
- Form validation
- Error messages display
- Auto-redirect after registration
- Gradient purple background

---

### 2. Books Page (Home)
**URL**: `http://localhost:3000/`

**Navbar**:
```
┌────────────────────────────────────────────────────────┐
│ 📚 Library MS  Books  My Borrows  Reservations  Users │ John Doe [STUDENT] [Logout] 🔔3 │
└────────────────────────────────────────────────────────┘
```

**Page Layout**:
```
Book Catalogue                        [+ Add Book]

[Search: ___________________________]

┌──────────┐  ┌──────────┐  ┌──────────┐
│ The      │  │ To Kill  │  │ 1984     │
│ Great    │  │ a Mock-  │  │          │
│ Gatsby   │  │ ingbird  │  │ George   │
│          │  │          │  │ Orwell   │
│ by F.    │  │ by Harper│  │          │
│ Scott    │  │ Lee      │  │ ISBN:... │
│ Fitzgerald│  │          │  │          │
│          │  │ ISBN:... │  │ [3/4]    │
│ ISBN:... │  │          │  │ Available│
│          │  │ [2/3]    │  │          │
│ [5/5]    │  │ Available│  │ [Borrow] │
│ Available│  │          │  │ [Edit]   │
│          │  │ [Borrow] │  │ [Delete] │
│ [Borrow] │  │ [Edit]   │  │          │
│ [Edit]   │  │ [Delete] │  └──────────┘
│ [Delete] │  │          │
└──────────┘  └──────────┘
```

**Student View**:
- Book grid with 3 columns
- Search bar at top
- [Borrow] button for available books
- [Reserve] button for unavailable books
- No Edit/Delete buttons

**Librarian View**:
- Same as student +
- [+ Add Book] button in header
- [Edit] and [Delete] buttons on each card
- Can manage all books

---

### 3. My Borrows Page
**URL**: `http://localhost:3000/my-borrows`

**Layout**:
```
My Borrowed Books

┌───────────────────────────────────────────────────────────┐
│ Book ID │ Borrowed At  │ Due Date    │ Status  │ Fee │ Action │
├───────────────────────────────────────────────────────────┤
│ 1       │ Nov 20, 2025 │ Dec 4, 2025 │ Active  │ ₦0  │ [Return]│
│ 2       │ Nov 25, 2025 │ Dec 9, 2025 │ Active  │ ₦0  │ [Return]│
│ 3       │ Nov 15, 2025 │ Nov 29, 2025│ Overdue │ ₦400│ [Return]│
│ 5       │ Nov 10, 2025 │ Nov 24, 2025│ Returned│ ₦0  │ Returned│
└───────────────────────────────────────────────────────────┘
```

**Features**:
- Table view of all borrows
- Status badges (Active/Overdue/Returned)
- Late fee calculation
- Return button for active borrows
- Date formatting
- Empty state with link to browse books

---

### 4. Reservations Page
**URL**: `http://localhost:3000/reservations`

**Layout**:
```
Book Reservations

┌─────────────────────────────┐
│ Filter by Book ID: [___]    │
│ Page Size: [50 ▼]  [Apply] │
└─────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ ID │ User          │ Book ID │ Reserved At │ Status  │ Actions │
├──────────────────────────────────────────────────────┤
│ 1  │ johndoe       │ 3       │ Dec 1, 10AM │ Pending │ [Cancel]│
│    │ John Doe      │         │             │         │         │
│ 2  │ janedoe       │ 3       │ Dec 1, 11AM │ Notified│ [Cancel]│
│    │ Jane Doe      │         │             │         │         │
└──────────────────────────────────────────────────────┘

[Previous]  Page 1 (2 total)  [Next]
```

**Features**:
- Filterable by book ID
- Adjustable page size
- Pagination controls
- User details (username + full name)
- Status badges (Pending/Notified)
- Cancel reservation button
- Shows oldest reservations first

---

### 5. Users Page (Admin/Librarian Only)
**URL**: `http://localhost:3000/users`

**Layout**:
```
User Management                    [+ Add User]

┌──────────────────────────────────────────────────┐
│ ID │ Username   │ Full Name    │ Role      │ Status │
├──────────────────────────────────────────────────┤
│ 1  │ admin      │ Admin User   │ ADMIN     │ Active │
│ 2  │ librarian1 │ Jane Smith   │ LIBRARIAN │ Active │
│ 3  │ student1   │ John Doe     │ STUDENT   │ Active │
│ 4  │ student2   │ Mary Johnson │ STUDENT   │ Active │
└──────────────────────────────────────────────────┘
```

**Features**:
- Table view of all users
- Role badges (color-coded)
- Status indicators
- Add user button
- Modal for creating new users
- Only accessible to librarians/admins

---

### 6. Notifications Dropdown

**Closed State**:
```
🔔 3  ← Bell icon with red badge showing unread count
```

**Open State**:
```
┌─────────────────────────────┐
│ Notifications     3 unread  │
├─────────────────────────────┤
│ 📚 You borrowed a book      │
│    (ID: 5)                  │
│    Just now                 │
├─────────────────────────────┤
│ ✅ Book returned            │
│    (Borrow ID: 3)           │
│    5m ago                   │
├─────────────────────────────┤
│ 🔔 Your reserved book is    │
│    now available!           │
│    1h ago                   │
└─────────────────────────────┘
```

**Features**:
- Real-time updates via SSE
- Unread count badge
- Notification icons by type
- Time-ago formatting
- Click to mark as read
- Blue background for unread
- Auto-updates without refresh

---

### 7. Modals

**Add/Edit Book Modal**:
```
┌────────────────────────────────┐
│ Add New Book              [X]  │
├────────────────────────────────┤
│ Title *                        │
│ [________________________]     │
│                                │
│ Author *                       │
│ [________________________]     │
│                                │
│ ISBN *                         │
│ [________________________]     │
│                                │
│ Total Copies *                 │
│ [________________________]     │
│                                │
│ Description                    │
│ [________________________]     │
│ [________________________]     │
│                                │
│ [Save] [Cancel]                │
└────────────────────────────────┘
```

**Add User Modal**:
```
┌────────────────────────────────┐
│ Add New User              [X]  │
├────────────────────────────────┤
│ Username *                     │
│ [________________________]     │
│                                │
│ Full Name *                    │
│ [________________________]     │
│                                │
│ Password *                     │
│ [________________________]     │
│                                │
│ Role *                         │
│ [Student ▼]                    │
│                                │
│ [Create User] [Cancel]         │
└────────────────────────────────┘
```

---

## 🎨 Color Scheme

```
Primary Blue:    #4a90e2  (Buttons, links, badges)
Primary Dark:    #357abd  (Hover states)
Success Green:   #50c878  (Available, success)
Danger Red:      #e74c3c  (Delete, overdue)
Warning Orange:  #f39c12  (Warning badges)
Text Dark:       #2c3e50  (Main text)
Text Light:      #7f8c8d  (Secondary text)
Background:      #f8f9fa  (Page background)
Border:          #dee2e6  (Borders, dividers)
```

---

## 📱 Responsive Design

**Desktop (>768px)**:
- 3-column book grid
- Full navbar with all links
- Side-by-side form layouts

**Mobile (<768px)**:
- 1-column book grid
- Stacked navbar items
- Full-width forms
- Touch-friendly buttons

---

## ⌨️ Keyboard Shortcuts

- `Enter` in search → Search books
- `Enter` in forms → Submit
- `Esc` in modals → Close modal
- `Tab` → Navigate form fields

---

## 🔔 Notification Types

| Type | Icon | Trigger |
|------|------|---------|
| Borrowed | 📚 | User borrows a book |
| Returned | ✅ | User returns a book |
| Reservation Ready | 🔔 | Reserved book available |
| Overdue | ⚠️ | Book past due date |

---

## 🎯 User Experience Flow

**First Time User**:
1. See login page
2. Click "Register" tab
3. Fill in details
4. Auto-login and redirect to books
5. See empty "My Borrows"
6. Browse books and borrow one
7. Get notification
8. Check "My Borrows" to see borrowed book

**Librarian Adding Book**:
1. Login with librarian account
2. See "Users" link in navbar
3. Click "+ Add Book" on books page
4. Fill modal form
5. Click "Save"
6. See new book in grid
7. Edit or delete as needed

**Student Workflow**:
1. Login
2. Search for book
3. Click "Borrow"
4. Get confirmation notification
5. Go to "My Borrows"
6. See book with due date
7. Return when done
8. Get return confirmation

---

This visual guide shows exactly what users will see and how the interface is organized!
