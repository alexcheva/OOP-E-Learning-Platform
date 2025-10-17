import TeacherDashboard from '../components/TeacherDashboard';
import StudentDashboard from '../components/StudentDashboard';

export default function Landing({ user }) {
  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div className="p-6">
      {user.role === 'teacher' ? (
        <TeacherDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
}