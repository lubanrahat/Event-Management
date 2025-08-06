# Event Management System

A full-stack web application for managing events, registrations, and user interactions. Built with Spring Boot backend and React TypeScript frontend.

## 🚀 Features

### Core Functionality

- **Event Management**: Create, update, delete, and manage events
- **User Authentication**: JWT-based authentication with role-based access control
- **Registration System**: Event registration with status tracking (Confirmed, Waitlisted, Cancelled)
- **Dashboard**: Role-specific dashboards for Organizers, Attendees, and Admins
- **Calendar Integration**: Event calendar view for better scheduling

### User Roles

- **Organizer**: Create and manage events, view registrations
- **Attendee**: Browse events, register for events, manage personal profile
- **Admin**: Full system access, user management, event oversight

### Event Features

- **Event Categories**: Conference, Workshop, Webinar, Social, Sports
- **Location Types**: Online, Physical, Hybrid
- **Event Status**: Draft, Published, Ongoing, Completed, Cancelled
- **Capacity Management**: Set event capacity with waitlist functionality
- **Registration Deadlines**: Time-based registration cutoff
- **Rich Content**: Support for images, requirements, agenda, and tags

## 🛠️ Technology Stack

### Backend

- **Java 21** with **Spring Boot 3.2.5**
- **MongoDB** for data persistence
- **Spring Security** with JWT authentication
- **Spring Data MongoDB** for data access
- **Lombok** for boilerplate reduction
- **SpringDoc OpenAPI** for API documentation
- **Micrometer** for metrics and monitoring

### Frontend

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **React DatePicker** for date selection

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **MongoDB** (local or cloud instance)
- **Maven** for backend build
- **npm** or **yarn** for frontend dependencies

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/lubanrahat/Event-Management.git
cd Event-Management
```

### 2. Backend Setup

#### Configure MongoDB

Set up your MongoDB connection in `backend/src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/eventmanagementdb
```

#### Run the Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Run the Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Key API Endpoints

#### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

#### Events

- `GET /api/events` - List all events (paginated)
- `POST /api/events` - Create new event (Organizer/Admin only)
- `GET /api/events/{id}` - Get event details
- `PUT /api/events/{id}` - Update event (Owner/Admin only)
- `DELETE /api/events/{id}` - Delete event (Owner/Admin only)

#### Registrations

- `POST /api/registrations` - Register for an event
- `GET /api/registrations/event/{eventId}` - Get event registrations
- `PUT /api/registrations/{id}` - Update registration status
- `DELETE /api/registrations/{id}` - Cancel registration

#### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/dashboard` - Get dashboard statistics

## 🏗️ Project Structure

```
Event Management/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/eventmanagement/
│   │   ├── config/                   # Configuration classes
│   │   ├── controller/               # REST controllers
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── model/                    # Entity models
│   │   ├── repository/               # Data access layer
│   │   ├── security/                 # Security configuration
│   │   └── service/                  # Business logic
│   └── src/main/resources/
│       └── application.properties    # Application configuration
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── Auth/                 # Authentication components
│   │   │   ├── Dashboard/            # Dashboard components
│   │   │   ├── Events/               # Event management components
│   │   │   └── ui/                   # Reusable UI components
│   │   ├── contexts/                 # React contexts
│   │   ├── services/                 # API service layer
│   │   └── types/                    # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRATION`: JWT token expiration time

#### Frontend

- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:8080/api)

### Database Schema

The application uses MongoDB with the following collections:

- `users`: User accounts and profiles
- `events`: Event information and metadata
- `registrations`: Event registration records

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different user roles
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Password Security**: Encrypted password storage
