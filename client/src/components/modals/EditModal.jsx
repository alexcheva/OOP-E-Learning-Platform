// ./modals/EditModal.jsx
import { useState, useEffect } from "react";

export default function EditModal({ 
  isOpen, 
  onClose, 
  entityName,   // e.g. "course" or "user"
  data,         // current record to edit
  fields,       // array of { name, label, type }
  endpoint,     // e.g. `/api/courses` or `/api/users`
  onSave        // callback after successful update
}) {
  const [formData, setFormData] = useState({});
  console.log("EditModal", data, fields, endpoint)

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${endpoint}/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Update failed");

      onSave(result);
      onClose();
    } catch (err) {
      console.error(`Error updating ${entityName}:`, err.message);
      alert(`Failed to update ${entityName}: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Edit {entityName.charAt(0).toUpperCase() + entityName.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                name={f.name}
                value={formData[f.name] ?? ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2 text-gray-900 focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
