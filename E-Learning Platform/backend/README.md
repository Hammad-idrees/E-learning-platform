# E-Learning Platform Backend

A comprehensive Node.js backend for an e-learning platform with video streaming, user management, and course administration.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth with role-based access
- **Course Management**: CRUD operations for courses with video content
- **Video Processing**: HLS streaming with multi-resolution support
- **Enrollment System**: Request/approval workflow for course access
- **Notification System**: Real-time notifications and email alerts
- **Progress Tracking**: User progress monitoring
- **Comment System**: Course discussions and feedback
- **Admin Dashboard**: Comprehensive admin controls

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- FFmpeg (for video processing)
- Brevo/Sendinblue account (for emails)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/e-learning-platform
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3000
   
   # Admin Configuration
   SEED_ADMIN=true
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123456
   
   # Email Configuration (Brevo/Sendinblue)
   BREVO_SMTP_HOST=smtp-relay.brevo.com
   BREVO_SMTP_PORT=587
   BREVO_SMTP_USER=your-brevo-username
   BREVO_SMTP_KEY=your-brevo-api-key
   NOTIFICATION_EMAIL_FROM=noreply@yourdomain.com
   EMAIL_FROM_NAME=E-Learning Platform
   
   # AWS S3 Configuration (Optional - for production)
   AWS_ACCESS_KEY=your-aws-access-key
   AWS_SECRET_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   S3_BUCKET=your-s3-bucket-name
   STORAGE_TYPE=local
   
   # App URLs
   APP_URL=http://localhost:3000
   ADMIN_URL=http://localhost:3000/admin
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
│   └── admin/       # Admin-specific controllers
├── middleware/       # Custom middleware
├── models/          # MongoDB schemas
├── routes/          # API routes
│   └── admin/       # Admin routes
├── services/        # Business logic
├── utils/           # Utility functions
├── validations/     # Input validation schemas
├── uploads/         # File uploads (videos, thumbnails)
└── logs/            # Application logs
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Users
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update profile
- `PUT /api/users/change-password` - Change password

### Courses (Public)
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/videos` - Get course videos
- `POST /api/courses/:id/comments` - Add comment
- `GET /api/courses/:id/comments` - Get comments

### Admin Courses
- `POST /api/admin/courses` - Create course
- `GET /api/admin/courses` - Get all courses
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `PUT /api/admin/courses/:id/toc` - Update table of contents
- `POST /api/admin/courses/:id/publish` - Publish course

### Videos
- `POST /api/admin/courses/:courseId/videos` - Upload video
- `GET /api/videos/:id/stream` - Stream video
- `GET /api/videos/:id` - Get video details
- `DELETE /api/videos/:id` - Delete video

### Enrollments
- `POST /api/enrollments` - Request enrollment
- `GET /api/enrollments/my` - Get user enrollments
- `GET /api/enrollments/status/:courseId` - Check enrollment status
- `GET /api/enrollments/admin/enrollments` - Get pending enrollments (admin)
- `PUT /api/enrollments/admin/enrollments/:id/approve` - Approve enrollment
- `PUT /api/enrollments/admin/enrollments/:id/reject` - Reject enrollment

### Notifications
- `GET /api/v1/notifications` - Get user notifications
- `PATCH /api/v1/notifications/:id/read` - Mark as read
- `DELETE /api/v1/notifications/:id` - Delete notification

### Admin Users
- `GET /api/admin/users` - Get all users
- `GET /api/admin/courses/:courseId/users` - Get users by course
- `DELETE /api/admin/users/:id` - Delete user

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with 12 salt rounds
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured CORS for frontend integration
- **Input Validation**: Joi schemas for all inputs
- **Helmet**: Security headers
- **File Upload Security**: File type and size validation

## 📹 Video Processing

The platform supports:
- **HLS Streaming**: HTTP Live Streaming for adaptive bitrate
- **Multi-resolution**: 480p, 720p, 1080p transcoding
- **FFmpeg Integration**: Professional video processing
- **Progress Tracking**: Real-time processing status

## 📧 Email System

- **Brevo/Sendinblue Integration**: Reliable email delivery
- **Template System**: Pre-built email templates
- **Rate Limiting**: Prevents email abuse
- **Background Processing**: Non-blocking email sending

## 🐛 Troubleshooting

### Common Issues

1. **Email Service Errors**
   - Ensure Brevo credentials are correct
   - Check if account is activated
   - Verify SMTP settings

2. **Video Processing Failures**
   - Ensure FFmpeg is installed
   - Check available disk space
   - Verify file permissions

3. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string
   - Ensure network connectivity

4. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper token format

### Logs

Application logs are stored in:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

## 🚀 Production Deployment

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use strong JWT_SECRET
   - Configure production database
   - Set up email service

2. **Security**
   - Enable HTTPS
   - Configure proper CORS origins
   - Set up rate limiting
   - Use environment variables for secrets

3. **Performance**
   - Enable database indexing
   - Configure CDN for video delivery
   - Set up monitoring and logging
   - Use PM2 for process management

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.
