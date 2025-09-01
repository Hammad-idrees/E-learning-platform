# E-Learning Platform Frontend

A modern React-based frontend for an e-learning platform with video streaming, course management, and user administration.

## 🚀 Features

- **Modern UI/UX**: Built with React 19, Tailwind CSS, and Framer Motion
- **Video Streaming**: HLS video player with adaptive streaming
- **Responsive Design**: Mobile-first responsive design
- **User Authentication**: Secure login/signup with JWT
- **Course Management**: Browse, enroll, and track course progress
- **Admin Dashboard**: Comprehensive admin interface
- **Real-time Notifications**: Toast notifications and alerts
- **Interactive Components**: Rich text editor, charts, and animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_NODE_ENV=development
   VITE_APP_NAME=E-Learning Platform
   VITE_APP_VERSION=1.0.0
   VITE_ENABLE_ANALYTICS=false
   VITE_ENABLE_DEBUG=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── admin/        # Admin-specific components
│   │   └── user/         # User-specific components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   └── user/         # User pages
│   ├── services/         # API service functions
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── routes/           # Route configurations
│   └── providers/        # Context providers
├── public/               # Static assets
└── assets/               # Images and other assets
```

## 🎨 Tech Stack

- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Query**: Data fetching and caching
- **Chart.js**: Data visualization
- **Video.js**: Video player
- **HLS.js**: HLS video streaming

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features

### User Features

- Course browsing and search
- Video streaming with progress tracking
- Enrollment requests
- Profile management
- Comment system
- Progress tracking

### Admin Features

- Course creation and management
- Video upload and processing
- User management
- Enrollment approval
- Dashboard analytics
- Banner management

## 🔒 Security

- JWT token-based authentication
- Protected routes
- Role-based access control
- Input validation
- XSS protection

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Production Build

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the build**

   ```bash
   npm run preview
   ```

3. **Deploy**
   - Upload the `dist` folder to your web server
   - Configure your web server to serve the SPA
   - Set up environment variables for production

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**

   - Ensure backend is running
   - Check API base URL in environment variables
   - Verify CORS configuration

2. **Video Streaming Issues**

   - Check if HLS.js is properly loaded
   - Verify video file formats
   - Ensure proper MIME types

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify all dependencies are installed

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
