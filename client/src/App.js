import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [shortlist, setShortlist] = useState([]);

  useEffect(() => {
  axios
    .get("https://hire5-app.onrender.com/api/applicants")
    .then((res) => {
      setApplicants(res.data);
    })
    .catch((err) => {
      console.error("Error fetching applicants:", err);
    });
}, []);


  const toggleShortlist = (candidate) => {
    setShortlist((prev) => {
      const exists = prev.find((c) => c.email === candidate.email);
      if (exists) return prev.filter((c) => c.email !== candidate.email);
      if (prev.length >= 5) return prev;
      return [...prev, candidate];
    });
  };

  const filtered = applicants.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Hire5 – Smart Hiring Dashboard</h1>
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>All Applicants</h2>
      {filtered.map((a, idx) => (
        <div key={idx} className="card">
          <h3>{a.name || "Unnamed"}</h3>
          <p><b>Location:</b> {a.location}</p>
          <p><b>Skills:</b> {a.skills?.join(", ")}</p>
          <p><b>Experience:</b> {a.work_experiences?.length} roles</p>
          <p><b>Salary:</b> {a.annual_salary_expectation?.["full-time"]}</p>
          <button onClick={() => toggleShortlist(a)}>
            {shortlist.find((s) => s.email === a.email)
              ? "Remove from Shortlist"
              : "Add to Shortlist"}
          </button>
        </div>
      ))}

      <h2>Shortlisted Candidates ({shortlist.length}/5)</h2>
      {shortlist.map((s, i) => (
        <div key={i} className="shortlist">
          <h4>{s.name}</h4>
          <p>Location: {s.location}</p>
          <p>Skills: {s.skills?.join(", ")}</p>
          <p>Experience: {s.work_experiences?.length} roles</p>
          <p>Salary: {s.annual_salary_expectation?.["full-time"]}</p>
        </div>
      ))}

      <h2>Diversity Stats</h2>
      <p>Unique Countries: {[...new Set(shortlist.map((s) => s.location))].length}</p>
      <p>
        Total Unique Skills: {
          [...new Set(shortlist.flatMap((s) => s.skills || []))].length
        }
      </p>
    </div>
  );
}

export default App;
