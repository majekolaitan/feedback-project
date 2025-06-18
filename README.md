## Feedback Project

A simple “Feedback Board” application where users can anonymously post feedback, and an admin can log in to moderate the posts.

## Project Structure

```
feedback-project/
├── backend/
│   ├── feedback_project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── feedback/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── admin/
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── FeedbackCard.tsx
    │   ├── FeedbackForm.tsx
    │   ├── LoginForm.tsx
    │   └── Navigation.tsx
    ├── contexts/
    │   └── AuthContext.tsx
    ├── lib/
    │   └── api.ts
    ├── types/
    │   └── index.ts
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── tsconfig.json
```

## Backend Setup (Django)

### 1. Create Virtual Environment and Install Dependencies

```bash
# Create backend directory
mkdir feedback-project && cd feedback-project
mkdir backend && cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Create Django Project and App

```bash
# Create Django project
django-admin startproject feedback_project .

# Create feedback app
python manage.py startapp feedback
```

### 3. Apply Migrations and Create Superuser

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (admin user)
python manage.py createsuperuser
```

When creating the superuser, remember the username and password as you'll need them to log into the admin panel.

### 4. Run Django Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## Frontend Setup (Next.js)

### 1. Create Next.js Project

```bash
# Navigate to project root
cd .. # Go back to feedback-project root
mkdir frontend && cd frontend

# Initialize Next.js project
npm init -y
npm install next@15.0.0 react@^18.0.0 react-dom@^18.0.0 axios@^1.6.0
npm install -D @types/node@^20.0.0 @types/react@^18.0.0 @types/react-dom@^18.0.0 autoprefixer@^10.0.0 eslint@^8.0.0 eslint-config-next@15.0.0 postcss@^8.0.0 tailwindcss@^3.3.0 typescript@^5.0.0
```

### 2. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

### 3. Create Directory Structure

```bash
mkdir -p app/admin app/login components contexts lib types
```

### 4. Add Scripts to package.json

Make sure your `package.json` has the correct scripts section as shown in the package.json artifact.

### 5. Run Next.js Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Public Endpoints

- `GET /api/feedback/` - List public (reviewed) feedback
- `POST /api/feedback/` - Submit new feedback
- `GET /api/csrf/` - Get CSRF token

### Authentication Endpoints

- `POST /api/login/` - Admin login
- `POST /api/logout/` - Admin logout
- `GET /api/auth/check/` - Check authentication status

### Admin Endpoints (require authentication)

- `GET /api/admin/feedback/` - List all feedback
- `PATCH /api/admin/feedback/<id>/` - Update feedback status

## Key Features

### Security & Best Practices

- **CORS Configuration**: Properly configured for frontend-backend communication
- **CSRF Protection**: Implements CSRF tokens for state-changing operations
- **Session Management**: Uses Django sessions with secure cookie settings
- **Authentication**: Admin-only access to moderation features
- **Input Validation**: Server-side validation for all inputs

### Frontend Features

- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Authentication Context**: Centralized auth state management
- **Error Handling**: Proper error states and user feedback
- **Loading States**: Loading indicators for better UX

### Backend Features

- **RESTful API**: Clean, RESTful endpoint design
- **Admin Interface**: Django admin panel for advanced management
- **Pagination**: Built-in pagination for large datasets
- **Model Relationships**: Proper database schema with timestamps

## Usage

### For Users (Public)

1. Visit `http://localhost:3000`
2. Fill out the feedback form with title and content
3. Submit feedback (it will be pending review)
4. View approved feedback on the main page

### For Administrators

1. Create a superuser account using Django management command
2. Visit `http://localhost:3000/login`
3. Log in with your admin credentials
4. Access the admin panel at `http://localhost:3000/admin`
5. Review and approve/reject feedback submissions
6. View statistics and manage all feedback

### Django Admin Panel

- Access at `http://localhost:8000/admin/`
- More advanced management features
- Bulk operations on feedback

## Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Production Considerations

### Backend

- Set `DEBUG = False`
- Configure proper database (PostgreSQL, MySQL)
- Set `ALLOWED_HOSTS` appropriately
- Enable HTTPS and set secure cookie flags
- Use environment variables for sensitive settings
- Configure proper static file serving

### Frontend

- Build for production: `npm run build`
- Configure environment variables for production API URL
- Set up proper hosting (Vercel, Netlify, etc.)
- Enable HTTPS

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Django CORS settings match your frontend URL
2. **CSRF Errors**: Make sure CSRF tokens are properly included in requests
3. **Authentication Issues**: Verify session cookies are being sent with requests
4. **API Connection**: Check that both servers are running on correct ports

### Development Tips

1. **API Testing**: Use tools like Postman or curl to test API endpoints
2. **Database Inspection**: Use `python manage.py shell` to inspect data
3. **Logs**: Check browser console and Django server logs for errors
4. **Admin Panel**: Use Django admin for quick data management
