export default function TeacherDashboard({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} (Teacher)</h2>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Add New Course</h3>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">All Courses</h3>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-2">Manage Users</h3>
      </section>
    </div>
  );
}
