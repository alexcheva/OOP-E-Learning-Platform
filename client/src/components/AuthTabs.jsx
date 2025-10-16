import React, { useState } from "react";
import axios from "axios";

function AuthTabs() {
  const [activeTab, setActiveTab] = useState("register");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    major: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      activeTab === "register"
        ? "http://localhost:9000/api/register"
        : "http://localhost:9000/api/login";

    try {
      const res = await axios.post(url, formData);
      alert(`${activeTab === "register" ? "Registered" : "Logged in"} successfully!`);
      console.log(res.data);
      console.log("Logged in as a "+ res.data.user.role);
    } catch (err) {
      alert("Error: " + err.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <div className="flex mb-4 border-b">
        <button
          className={`flex-1 py-2 font-semibold ${
            activeTab === "register" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
        <button
          className={`flex-1 py-2 font-semibold ${
            activeTab === "login" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "register" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />

            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                />{" "}
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={formData.role === "teacher"}
                  onChange={handleChange}
                />{" "}
                Teacher
              </label>
            </div>

            {formData.role === "student" && (
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">Select Major</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Design">Design</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            )}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {activeTab === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthTabs;
