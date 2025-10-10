# OOP E-Learning Platform
Develop a comprehensive e-learning management system that enables instructors to create courses and students to enroll, participate, and track their progress. The application should demonstrate strong object-oriented programming principles and provide a seamless learning experience.

## Objective:
Create a web application where instructors can manage courses and content, while students can access learning materials, submit assignments, and track their academic progress.

[Link to a live project.](https://github.com/alexcheva/)


## Features:
- CRUD operations (Create, Read, Update, Delete)
- User authentication (login, registration)
- User Management: 
 - Creating and managing user accounts, handling patron information, and providing authentication for library services. User profiles to manage their personal library.
- Add New Students or Teachers: Create new user records with ID, name, email, and major
- Update Student or Teacher Information: Modify existing user details
- View Student or Teacher Details: Display all users in a sortable table
- Delete Users: Remove student records with confirmation
- Search Functionality: Filter users by ID, name, email, or major/course
- Input Validation: Comprehensive validation for all fields
- Duplicate Prevention: Prevents duplicate student IDs

## Course Management & Enrollment
- Add New Courses: Create course records with ID, name, credits, and enrollment limits
- Update Course Information: Modify existing course details
- View Course Details: Display all courses in a sortable table
- Delete Courses: Remove course records with confirmation
- Set Prerequisites: Define prerequisite courses required for enrollment
- Enrollment Limits: Set maximum number of students per course
- Available Seats: Track and display available seats for each course
- Course Selection: Dropdown menu for selecting available courses
- Student Lists: Separate lists for available and enrolled students
- Bulk Enrollment: Select and enroll multiple students simultaneously
- Unenrollment: Remove students from courses with confirmation
- Prerequisite Checking: Verify students meet prerequisites before enrollment
- Capacity Management: Prevent enrollment when courses reach capacity
- Student Filtering: Search functionality for both available and enrolled students

## Grade Management
- Student Selection: Dropdown for choosing students
- Course Overview: Table showing all courses a student is enrolled in
- Grade Assignment: Assign grades from A+ to F scale
- Grade History: View current grades for all enrolled courses
- GPA Calculation: Automatic calculation and display of student GPA
- Color-Coded Grades: Visual indicators for different grade levels
- Date Tracking: Record and display when grades were assigned

## How to initialize and set up:

- a concise summary of the necessary dependencies included in your project
 and their purpose,

### Dependiencies:

## Database setup:
a database dump file and/or other clear files available for recreation of your database environment, 

![Registration](register.png)<br />
![Log in](sign-in.png)<br />
![Teacher view](teacher-view.png)<br />
![Teacher Edit Users](teacher-edit-users.png)<br />
![Teacher Enroll Students](enroll-students.png)<br />
![Course Management](course-management.png)<br />

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
and any authentication/authorization included, 


## Tests:
- concise summary of at least two included tests.


