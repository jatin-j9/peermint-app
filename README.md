# PeerMint

**Student Peer Tutoring & Skill Exchange Platform**

PeerMint is a web application designed to connect students who want to learn new skills with fellow students who can teach them. The platform aims to encourage collaborative learning, knowledge sharing, and skill development within a university community.

The initial deployment is designed for a single university, while the underlying architecture is intended to support expansion to multiple universities in the future.

---

## 1. Project Objectives

PeerMint aims to provide a centralized platform where students can:

- Offer tutoring in skills they are proficient in.
- Discover students who can teach skills they want to learn.
- Create and manage tutoring requests.
- Share availability and schedule tutoring sessions.
- Communicate with other students.
- Track tutoring sessions and provide reviews.
- Receive notifications about relevant activities.

The platform will also provide administrative functionality for managing users, skills, suggestions, reports, and other platform activities.

## 2. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- TanStack Query
- Tailwind CSS
- Lucide React

### Backend

- Java 21
- Spring Boot
- Spring WebMVC
- Spring Data JPA
- Spring Security
- Spring Validation
- Maven

### Database and Persistence

- MySQL
- Hibernate / JPA
- Flyway Database Migration

### Development and Testing

- Visual Studio Code
- Git and GitHub
- JUnit 5
- Mockito
- Spring Boot Test
- MockMvc
- Vitest (planned)
- React Testing Library (planned)
- Playwright (planned for end-to-end testing)

## 3. Architecture Overview

PeerMint follows a **modular monolith architecture**.

The frontend and backend are maintained as separate applications, communicating through REST APIs.

```text
                    PeerMint
                       |
          +------------+------------+
          |                         |
      Frontend                   Backend
          |                         |
     React + Vite              Spring Boot
          |                         |
     Axios / REST  <-------->  REST Controllers
                                    |
                               Service Layer
                                    |
                             Repository Layer
                                    |
                              Spring Data JPA
                                    |
                                  MySQL
                                    |
                                  Flyway
```

### Architectural principles

- Modular organization based on application features.
- Separation of controller, service, and repository responsibilities.
- RESTful API design.
- Centralized exception handling.
- Database schema management through Flyway.
- Environment-specific configuration.
- Secure authentication and authorization as part of subsequent implementation stages.
- Maintainability, testability, and extensibility.

## 4. Target Repository Structure

The repository is organized into separate frontend and backend applications.

```text
peermint-app/
|
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- app/
|   |   +-- assets/
|   |   +-- components/
|   |   +-- features/
|   |   +-- hooks/
|   |   +-- lib/
|   |   +-- services/
|   |   +-- context/
|   |   +-- constants/
|   |   +-- styles/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |
|   +-- package.json
|   +-- vite.config.js
|   |
+-- backend/
|   +-- src/
|   |   +-- main/
|   |   |   +-- java/com/peermint/
|   |   |   |   +-- config/
|   |   |   |   +-- common/
|   |   |   |   +-- auth/
|   |   |   |   +-- user/
|   |   |   |   +-- profile/
|   |   |   |   +-- skill/
|   |   |   |   +-- discovery/
|   |   |   |   +-- matching/
|   |   |   |   +-- availability/
|   |   |   |   +-- request/
|   |   |   |   +-- session/
|   |   |   |   +-- messaging/
|   |   |   |   +-- review/
|   |   |   |   +-- notification/
|   |   |   |   +-- admin/
|   |   |   |   +-- audit/
|   |   |   |
|   |   |   +-- resources/
|   |   |       +-- db/migration/
|   |   |
|   |   +-- test/
|   |
|   +-- mvnw
|   +-- pom.xml
|
+-- .env.example
+-- .gitignore
+-- README.md
```

_Note: The directory structure includes planned feature packages. Not all application modules have been implemented yet._

## 5. Prerequisites

Ensure the following tools are installed:

| Tool    | Version / Requirement             |
| ------- | --------------------------------- |
| Java    | 21                                |
| Node.js | 24 or compatible                  |
| npm     | Compatible with installed Node.js |
| Maven   | Maven Wrapper is included         |
| MySQL   | Existing local MySQL server       |
| Git     | Installed and configured          |
| IDE     | Visual Studio Code or equivalent  |

The project uses the Maven Wrapper (`mvnw`), so a separate Maven installation is not required to build the backend.

## 6. Database Setup

PeerMint uses MySQL for persistent data storage.

### Step 1: Create the development database

Connect to your local MySQL server and execute:

```sql
CREATE DATABASE IF NOT EXISTS peermint_dev
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### Step 2: Create the application database user

If the application user has not already been created, execute:

```sql
CREATE USER 'peermint_app'@'localhost'
IDENTIFIED BY 'YOUR_DATABASE_PASSWORD';

