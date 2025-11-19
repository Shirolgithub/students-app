import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://students-app-1-jmc1.onrender.com/api/students/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);
      setStudentInfo(res.data.student);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        /><br/><br/>

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>

      {studentInfo && (
        <div>
          <h3>Welcome, {studentInfo.name}!</h3>
          <p>Course: {studentInfo.course}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
