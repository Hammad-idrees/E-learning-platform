# E-Learning Platform

A comprehensive full-stack e-learning platform built with Node.js, React, and MongoDB. This platform provides video streaming, course management, user enrollment, and administrative features.

## 🚀 Features

### Core Features

- **Video Streaming**: HLS adaptive streaming with multiple resolutions
- **Course Management**: Create, edit, and manage courses with rich content
- **User Authentication**: JWT-based authentication with role-based access
- **Enrollment System**: Request/approval workflow for course access
- **Uploading Banners**: Custom Banners for students on their panel
- **Notification System**: Real-time notifications and email alerts
- **Admin Dashboard**: Comprehensive administrative interface
- **Table of content**: TOC for each course 
- **Analytics**: Live Analytics of the System

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

## Screenshots

Student Panel:
<img width="1889" height="916" alt="image" src="https://github.com/user-attachments/assets/1736a9b1-ccb5-4caa-a282-2d33f97f1ef2" />
<img width="1919" height="937" alt="Screenshot 2025-09-02 025041" src="https://github.com/user-attachments/assets/6b62ea88-4e01-4edb-8123-45081707c3ae" />
<img width="1917" height="925" alt="Screenshot 2025-09-02 025100" src="https://github.com/user-attachments/assets/be0849e2-49ed-4b1f-9936-c665139e3302" />
<img width="1919" height="923" alt="Screenshot 2025-09-02 025116" src="https://github.com/user-attachments/assets/8be63bf4-1172-4343-ad4d-cf0856bc8327" />
<img width="1916" height="918" alt="Screenshot 2025-09-02 025316" src="https://github.com/user-attachments/assets/31dce55d-d492-4bd1-8c74-f1f79c75a777" />
<img width="1911" height="918" alt="Screenshot 2025-09-02 025342" src="https://github.com/user-attachments/assets/ac7c864d-fc2a-4566-85b5-3c22e13679d1" />
<img width="1910" height="916" alt="Screenshot 2025-09-02 025521" src="https://github.com/user-attachments/assets/dd40e75e-1988-4b2f-b7d1-bc5f18a54a97" />
Admin Panel:
<img width="1916" height="873" alt="Screenshot 2025-09-02 025656" src="https://github.com/user-attachments/assets/c781ff71-4813-4ea6-901b-2594bf1c8940" />
<img width="1910" height="871" alt="Screenshot 2025-09-02 025713" src="https://github.com/user-attachments/assets/cced4e26-49f6-4917-96bc-92a7ce286ee9" />
<img width="1910" height="871" alt="Screenshot 2025-09-02 025725" src="https://github.com/user-attachments/assets/78923b84-478b-410f-b3c4-f92815f180c8" />
<img width="1919" height="866" alt="Screenshot 2025-09-02 025818" src="https://github.com/user-attachments/assets/3b8e0cde-6891-41d0-a72e-dc16d76e9c3f" />
<img width="1919" height="876" alt="Screenshot 2025-09-02 025833" src="https://github.com/user-attachments/assets/9c3187d2-aac9-454d-86a1-c7701a22e8d8" />




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

  ----------------------------------------------------------
  -------------------------------------------

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
- Single resolution transcoding (720p)
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

**Happy Learning! 🎓**
