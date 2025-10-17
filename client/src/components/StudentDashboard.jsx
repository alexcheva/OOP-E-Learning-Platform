export default function StudentDashboard({ user }) {

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.name} (Student)
      </h2>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">My Profile</h3>
        <p>Email: {user.email}</p>
        <p>Major: {user.major}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Available Courses</h3>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-2">My Enrollments</h3>
      </section>
    </div>
  );
}