# 🏥 AI-Powered Doctor CRM Dashboard

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-5.0%2B-green.svg)

A comprehensive, full-stack healthcare management system built with React, Node.js, Express, and MongoDB. Streamline your clinic operations with patient management, appointment scheduling, and digital prescriptions.

[Live Demo](https://your-app.vercel.app) · [Report Bug](https://github.com/kishanpatel486630/doctor-crm-dashboard/issues) · [Request Feature](https://github.com/kishanpatel486630/doctor-crm-dashboard/issues)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### 👨‍⚕️ **Patient Management**

- Complete patient records with medical history
- Search and filter patients
- Track allergies, medications, and past surgeries
- Emergency contact management
- Document upload and storage

### 📅 **Appointment Scheduling**

- Intuitive appointment booking system
- Calendar view for appointments
- Multiple appointment types (consultation, follow-up, emergency)
- Appointment status tracking
- Doctor assignment and scheduling

### 💊 **Digital Prescriptions**

- Create and manage digital prescriptions
- Medication dosage and frequency tracking
- Lab test recommendations
- Follow-up date scheduling
- Prescription history per patient

### 👥 **Staff Management**

- Role-based access control (Admin, Doctor, Staff)
- Staff member profiles
- Department and position management
- Secure authentication system

### 📊 **Leads & Analytics**

- Lead tracking and conversion
- Patient source tracking
- Status management workflow
- Follow-up reminders

### 🛍️ **Services & Products**

- Catalog of clinic services
- Product inventory management
- Pricing and availability tracking

### 🔐 **Security & Authentication**

- Session-based authentication
- Password encryption with bcrypt
- Role-based access control
- Secure API endpoints

### 📤 **File Management**

- Upload patient documents
- Store medical reports
- Support for images and PDFs
- Cloud storage ready (Cloudinary, AWS S3)

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Radix UI** - Headless UI Components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data Visualization

### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Express Session** - Session Management
- **Bcrypt.js** - Password Hashing
- **Multer** - File Upload
- **CORS** - Cross-Origin Resource Sharing

### DevOps & Deployment

- **Vercel** - Hosting Platform
- **MongoDB Atlas** - Cloud Database
- **Git** - Version Control
- **npm** - Package Manager

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v5.0 or higher) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/kishanpatel486630/doctor-crm-dashboard.git
cd doctor-crm-dashboard
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Set Up Environment Variables

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend `server/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/doctor-crm
SESSION_SECRET=your-super-secret-key-change-this-in-production
CLIENT_URL=http://localhost:3000
```

### 5. Start MongoDB

**Windows:**

```powershell
net start MongoDB
```

**macOS/Linux:**

