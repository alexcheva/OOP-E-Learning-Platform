# OOP E-Learning Platform
Develop a comprehensive e-learning management system that enables instructors to create courses and students to enroll, participate, and track their progress. The application should demonstrate strong object-oriented programming principles and provide a seamless learning experience.

## Objective:
Create a web application where instructors can manage courses and content, while students can access learning materials, submit assignments, and track their academic progress.

[Link to a live project.](https://oop-e-learning-platform.onrender.com/)

![Registration](./wireframes/register.png)<br />
![Log in](./wireframes/sign-in.png)<br />
![Teacher view](./wireframes/teacher-view.png)<br />
![Teacher Edit Users](./wireframes/teacher-edit-users.png)<br />
![Teacher Enroll Students](./wireframes/enroll-students.png)<br />
![Teacher Course Management](./wireframes/course-management.png)<br />
![Teacher Grades](./wireframes/teacher-grades.png)<br />
![Student View](./wireframes/student-view.png)<br />
![Student Edit](./wireframes/student-edit-user.png)<br />
![Student Course Management](./wireframes/student-courses.png)<br />
![Student Grades](./wireframes/student-grades.png)<br />

## Features:
- CRUD operations (Create, Read, Update, Delete)
- User authentication (login, registration)
- User Management: 
    - Creating and managing user accounts, 
    - handling patron information, and 
    - providing authentication for library services. 
    - User profiles to manage their personal library.
- **Add New Students or Teacher**s: Create new user records with ***ID, name, email, and major***
- **Update Student or Teacher Information**: Modify existing user details
- **View Student or Teacher Details**: Display all users in a sortable table
- **Delete Users**: Remove student records with confirmation
- **Search Functionality**: Filter users by ***ID, name, email, or major/course***
- **Input Validation**: Comprehensive validation for all fields
- **Duplicate Prevention**: Prevents duplicate student IDs

## Course Management & Enrollment
- **Add New Courses**: Create course records with ID, name, credits, and enrollment limits
- **Update Course Information**: Modify existing course details
- **View Course Details**: Display all courses in a sortable table
- **Delete Courses**: Remove course records with confirmation
- **Set Prerequisites**: Define prerequisite courses required for enrollment
- **Enrollment Limits**: Set maximum number of students per course
- **Available Seats**: Track and display available seats for each course
- **Course Selectio**n: Dropdown menu for selecting available courses
- **Student Lists**: Separate lists for available and enrolled students
- **Bulk Enrollment**: Select and enroll multiple students simultaneously
- **Unenrollment**: Remove students from courses with confirmation
- **Prerequisite Checking**: Verify students meet prerequisites before enrollment
- **Capacity Management**: Prevent enrollment when courses reach capacity
- **Student Filtering**: Search functionality for both available and enrolled students

## Grade Management
- **Student Selection:** Dropdown for choosing students
- **Course Overview**: Table showing all courses a student is enrolled in
- **Grade Assignment**: Assign grades from A+ to F scale
- **Grade History**: View current grades for all enrolled courses
- **GPA Calculation:** Automatic calculation and display of student GPA
- **Color-Coded Grades**: Visual indicators for different grade levels
- **Date Tracking**: Record and display when grades were assigned

## How to initialize and set up:
## 📦 Tech Stack

**Frontend:** React (Vite or CRA)  
**Backend:** Node.js + Express  
**Database:** PostgreSQL  
**Other Tools:** dotenv, cors, pg  

---

## 🧰 Prerequisites

Make sure you have the following installed:

- [Node.js 24+](https://nodejs.org/en/)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- (optional) [Git](https://git-scm.com/)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/alexcheva/OOP-E-Learning-Platform.git
cd OOP-E-Learning-Platform
```
### 2. Set Up Servers
From the root directory of the project, install all dependencies for both server and client:

#### Install backend dependencies
```bash
npm install
```

#### Install frontend (React) dependencies
```bash
npm install --prefix client
```
#### Start the Servers

You can run the backend, frontend, or both from the root directory using the predefined npm scripts.

Start Backend Only:
```bash
npm run server
```

Uses nodemon to auto-reload on code changes.

Start Frontend Only:
```bash
npm run client
```

Start Both Backend and Frontend Simultaneously:
```bash
npm run dev
```

Uses concurrently to run backend and frontend at the same time.



Your server should be running at http://localhost:9000

React app runs at http://localhost:3000


## 3. Set Up Database
a database dump file and/or other clear files available for recreation of your database environment.

```bash
psql
```
Then run:
``` sql
CREATE ROLE app_user WITH LOGIN PASSWORD 'change_me';
CREATE DATABASE eduportal OWNER app_user;
```

Create a ``.env`` file in the server/ directory:
``` env
PORT=9000
DATABASE_URL=postgres://app_user:change_me@localhost:5432/eduportal
```

#### Users

``` sql
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(100) UNIQUE NOT NULL,
 password VARCHAR(100) NOT NULL,
 role VARCHAR(20) NOT NULL,
 major VARCHAR(100)
);
```

#### Courses

``` sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  credits INTEGER NOT NULL CHECK (credits > 0),
  enrollment_limit INTEGER NOT NULL CHECK (enrollment_limit >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### Enrollments
``` sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) CHECK (role IN ('student', 'teacher'));
```

``` sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  grade VARCHAR(5)
);
```

## 🧠 Available Scripts
### Backend (server)

| Command       | Description                            |
| ------------- | -------------------------------------- |
| `npm run dev` | Run Express server in development mode |
| `npm start`   | Start production server                |

### Dependiencies:
a concise summary of the necessary dependencies included in the project:
- **Express** - Create a backend web server and define APIs.
- **CORS** - Allow your frontend (React) and backend (Node/Express) to talk to each other when running on different domains/ports.
- **dotenv** - Securely manage environment variables (like passwords, API keys, and database URLs).
- **pg** - Connect and query a PostgreSQL database from Node.js.

| Package     | Purpose                            | Typical Use                 |
| ----------- | ---------------------------------- | --------------------------- |
| **express** | Web server & routing               | Define your API endpoints   |
| **cors**    | Security for cross-domain requests | Allow React to call Express |
| **dotenv**  | Load environment variables         | Manage secrets safely       |
| **pg**      | PostgreSQL client                  | Interact with your database |



## Routes 
and any authentication/authorization included
 | Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `POST`   | `/login`               | User log in             |
| `POST`   | `/register`            | Create a new user       |
| `GET`    | `/api/users`           | Get all users           |
| `PUT`    | `/api/users/:id`       | Update user             |
| `DELETE` | `/api/users/:id`       | Delete user             |
| `POST`   | `/api/enrollments`     | Create a new enrollment |
| `GET`    | `/api/enrollments`     | Get all enrollments     |
| `PUT`    | `/api/enrollments/:id` | Update enrollment       |
| `DELETE` | `/api/enrollments/:id` | Delete enrollment       |



## Tests:
- EditButton Component Test: 
  - Ensures the Edit icon renders correctly.
  - Verifies the onEdit callback is called with the correct item when clicked.
  - (Uses React Testing Library + Jest.)

- EditModal Component Test (planned / partial)
  - Intended to check that form fields populate with existing data, update values correctly, and trigger onSave when submitted.


