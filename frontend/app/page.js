"use client";

import { useState, useEffect } from "react";
import { getAllJobs } from "../lib/api";
import JobCard from "../components/JobCard";
import { Briefcase, Search } from "lucide-react";

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
    background: "var(--primary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "72px",
          zIndex: 50,
          background: "rgba(248, 249, 250, 0.92)",
          paddingBottom: "1.5rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
          backdropFilter: "blur(10px)",
          borderRadius: "18px 18px 12px 12px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="soft-panel card-glow"
          style={{
            padding: "1.1rem 1.5rem",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.85rem",
                fontWeight: "600",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              FixMate Board
            </p>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              Service Requests
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Browse open jobs or post your own service request
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {["Verified trades", "Fast responses", "Local experts"].map(
              (pill) => (
                <span
                  key={pill}
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                    border: "1px solid rgba(22,163,74,0.2)",
                    padding: "0.35rem 0.7rem",
                    borderRadius: "999px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                  }}
                >
                  {pill}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Filters */}
        <div
          className="soft-panel"
          style={{
            padding: "0.9rem 1rem",
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            boxShadow: "var(--shadow-md)",
            backdropFilter: "blur(6px)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
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
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Search size={15} /> Search
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

              marginLeft: "0.4rem",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Briefcase size={14} />
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
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
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
          <Briefcase
            size={48}
            style={{ margin: "0 auto 1rem", opacity: 0.3, display: "block" }}
          />
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
          gap: "1.5rem",
        }}
      >
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
