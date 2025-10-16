# OOP E-Learning Platform
Develop a comprehensive e-learning management system that enables instructors to create courses and students to enroll, participate, and track their progress. The application should demonstrate strong object-oriented programming principles and provide a seamless learning experience.

## Objective:
Create a web application where instructors can manage courses and content, while students can access learning materials, submit assignments, and track their academic progress.

[Link to a live project.](https://github.com/alexcheva/)

![Registration](register.png)<br />
![Log in](sign-in.png)<br />
![Teacher view](teacher-view.png)<br />
![Teacher Edit Users](teacher-edit-users.png)<br />
![Teacher Enroll Students](enroll-students.png)<br />
![Teacher Course Management](course-management.png)<br />
![Teacher Grades](teacher-grades.png)<br />
![Student View](student-view.png)<br />
![Student Edit](student-edit-user.png)<br />
![Student Course Management](student-courses.png)<br />
![Student Grades](student-grades.png)<br />

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
### 2. Set Up the Server

```bash
cd server
npm install
```

Create a .env file in the server/ directory:

``` env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pern_demo
```
Run the backend:

``` bash
npm run dev
```
✅ Your API should be running at http://localhost:5000


### 3. Set Up the Client
``` bash

cd ../client
npm install
npm start
```
✅ React app runs at http://localhost:3000




💡 You can connect using psql, PgAdmin, or a GUI like TablePlus / DBeaver.

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


## Database setup:
a database dump file and/or other clear files available for recreation of your database environment, 

#### Students
id - (primary) integer unique,<br />
fname - varchar required,<br />
lname - varchar optional unique,<br />
email - varchar optional unique<br />


``` sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  fname VARCHAR (50) NOT NULL,
  lname VARCHAR (100) NULL UNIQUE,
  email VARCHAR NULL UNIQUE
);
```

## Sample Data:

``` sql
INSERT INTO students (fname,lname,email)
 VALUES 
  ('Camryn','Rodgers','pspoole@optonline.net'),
  ('Leon','Oliver','sscorpio@aol.com'),
  ('Cassie','Schneider','presoff@yahoo.com'),
  ('Jamya','Simpson','claypool@yahoo.ca'),
  ('Brennen','Oconnor','ahmad@yahoo.ca'),
  ('Lauren','Lynn','yangyan@sbcglobal.net'),
  ('Lucy','Barker','esbeck@verizon.net');
 ```

### Extra Data to add:

Roman  
Spencer  
fraterk@sbcglobal.net

### To test adding existing value:
Lucy  
Barker  
esbeck@verizon.net


## Routes 
and any authentication/authorization included
 | Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/api/users`     | Get all users     |
| `POST`   | `/api/users`     | Create a new user |
| `PUT`    | `/api/users/:id` | Update user       |
| `DELETE` | `/api/users/:id` | Delete user       |



## Tests:
- concise summary of at least two included tests.


