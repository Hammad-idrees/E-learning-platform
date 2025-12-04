- **Course Management**: Create, edit, and manage courses with rich content
- **User Authentication**: JWT-based authentication with role-based access
- **Enrollment System**: Request/approval workflow for course access
- **Progress Tracking**: Monitor user progress through courses
- **Comment System**: Interactive discussions on course content
- **Uploading Banners**: Custom Banners for students on their panel
- **Notification System**: Real-time notifications and email alerts
- **Admin Dashboard**: Comprehensive administrative interface
- **Table of content**: TOC for each course 
- **Analytics**: Live Analytics of the System

### Technical Features

@@ -73,6 +74,26 @@ E-learning/
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
@@ -114,46 +135,6 @@ E-learning/
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
@@ -209,6 +190,9 @@ npm run build
- `GET /api/enrollments/my` - Get user enrollments
- `PUT /api/enrollments/admin/enrollments/:id/approve` - Approve enrollment (admin)

  ----------------------------------------------------------
  -------------------------------------------

## 🔒 Security Features

- JWT-based authentication
@@ -224,7 +208,7 @@ npm run build
The platform supports:

- HLS streaming for adaptive bitrate
- Multiple resolution transcoding (480p, 720p, 1080p)
- Single resolution transcoding (720p)
- FFmpeg integration
- Progress tracking during processing

@@ -240,13 +224,6 @@ The platform supports:
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

### Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🐛 Troubleshooting

### Common Issues
@@ -272,28 +249,4 @@ docker-compose up -d

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
