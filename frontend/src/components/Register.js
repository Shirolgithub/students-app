import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", course: "" }); // <-- added course
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/students/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br/><br/>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/><br/>
        <input name="course" placeholder="Course" onChange={handleChange} /><br/><br/>  {/* <-- new field */}
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
