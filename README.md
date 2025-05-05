# IP Manager

A MERN stack application for managing and displaying IP address data with filtering, sorting, and pagination capabilities.

## Features

- Display IP address data with detailed information
- Filter entries based on multiple fields
- Sort results by different columns
- Pagination support for large datasets
- Responsive design for desktop and mobile
- Detailed view for each IP address entry

## Project Structure

The project is organized into two main components:

- **frontend**: React frontend built with TypeScript
- **backend**: Express backend API built with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ip-manager
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Import data into MongoDB

Run the import script to load the CSV data into MongoDB:

```bash
npm run import
```

### 5. Start the backend server

```bash
npm run dev
```

The server will start on http://localhost:5000.

### 6. Install frontend dependencies

In a new terminal:

```bash
cd ../frontend
npm install
```

### 7. Start the frontend application

```bash
npm start
```

The client application will start on http://localhost:3000.

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/cmdb`: Get all entries with pagination, filtering, and sorting
- `GET /api/cmdb/id/:id`: Get entry by ID
- `GET /api/cmdb/ip/:ip`: Get entry by IP address
- `POST /api/cmdb`: Create a new entry
- `PUT /api/cmdb/:id`: Update an existing entry
- `DELETE /api/cmdb/:id`: Delete an entry

## Query Parameters

The following query parameters are supported for the `GET /api/cmdb` endpoint:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)
- `sortBy`: Field to sort by (default: 'lastSeen')
- `sortOrder`: Sort order ('asc' or 'desc', default: 'desc')
- `addressIP`: Filter by IP address
- `addressType`: Filter by address type
- `organization`: Filter by organization
- `country`: Filter by country
- `countryCode`: Filter by country code
- `continentCode`: Filter by continent code
- `usageType`: Filter by usage type
- `threatLevel`: Filter by threat level

## Technologies Used

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- CSV Parser

### Frontend

- React
- TypeScript
- Axios for API calls
- CSS for styling

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The frontend build will be created in the `frontend/build` directory. You can serve these static files using any web server.
