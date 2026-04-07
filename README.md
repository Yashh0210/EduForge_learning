# EduForge

EduForge is a full-stack online learning platform built for educators and students. It allows instructors to create and manage courses while enabling students to enroll, learn, and track their progress in a structured environment.

---

## Features

- Instructor dashboard to create, edit, and manage courses and lessons  
- Student portal to browse, enroll, and track course progress  
- Video player with resume functionality and progress tracking  
- Secure authentication with JWT and role-based access  
- Payment processing and purchase tracking using Stripe  
- Cloud-based media storage for course assets  

---

## Tech Stack

Frontend: React, Vite, Tailwind CSS  
Backend: Node.js, Express.js  
Database: MongoDB  
Authentication: JWT  
Payments: Stripe  
Media Storage: Cloudinary  
Deployment: Vercel (Frontend), Node Hosting Platform (Backend)

---

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/<your-username>/EduForge.git
cd EduForge
```

2. Install and run the frontend

```bash
cd client
npm install
npm run dev
```

3. Install and run the backend (in a separate terminal)

```bash
cd server
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

Backend runs on:
```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the `server/` directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:5173
```

Optional `.env` inside `client/`:

```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Use secure environment management for production deployments.

---

## Project Structure

```
client/
  src/
  public/
  package.json

server/
  controllers/
  models/
  routes/
  middlewares/
  configs/
  server.js

README.md
```

Frontend and backend are separated for independent development and deployment.

---

## Future Improvements

- Add automated testing and CI/CD pipelines  
- Improve analytics and reporting for instructors  
- Enhance accessibility and multi-language support  
- Optimize payment and webhook reliability  

---

## Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Submit a pull request  

---

## License

This project is licensed under the MIT License.

---

Built by Yash
