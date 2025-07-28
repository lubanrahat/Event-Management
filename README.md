# Event Management System

A full-stack event management application built with React TypeScript frontend and Spring Boot backend.

## Features

- **User Authentication & Authorization** - JWT-based secure login and registration
- **Event Management** - Create, view, edit, and delete events
- **Calendar View** - Interactive calendar to visualize events
- **Dashboard** - Overview of user's events and activities
- **User Profiles** - Manage user information and preferences
- **Dark/Light Theme** - Toggle between themes with persistent preferences
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **React DatePicker** for date selection

### Backend
- **Spring Boot 3.2.5** with Java 21
- **Spring Security** for authentication
- **MongoDB** for data persistence
- **JWT** for token-based authentication
- **Lombok** for reducing boilerplate code

## Project Structure

```
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Calendar/    # Calendar view components
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Events/      # Event management components
│   │   │   ├── Layout/      # Layout components
│   │   │   └── ui/          # Reusable UI components
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── package.json
└── backend/                 # Spring Boot backend
    ├── src/
    │   ├── main/java/       # Java source code
    │   └── test/java/       # Test files
    └── pom.xml
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Java** (v21 or higher)
- **Maven** (v3.6 or higher)
- **MongoDB** (v4.4 or higher)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and build:
   ```bash
   mvn clean install
   ```

3. Configure MongoDB connection in `application.properties`

4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your backend URL (default: `http://localhost:8080/api`)

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `mvn spring-boot:run` - Start the application
- `mvn test` - Run tests
- `mvn clean install` - Clean and build the project

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend
Configure in `application.properties`:
- Database connection settings
- JWT secret key