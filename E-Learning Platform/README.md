# E-Learning Platform

A comprehensive full-stack e-learning platform built with Node.js, React, and MongoDB. This platform provides video streaming, course management, user enrollment, and administrative features.

## 🚀 Features

### Core Features

- **Video Streaming**: HLS adaptive streaming with multiple resolutions
- **Course Management**: Create, edit, and manage courses with rich content
- **User Authentication**: JWT-based authentication with role-based access
- **Enrollment System**: Request/approval workflow for course access
- **Progress Tracking**: Monitor user progress through courses
- **Comment System**: Interactive discussions on course content
- **Notification System**: Real-time notifications and email alerts
- **Admin Dashboard**: Comprehensive administrative interface

### Technical Features

- **Responsive Design**: Mobile-first responsive UI
- **Video Processing**: FFmpeg-based video transcoding
- **File Upload**: Secure file upload with validation
- **Rate Limiting**: API protection against abuse
- **Security**: Helmet, CORS, and input validation
- **Logging**: Comprehensive logging system

## 📁 Project Structure

```
E-learning/
├── backend/                 # Node.js backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── validations/        # Input validation
│   └── uploads/            # File uploads
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **FFmpeg** - Video processing
- **AWS S3** - File storage
- **Nodemailer** - Email service

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Query** - Data fetching
- **Video.js** - Video player

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- FFmpeg (for video processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-learning
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📋 Environment Variables

### Backend (.env)

```env
# Database
MONGO_URI=mongodb://localhost:27017/e-learning-platform

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET=your-s3-bucket-name

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_NODE_ENV=development
VITE_APP_NAME=E-Learning Platform
```

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev  # Start with nodemon
```

### Frontend Development

```bash
cd frontend
npm run dev  # Start Vite dev server
```

### Building for Production

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## 📚 API Documentation

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Courses

- `GET /api/courses` - Get published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/admin/courses` - Create course (admin)
- `PUT /api/admin/courses/:id` - Update course (admin)

### Videos

- `POST /api/admin/courses/:courseId/videos` - Upload video (admin)
- `GET /api/videos/:id/stream` - Stream video
- `GET /api/videos/:id` - Get video details

### Enrollments

- `POST /api/enrollments` - Request enrollment
- `GET /api/enrollments/my` - Get user enrollments
- `PUT /api/enrollments/admin/enrollments/:id/approve` - Approve enrollment (admin)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation with Joi
- Helmet security headers
- File upload validation

## 📹 Video Processing

The platform supports:

- HLS streaming for adaptive bitrate
- Multiple resolution transcoding (480p, 720p, 1080p)
- FFmpeg integration
- Progress tracking during processing

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure production database
- [ ] Set up email service
- [ ] Configure CDN for video delivery
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

### Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🐛 Troubleshooting

### Common Issues

1. **Video Processing Fails**

   - Ensure FFmpeg is installed
   - Check available disk space
   - Verify file permissions

2. **Database Connection Issues**

   - Verify MongoDB is running
   - Check connection string
   - Ensure network connectivity

3. **Email Service Errors**
   - Verify email credentials
   - Check SMTP settings
   - Ensure account is activated

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- All open-source contributors

---

**Happy Learning! 🎓**