```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas** - See [MONGODB_SETUP.md](MONGODB_SETUP.md)

### 6. Create Admin User

```bash
cd server
npm run create-admin
```

**Default credentials:**

- Username: `admin`
- Password: `admin123`
- Email: `admin@doctorcrm.com`

### 7. Start the Application

#### Option A: One-Click Start (Windows)

```powershell
.\start.ps1
```

#### Option B: Manual Start

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

### 8. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

---

## ⚙️ Configuration

### Environment Variables

| Variable         | Description               | Default                              | Required |
| ---------------- | ------------------------- | ------------------------------------ | -------- |
| `PORT`           | Backend server port       | 5000                                 | No       |
| `NODE_ENV`       | Environment mode          | development                          | No       |
| `MONGODB_URI`    | MongoDB connection string | mongodb://localhost:27017/doctor-crm | Yes      |
| `SESSION_SECRET` | Secret key for sessions   | -                                    | Yes      |
| `CLIENT_URL`     | Frontend URL              | http://localhost:3000                | Yes      |
| `VITE_API_URL`   | Backend API URL           | http://localhost:5000/api            | Yes      |

### MongoDB Collections

The application creates the following collections:

- `users` - User accounts and authentication
- `patients` - Patient records and medical history
- `appointments` - Appointment scheduling
- `staffs` - Staff member information
- `leads` - Lead tracking
- `prescriptions` - Digital prescriptions
- `serviceproducts` - Services and products catalog
- `sessions` - Session storage

---

## 📚 API Documentation

### Authentication Endpoints

```http
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # Login user
POST   /api/auth/logout       # Logout user
GET    /api/auth/me           # Get current user
```

### Patient Endpoints

```http
GET    /api/patients          # Get all patients
GET    /api/patients/:id      # Get patient by ID
GET    /api/patients/search   # Search patients
POST   /api/patients          # Create new patient
PUT    /api/patients/:id      # Update patient
DELETE /api/patients/:id      # Delete patient
```

### Appointment Endpoints

```http
GET    /api/appointments           # Get all appointments
GET    /api/appointments/:id       # Get appointment by ID
GET    /api/appointments/date      # Get appointments by date
POST   /api/appointments           # Create appointment
PUT    /api/appointments/:id       # Update appointment
DELETE /api/appointments/:id       # Delete appointment
```

### Other Endpoints

- **Staff Management**: `/api/staff`
- **Leads**: `/api/leads`
- **Prescriptions**: `/api/prescriptions`
- **Services/Products**: `/api/services-products`
- **File Upload**: `/api/upload`

**Full API documentation:** [server/README.md](server/README.md)

---

## 🌐 Deployment

### Deploy to Vercel

1. **Set up MongoDB Atlas** (Required for production)

   ```bash
   # Create account at https://mongodb.com/cloud/atlas
   # Create cluster and get connection string
   ```

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy on Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

4. **Environment Variables for Production**
   ```env
   MONGODB_URI=mongodb+srv://...
   SESSION_SECRET=your-production-secret
   NODE_ENV=production
   CLIENT_URL=https://your-app.vercel.app
   VITE_API_URL=https://your-app.vercel.app/api
   ```

**Detailed deployment guide:** [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

**Quick checklist:** [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 📁 Project Structure

```
doctor-crm-dashboard/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── Dashboard.tsx
│   │   ├── PatientManagement.tsx
│   │   ├── AppointmentManagement.tsx
│   │   └── ...
│   ├── utils/
│   │   └── api.ts               # API service layer
│   ├── styles/                  # Global styles
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
│
├── server/                      # Backend source code
│   ├── models/                  # MongoDB schemas
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Appointment.js
│   │   └── ...
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   └── ...
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── patientRoutes.js
│   │   └── ...
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js             # Authentication
│   │   └── upload.js           # File upload
│   ├── config/                  # Configuration
│   │   └── database.js         # DB connection
│   ├── uploads/                 # File storage
│   ├── server.js               # Entry point
│   └── createAdmin.js          # Admin creation script
│
├── public/                      # Static files
├── docs/                        # Documentation
│   ├── SETUP_GUIDE.md
│   ├── INTEGRATION_TIPS.md
│   ├── VERCEL_DEPLOYMENT.md
│   └── ...
├── vercel.json                 # Vercel configuration
├── package.json                # Frontend dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # This file
```

---

## 🔌 API Usage Example

```typescript
import api from "./utils/api";

// Login
const response = await api.login({
  username: "admin",
  password: "admin123",
});

// Get all patients
const patients = await api.getPatients();

// Create appointment
const appointment = await api.createAppointment({
  patient: patientId,
  doctor: doctorId,
  appointmentDate: new Date(),
  appointmentTime: "10:00 AM",
  type: "consultation",
  reason: "Regular checkup",
});

// Upload file
const result = await api.uploadFile(file);
```

**More examples:** [INTEGRATION_TIPS.md](INTEGRATION_TIPS.md)

---

## 🧪 Testing

```bash
# Run tests (when available)
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

---

## 🐛 Troubleshooting

### MongoDB not running?

```powershell
net start MongoDB
```

### Port already in use?

Change the PORT in `server/.env` to another port like 5001

### Connection refused?

Make sure both frontend and backend are running

### File uploads not working on Vercel?

Use cloud storage (Cloudinary/AWS S3). See [CLOUD_STORAGE.md](CLOUD_STORAGE.md)

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting PR

---

## 🐛 Known Issues & Roadmap

### Known Issues

- File uploads on Vercel serverless are temporary (use cloud storage for production)
- Session persistence requires MongoDB connection

### Roadmap

- [ ] Email notifications for appointments
- [ ] SMS reminders via Twilio
- [ ] WhatsApp integration
- [ ] Payment processing
- [ ] Insurance management
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Telemedicine integration
- [ ] Analytics dashboard
- [ ] Export reports (PDF, Excel)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👥 Authors

**Kishan Patel**

- GitHub: [@kishanpatel486630](https://github.com/kishanpatel486630)

---

## 🙏 Acknowledgments

- [Figma Design](https://www.figma.com/design/bSNS9lQ9RPuPIUR185XWL8/AI-Powered-Doctor-CRM-Dashboard--Community-) - Original design inspiration
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - Database platform
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📞 Support

For support, email kishanpatel486630@gmail.com or open an issue on GitHub.

---

## 💖 Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ for healthcare professionals**

[Report Bug](https://github.com/kishanpatel486630/doctor-crm-dashboard/issues) · [Request Feature](https://github.com/kishanpatel486630/doctor-crm-dashboard/issues)

</div>

