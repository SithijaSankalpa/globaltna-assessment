"use client";

import { useState, useEffect } from "react";
import { getAllJobs } from "../lib/api";
import JobCard from "../components/JobCard";

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
  "Other",
];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const filters = {};
      if (category !== "All") filters.category = category;
      if (status !== "All") filters.status = status;
      if (search.trim()) filters.search = search.trim();

      const res = await getAllJobs(filters);
      setJobs(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const selectStyle = {
    background: "var(--secondary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "72px",
          zIndex: 50,
          background: "var(--primary)",
          paddingBottom: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Service Requests
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Browse open jobs or post your own service request
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            background: "var(--secondary)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "1.25rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "0.5rem",
              flex: 1,
              minWidth: "200px",
            }}
          >
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                ...selectStyle,
                flex: 1,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Search
            </button>
          </form>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={selectStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>

        {/* Job Count */}
        {!loading && !error && (
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: "0.75rem",
              fontSize: "0.9rem",
            }}
          >
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {/* States */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "var(--text-muted)",
          }}
        >
          Loading jobs...
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#2a1a1a",
            border: "1px solid var(--danger)",
            color: "#f44336",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Job Grid */}
      {!loading && !error && jobs.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            No jobs found
          </p>
          <a href="/jobs/new" style={{ color: "var(--accent)" }}>
            Post the first one →
          </a>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
