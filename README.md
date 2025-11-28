# TaskMate - Task Management Application

A modern, full-stack task management application built with Django REST Framework (backend) and React (frontend). TaskMate allows users to create, manage, and organize their tasks with an intuitive UI that works seamlessly on both desktop and mobile devices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Guide](#frontend-guide)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## Overview

TaskMate is a comprehensive task management system designed to help users stay organized and productive. The application provides a clean, responsive interface for managing tasks with real-time updates and intuitive controls. Users can register, log in, create tasks, edit them, mark them as complete, delete them, and filter by status—all with a beautiful red and white color theme and light/dark mode support.

---

## Features

### Core Task Management (CRUD)
- **Create Tasks**: Add new tasks with title, description, and optional deadline
- **Read Tasks**: View all tasks in a centralized dashboard
- **Update Tasks**: Edit task title, description, and status
- **Delete Tasks**: Remove tasks permanently with confirmation
- **Mark Complete**: Change task status to "completed" with one click

### Task Organization
- **Status Filtering**: Filter tasks by All, Pending, In Progress, or Completed
- **Task Grouping**: Quick-view group pills to filter by status
- **Real-time Updates**: Tasks list updates immediately after any operation
- **Task Counter**: View total number of tasks at a glance

### User Experience
- **User Greeting**: Dashboard displays "Hello, {Name}" personalized greeting
- **Light/Dark Mode**: Toggle between light (white/red) and dark (gray/black) themes
- **Responsive Design**: 
  - Desktop: Left sidebar add-form + right task list
  - Mobile: Floating "+" button that opens add-task modal
- **Optimized UI**: Hover effects, smooth transitions, and clean spacing

### Authentication
- **User Registration**: Sign up with email and password
- **User Login**: Session-based authentication with CSRF protection
- **User Logout**: Secure session termination
- **Protected Routes**: Dashboard only accessible to authenticated users

---

## Tech Stack

### Backend
- **Django 5.2.7**: Web framework
- **Django REST Framework**: REST API builder
- **django-cors-headers**: CORS support for cross-origin requests
- **SQLite3**: Default database (can be swapped for PostgreSQL)
- **Python 3.13+**: Programming language

### Frontend
- **React 19.2.0**: UI library
- **React Router DOM 6.22.0**: Client-side routing
- **Axios 1.6.0**: HTTP client with CSRF token handling
- **Tailwind CSS 3.4.14**: Utility-first CSS framework
- **React Scripts 5.0.1**: Build & development tools

---

## Project Structure

```
ws_taskmate/
├── taskmate_backend/              # Django project configuration
│   ├── settings.py                # Django settings (INSTALLED_APPS, MIDDLEWARE, etc.)
│   ├── urls.py                    # URL routing
│   ├── asgi.py                    # ASGI application
│   ├── wsgi.py                    # WSGI application
│   └── .venv/                     # Python virtual environment
│
├── taskmate-frontend/             # React frontend application
│   ├── public/                    # Static assets
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.js       # Main task management UI
│   │   │   ├── Login.js           # User login page
│   │   │   ├── Register.js        # User registration page
│   │   │   └── Welcome.js         # Landing page
│   │   ├── components/
│   │   │   ├── Navbar.js          # Navigation component
│   │   │   └── ProtectedRoute.js  # Route guard for auth
│   │   ├── contexts/
│   │   │   └── ThemeContext.js    # Light/dark mode state management
│   │   ├── api/
│   │   │   └── axios.js           # Axios instance with CSRF handling
│   │   ├── App.js                 # Main app component
│   │   ├── index.js               # React entry point
│   │   ├── index.css              # Tailwind imports
│   │   └── App.css                # App styles
│   ├── package.json               # Frontend dependencies
│   └── tailwind.config.js         # Tailwind configuration
│
├── tasks/                         # Django Tasks app
│   ├── models.py                  # Task model definition
│   ├── serializers.py             # Task serializer for API
│   ├── views.py                   # TaskViewSet (API endpoints)
│   ├── admin.py                   # Django admin configuration
│   └── migrations/                # Database migrations
│
├── users/                         # Django Users app
│   ├── models.py                  # Custom User model
│   ├── serializers.py             # User serializer
│   ├── views.py                   # UserViewSet (API endpoints)
│   ├── permissions.py             # Custom permissions
│   └── migrations/                # Database migrations
│
├── authentication/                # Django Authentication app
│   ├── views.py                   # RegisterView, LoginView, LogoutView
│   ├── serializers.py             # Authentication serializers
│   └── migrations/                # Database migrations
│
├── db.sqlite3                     # SQLite database
├── manage.py                      # Django management script
├── .env                           # Environment variables (optional)
└── README.md                      # This file
```

---

## Installation & Setup

### Prerequisites
- Python 3.13+ 
- Node.js 14+ & npm
- Git

### Backend Setup

1. **Clone the repository**:
```bash
git clone https://github.com/alana-gundaya/taskmate_ws.git
cd taskmate_ws
```

2. **Create and activate Python virtual environment**:
```bash
# From project root (ws_taskmate)
cd taskmate_backend
python -m venv .venv
cd ..
```

3. **Activate the virtual environment** (Windows PowerShell):
```powershell
.\.venv\Scripts\Activate.ps1
```

Or for macOS/Linux:
```bash
source .venv/bin/activate
```

4. **Install Python dependencies**:
```bash
pip install django djangorestframework django-cors-headers
```

5. **Create database migrations**:
```bash
python manage.py makemigrations
```

6. **Apply database migrations**:
```bash
python manage.py migrate
```

7. **Create a superuser (admin account)**:
```bash
python manage.py createsuperuser
```
Follow the prompts to create your admin account. This account is required to access the Django admin panel and manage tasks manually.

### Frontend Setup

1. **Navigate to frontend directory** (from project root):
```bash
cd taskmate-frontend
```

2. **Install Node dependencies**:
```bash
npm install
```

3. **If `npm start` fails**, update react-scripts:
```bash
npm install react-scripts@latest --save
```

4. **Configure API endpoint** (already set in `src/api/axios.js`):
```javascript
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
```

---

## Running the Application

### Step 1: Start Backend Server

From the project root (`ws_taskmate`), ensure virtual environment is activated:

```powershell
# Activate virtual environment if not already active
.\.venv\Scripts\Activate.ps1

# Start Django development server
python manage.py runserver
# Server runs on http://127.0.0.1:8000
```

### Step 2: Access Django Admin Panel (First Time Setup)

1. Open browser to `http://127.0.0.1:8000/admin/`
2. Sign in with your superuser credentials (created during setup)
3. You can manually create tasks and manage data from here

### Step 3: Start Frontend Development Server

**Open a new terminal** and from `taskmate-frontend/` directory:

```bash
cd taskmate-frontend
npm start
# Frontend runs on http://localhost:3000
# Browser will auto-open automatically
```

**If `npm start` fails:**
```bash
npm install react-scripts@latest --save
npx react-scripts start
```

Or update `package.json` scripts:
```json
"scripts": {
  "start": "npx react-scripts start",
  ...
}
```

Then run:
```bash
npm install
npm start
```

### Step 4: Access the Application

1. Open browser to `http://localhost:3000`
2. Register a new account
3. Log in with your credentials
4. Navigate to Dashboard and start managing tasks!

### Troubleshooting First-Time Login Issues

- **Can't create login/signup**: Ensure backend is running on `http://127.0.0.1:8000`
- **401 Unauthorized errors**: Check that you're using a valid registered account
- **CORS errors**: Verify Django CORS settings allow `http://localhost:3000`

---

## API Documentation

### Base URL
```
http://localhost:8000/api/
```

### Authentication Endpoints

**Register User**
```
POST /api/auth/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Login**
```
POST /api/auth/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Logout**
```
POST /api/auth/logout/
```

### Task Endpoints

**List All Tasks** (Paginated)
```
GET /api/tasks/
Authorization: Session / Token required
```

**Create Task**
```
POST /api/tasks/
Authorization: Session / Token required
Content-Type: application/json

{
  "title": "Complete project proposal",
  "description": "Draft and submit project proposal for Q1",
  "deadline": "2025-12-31",
  "status": "pending"
}
```

**Retrieve Task**
```
GET /api/tasks/{id}/
Authorization: Session / Token required
```

**Update Task**
```
PATCH /api/tasks/{id}/
Authorization: Session / Token required
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress"
}
```

**Delete Task**
```
DELETE /api/tasks/{id}/
Authorization: Session / Token required
```

### User Endpoints

**Get Current User Info**
```
GET /api/users/me/
Authorization: Session / Token required

Response:
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

**List All Users** (Admin only)
```
GET /api/users/
Authorization: Admin required
```

---

## Frontend Guide

### Dashboard (`/dashboard`)

The main application interface where users manage tasks.

**Desktop View**:
- Left sidebar: Add Task form (Title, Deadline, Description fields)
- Right panel: Task list with status filter pills (All, Pending, In Progress, Completed)
- Top right: Light/Dark mode toggle button

**Mobile View** (< 1024px):
- Floating "+" button (bottom-right): Click to open add-task modal
- Centered task list with full-width mobile optimization
- Left form hidden; modal replaces it

**Task Card UI**:
- Task title (red/white theme)
- Task description
- Status badge (color-coded: red=pending, yellow=in-progress, green=completed)
- Created timestamp
- Action buttons: Edit, Complete, Delete

**Add Task Modal** (Mobile only):
- Opens when "+" button clicked
- Form fields: Title (required), Deadline, Description
- Buttons: Create, Cancel
- Closes on successful creation or cancel

**Edit Task Inline**:
- Click "Edit" on any task card
- Fields become editable (Title, Description, Status)
- Buttons: Save, Cancel, Delete
- Changes reflected immediately on save

### Theme System

Light mode (default):
- Background: White
- Primary color: Red (#dc2626)
- Text: Dark gray/black

Dark mode:
- Background: Dark gray (#111827)
- Primary color: Red (#dc2626)
- Text: White/light gray

Toggle theme: Click "Light" / "Dark" button in header

### Authentication Flow

1. **Register** (`/register`):
   - Enter username, email, password
   - Submit → Creates account → Auto-redirect to login

2. **Login** (`/login`):
   - Enter username/email and password
   - Submit → Sets session → Redirect to dashboard

3. **Dashboard** (`/dashboard`):
   - Protected route (redirects to login if not authenticated)
   - Displays greeting with user's name

4. **Logout**:
   - Clears session
   - Redirects to welcome page

---

## Database Schema

### User Model
```python
class User(AbstractUser):
    id: int (primary key)
    username: str (unique)
    email: str (unique)
    first_name: str
    last_name: str
    password: str (hashed)
    created_at: datetime (auto_now_add)
```

### Task Model
```python
class Task(models.Model):
    id: int (primary key)
    user: ForeignKey(User, on_delete=CASCADE)
    title: str (max_length=200)
    description: str (TextField, blank=True)
    status: str (choices: 'pending', 'in_progress', 'completed')
    created_at: datetime (auto_now_add)
    
    # Meta
    ordering: ['-created_at']  # Newest first
```

---

## Authentication

### Session-Based Authentication
- Uses Django's session framework
- CSRF protection enabled
- CSRF token extracted from cookies and included in API requests
- Credentials sent with `withCredentials: true` in Axios

### CORS Configuration
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True
```

### CSRF Token Handling (Axios)
```javascript
// src/api/axios.js
const getCSRFToken = () => {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

// Add token to all requests
axiosInstance.interceptors.request.use(
  config => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => Promise.reject(error)
);
```

---

## Responsive Design

### Breakpoints (Tailwind)
- xs: 475px
- sm: 640px
- md: 768px
- lg: 1024px (switch point between desktop/mobile layouts)
- xl: 1280px
- 2xl: 1536px

### Desktop (lg and above)
- 3-column grid layout
- Left column (hidden on mobile): Add Task form
- Right columns (2 cols): Task list
- Floating "+" button: Hidden
- Full form visible for task creation

### Tablet (md to lg)
- Transitions to mobile layout
- Add form hidden
- Floating "+" button visible
- Modal-based task creation

### Mobile (< md)
- Single column, full-width
- Floating "+" button (bottom-right, circular)
- Add Task modal (max-width: 28rem)
- Centered task list
- Touch-friendly spacing and buttons

---

## Troubleshooting

### Django Backend Issues

**Error: `ModuleNotFoundError: No module named 'corsheaders'`**
```bash
pip install django-cors-headers
```

**Database errors during migration**:
```bash
python manage.py makemigrations
python manage.py migrate
```

**Port already in use (8000)**:
```bash
# Use a different port
python manage.py runserver 8001
```

**CSRF token missing in frontend requests**:
- Ensure `axios.js` has CSRF token extraction logic
- Check browser cookies for `csrftoken`
- Verify CORS and CSRF settings in Django `settings.py`

### React Frontend Issues

**Error: `npm: command not found`**
- Install Node.js from https://nodejs.org/
- Verify with `node --version` and `npm --version`

**Port 3000 already in use**:
```bash
# Kill process on port 3000 or use different port
npm start -- --port 3001
```

**Blank screen or infinite loading**:
1. Check browser console for errors (F12)
2. Verify backend is running on `http://localhost:8000`
3. Check network tab to see if API calls are successful
4. Clear browser cache and local storage

**Tasks not updating after create/edit/delete**:
- Check browser console for API errors
- Verify user is authenticated (check session in DevTools)
- Ensure backend returned response with updated task data

### Common Issues

**Login redirects to login page**:
- Clear browser cookies
- Ensure backend is running
- Check that credentials are correct

**Modal doesn't close after adding task**:
- Check browser console for errors
- Verify API call succeeded (check network tab)
- Confirm task data structure matches expected format

**Dark mode not persisting**:
- Check localStorage in DevTools (Application tab)
- Verify `ThemeContext.js` is properly saving state to localStorage

---

## Future Enhancements

### Planned Features
- [ ] Task priority levels (Low, Medium, High)
- [ ] Task due date persistence in backend
- [ ] Task categories/projects
- [ ] Task subtasks/checklist
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Task sharing and collaboration
- [ ] Task comments/notes
- [ ] File attachments for tasks
- [ ] Advanced filtering and search

### Performance Improvements
- [ ] Implement pagination for large task lists
- [ ] Add task caching with Redux or Context API
- [ ] Optimize bundle size with code-splitting
- [ ] Implement service workers for offline support
- [ ] Add image optimization for avatars

### UI/UX Enhancements
- [ ] Add task drag-and-drop between status columns
- [ ] Kanban board view
- [ ] Calendar view for tasks
- [ ] Custom task labels and tags
- [ ] Toast notifications for success/error messages
- [ ] Animated transitions and loading states
- [ ] Keyboard shortcuts for power users
- [ ] Voice task creation

### Backend Improvements
- [ ] Add user profile customization
- [ ] Implement task history/audit log
- [ ] Add email notifications
- [ ] Task templates
- [ ] Advanced permissions and role-based access
- [ ] Task analytics and reporting
- [ ] API rate limiting
- [ ] Comprehensive error handling

### DevOps
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing (unit + integration)
- [ ] Production deployment configuration
- [ ] Environment-specific settings

---

## Contributing

To contribute to TaskMate:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open-source and available under the MIT License.

---

## Support

For issues, questions, or suggestions, please:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

---

## Author

**Alana Gundaya**
- GitHub: [alana-gundaya](https://github.com/alana-gundaya)
- Email: alana@gmail.com

---

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ User authentication (register, login, logout)
- ✅ Full CRUD operations for tasks
- ✅ Task filtering by status (All, Pending, In Progress, Completed)
- ✅ Light/dark mode theme switching
- ✅ Responsive design (desktop & mobile)
- ✅ Floating "+" button for mobile add-task flow
- ✅ Modal-based task creation on mobile
- ✅ Edit tasks inline
- ✅ Mark tasks as complete
- ✅ Delete tasks with confirmation
- ✅ User personalization (greeting with name)
- ✅ Session-based authentication with CSRF protection
- ✅ REST API with DRF
- ✅ Real-time UI updates

---

**Last Updated**: November 29, 2025