GRANT ALL PRIVILEGES ON peermint_dev.*
TO 'peermint_app'@'localhost';
```

Use a secure password and do not commit it to the repository.

### Step 3: Configure database environment variables

The backend reads its database configuration from environment variables.

For local development, configure:

| Variable      | Description                |
| ------------- | -------------------------- |
| `DB_URL`      | JDBC connection URL        |
| `DB_USERNAME` | MySQL application username |
| `DB_PASSWORD` | MySQL application password |

Example configuration:

```bash
export DB_URL='jdbc:mysql://127.0.0.1:3306/peermint_dev?serverTimezone=UTC'
export DB_USERNAME='peermint_app'

printf "Enter your PeerMint database password: "
IFS= read -r -s DB_PASSWORD
export DB_PASSWORD
printf "\nPassword loaded into environment.\n"
```

The password is entered interactively rather than written directly into the command history.

**Important:** Spring Boot does not automatically load the root `.env` file. Export the variables in the terminal session before starting the backend, or configure them through an appropriate environment-variable management mechanism.

### Step 4: Database migrations

PeerMint uses Flyway to manage database schema changes.

Migration scripts belong in:

```text
backend/src/main/resources/db/migration/
```

Flyway is configured to execute migrations during application startup.

Database schema changes should be introduced through versioned migration scripts rather than relying on Hibernate automatic schema generation.

## 7. Running the Application

The frontend and backend run as separate processes during development.

### 7.1 Start the Backend

Open a terminal and navigate to:

```bash
cd backend
```

Configure the database environment variables as described in Section 6.

Start Spring Boot:

```bash
./mvnw spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 7.2 Start the Frontend

Open a second terminal and navigate to:

```bash
cd frontend
```

Install dependencies if necessary:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The Vite development server is configured to proxy `/api` requests to the Spring Boot backend.

### 7.3 Access PeerMint

Open the following address in your browser:

```text
http://localhost:5173
```

The current development screen includes a backend connectivity indicator.

## 8. API Endpoints

The backend API uses the following base path:

```text
/api/v1
```

### Health Checks

| Endpoint               | Purpose                           |
| ---------------------- | --------------------------------- |
| `GET /api/v1/health`   | Application API health check      |
| `GET /actuator/health` | Spring Boot Actuator health check |

Test the application health:

```bash
curl -i http://localhost:8080/api/v1/health
```

Expected response:

```json
{
  "data": {
    "status": "UP"
  }
}
```

Test Actuator:

```bash
curl -i http://localhost:8080/actuator/health
```

Expected response:

```json
{
  "status": "UP"
}
```

The frontend proxy can also be tested using:

```bash
curl -i http://localhost:5173/api/v1/health
```

## 9. Testing

### Backend

Run all backend tests:

```bash
cd backend
./mvnw clean test
```

Build the backend:

```bash
./mvnw clean package
```

### Frontend

Run the production build:

```bash
cd frontend
npm run build
```

Frontend unit and component tests will be added as the corresponding features are implemented.

## 10. Configuration and Environment Profiles

The backend supports environment-specific configuration.

| Configuration File     | Purpose                          |
| ---------------------- | -------------------------------- |
| `application.yml`      | Common application configuration |
| `application-dev.yml`  | Local development configuration  |
| `application-test.yml` | Test configuration               |
| `application-prod.yml` | Production configuration         |

The default Spring profile is `dev`.

Sensitive configuration, including database passwords and production credentials, must be supplied through environment variables.

The root `.env.example` file provides a reference for the expected environment configuration. It must not contain real credentials.

## 11. Development Guidelines

The following principles should be followed as the application develops:

1. Maintain feature-based modular organization.
2. Keep controllers focused on HTTP handling.
3. Place business logic in service classes.
4. Use repositories for persistence operations.
5. Use DTOs for API request and response objects.
6. Validate incoming requests.
7. Handle exceptions centrally.
8. Use Flyway migrations for database schema changes.
9. Avoid exposing sensitive information in logs or API responses.
10. Write tests alongside new functionality.
11. Follow consistent naming and formatting conventions.
12. Avoid introducing unnecessary dependencies or architectural complexity.

## 12. Current Development Status

The initial project foundation has been established.

### Completed

- Repository and development environment setup.
- React + Vite frontend initialization.
- Spring Boot backend initialization.
- MySQL development database configuration.
- Flyway integration.
- Frontend-backend connectivity.
- Environment-specific backend configuration.
- Centralized logging and exception handling.
- Initial backend smoke tests.
- Local environment verification.

### Upcoming

The next development stages will progressively implement:

- Database domain model and migrations.
- User registration and authentication.
- Student profiles.
- Skills catalogue and skill management.
- Tutor discovery and matching.
- Availability management.
- Tutoring requests and scheduling.
- Session lifecycle management.
- Messaging and notifications.
- Reviews and ratings.
- Administrative functionality.

These are planned application capabilities and should not be interpreted as already implemented.

---

**PeerMint — Learn Together. Grow Together.**
