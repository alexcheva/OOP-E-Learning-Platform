const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

export async function enrollUser(student_id, course_id) {
  console.log("enrollUser called", student_id, course_id);
  const res = await fetch(`${API_URL}/api/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ student_id, course_id }),
  });

  if (!res.ok) throw new Error("Failed to enroll user");
  return await res.json();
}

export async function dropUser(enrollment_id) {
  console.log("dropUser called", enrollment_id);
  const res = await fetch(`${API_URL}/api/enrollments/${enrollment_id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Failed to drop this course");
  return await res.json();
};