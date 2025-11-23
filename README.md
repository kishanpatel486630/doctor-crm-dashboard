# Doctor CRM Backend API

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/doctor-crm
SESSION_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:3000
```

## Running the Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user

### Patients

- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- GET `/api/patients/search?query=...` - Search patients
- POST `/api/patients` - Create new patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Appointments

- GET `/api/appointments` - Get all appointments
- GET `/api/appointments/:id` - Get appointment by ID
- GET `/api/appointments/date?date=...` - Get appointments by date
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Staff

- GET `/api/staff` - Get all staff
- GET `/api/staff/:id` - Get staff by ID
- POST `/api/staff` - Create staff (Admin only)
- PUT `/api/staff/:id` - Update staff (Admin only)
- DELETE `/api/staff/:id` - Delete staff (Admin only)

### Leads

- GET `/api/leads` - Get all leads
- GET `/api/leads/:id` - Get lead by ID
- GET `/api/leads/status/:status` - Get leads by status
- POST `/api/leads` - Create lead
- PUT `/api/leads/:id` - Update lead
- DELETE `/api/leads/:id` - Delete lead

### Prescriptions

- GET `/api/prescriptions` - Get all prescriptions
- GET `/api/prescriptions/:id` - Get prescription by ID
- GET `/api/prescriptions/patient/:patientId` - Get prescriptions by patient
- POST `/api/prescriptions` - Create prescription (Doctor only)
- PUT `/api/prescriptions/:id` - Update prescription (Doctor only)
- DELETE `/api/prescriptions/:id` - Delete prescription (Doctor only)

### Services & Products

- GET `/api/services-products` - Get all items
- GET `/api/services-products/:id` - Get item by ID
- GET `/api/services-products/type/:type` - Get items by type
- POST `/api/services-products` - Create item (Admin only)
- PUT `/api/services-products/:id` - Update item (Admin only)
- DELETE `/api/services-products/:id` - Delete item (Admin only)

### File Upload

- POST `/api/upload/single` - Upload single file
- POST `/api/upload/multiple` - Upload multiple files

## Database Models

- User
- Patient
- Appointment
- Staff
- Lead
- Prescription
- ServiceProduct
