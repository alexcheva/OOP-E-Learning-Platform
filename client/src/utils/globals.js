// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

export const globals = {
  // Fetch all courses
  async fetchCourses() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/courses`);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return await res.json();
  },
  // Fetch enrollments by ID
  async fetchEnrollments(student_id) {
    console.log("fetching enrollments", `${process.env.REACT_APP_API_URL}/api/enrollments/${student_id}`);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/enrollments/${student_id}`);
    if (!res.ok) throw new Error("Failed to fetch enrollments");
    return await res.json();
  },

  async handleDeleteUser(id) {
    console.log("delete user id", id)
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}api/users/${id}`, { method: "DELETE" });
    console.log(res);
    // navigate to login 
    // handleLogout
  },

  // Add a course
  async addCourse(course) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    if (!res.ok) throw new Error("Failed to add course");
    return await res.json();
  },

  // Example: Generic API call
  async request(path, options = {}) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${path}`, options);
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Network error");
    }
    return await res.json();
  },
};
