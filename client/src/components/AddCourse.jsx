import { useState } from 'react';
import axios from 'axios';

export default function AddCourse({ onAdded }) {
  const [form, setForm] = useState({
    name: '',
    credits: '',
    enrollment_limit: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!form.name.trim()) return setError('Course name is required');
    const credits = Number(form.credits);
    const enrollment_limit = Number(form.enrollment_limit);
    if (!Number.isInteger(credits) || credits <= 0)
      return setError('Credits must be an integer > 0');
    if (!Number.isInteger(enrollment_limit) || enrollment_limit < 0)
      return setError('Enrollment limit must be an integer >= 0');

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:9000/api/courses', {
        name: form.name.trim(),
        credits,
        enrollment_limit,
      });
      setForm({ name: '', credits: '', enrollment_limit: '' });
      if (onAdded) onAdded(res.data); // optional callback
      alert('Course added');
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error || 'Failed to create course. Check console.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md p-4 border rounded">
      <h3 className="text-lg font-semibold mb-3">Add New Course</h3>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Course name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="credits"
          value={form.credits}
          onChange={handleChange}
          placeholder="Credits (e.g. 3)"
          className="w-full border p-2 rounded"
          type="number"
          min="1"
          required
        />
        <input
          name="enrollment_limit"
          value={form.enrollment_limit}
          onChange={handleChange}
          placeholder="Enrollment limit (e.g. 30)"
          className="w-full border p-2 rounded"
          type="number"
          min="0"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
}
