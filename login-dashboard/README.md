# Login Dashboard

A modern, secure login system with a comprehensive dashboard built with React, TypeScript, and cookie-based authentication.

## Features

### 🔐 Authentication System
- **Login Page** - Secure user authentication
- **Registration** - Create new user accounts
- **Forgot Password** - Password recovery functionality
- **Forgot Username** - Username recovery functionality
- **Cookie-based Security** - Secure HTTP-only cookies for session management

### 📊 Dashboard
- **Home Page** - Welcome dashboard with user statistics and recent activity
- **Leaderboard** - User rankings with podium display and detailed table
- **Projects** - Project management with filtering, search, and progress tracking

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Beautiful Animations** - Smooth transitions and hover effects
- **Modern Styling** - Gradient backgrounds, cards, and professional layout
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

### 🛠 Technical Features
- **TypeScript** - Full type safety and better development experience
- **React Router** - Client-side routing with protected routes
- **Context API** - Global state management for authentication
- **Prettier** - Code formatting for consistent style
- **Jest Testing** - Comprehensive unit tests for components and utilities

## Demo Credentials

For testing purposes, use these credentials:
- **Username:** `demo`
- **Password:** `password`

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd login-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main dashboard layout
│   ├── Login.tsx       # Authentication forms
│   ├── ProtectedRoute.tsx # Route protection
│   └── __tests__/      # Component tests
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── Home.tsx        # Dashboard home page
│   ├── Leaderboard.tsx # User rankings page
│   └── Projects.tsx    # Project management page
├── services/           # API services
│   └── api.ts          # Mock API calls
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── utils/              # Utility functions
│   ├── auth.ts         # Authentication helpers
│   └── __tests__/      # Utility tests
└── App.tsx             # Main application component
```

## Authentication Flow

1. **Login Process:**
   - User enters credentials
   - API validates credentials (mock implementation)
   - JWT token and user data stored in secure cookies
   - User redirected to dashboard

2. **Session Management:**
   - Cookies expire after 7 days
   - Secure and HttpOnly flags for security
   - SameSite=strict for CSRF protection

3. **Route Protection:**
   - Protected routes check authentication status
   - Unauthenticated users redirected to login
   - Loading states during authentication check

## Security Features

- **Secure Cookies** - HttpOnly, Secure, and SameSite flags
- **Protected Routes** - Client-side route protection
- **Input Validation** - Form validation and sanitization
- **CSRF Protection** - SameSite cookie attribute
- **XSS Prevention** - React's built-in XSS protection

## Mock Data

The application uses mock data for demonstration:

- **Users:** Sample user profiles with rankings
- **Projects:** Various project types with different statuses
- **Leaderboard:** Ranked user scores and achievements

## Responsive Design

The application is fully responsive with breakpoints:
- **Desktop:** > 768px
- **Tablet:** 768px - 480px
- **Mobile:** < 480px

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Authentication utilities
- Component rendering
- User interactions
- Form submissions
- Error handling

## Code Quality

- **Prettier** configured for consistent formatting
- **TypeScript** for type safety
- **ESLint** for code quality (inherited from CRA)
- **Component-based architecture**
- **Separation of concerns**

## Deployment

To build for production:
```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Format code with Prettier
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Real backend API integration
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (Google, GitHub)
- [ ] Dark mode theme
- [ ] Advanced project management features
- [ ] Real-time notifications
- [ ] User profile management
- [ ] File upload functionality
- [ ] Advanced analytics dashboard
