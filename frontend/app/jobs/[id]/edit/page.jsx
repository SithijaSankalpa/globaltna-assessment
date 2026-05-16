"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getJobById, updateJob } from "../../../../lib/api";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  FileText,
  AlignLeft,
  Tag,
  MapPin,
  User,
  Mail,
} from "lucide-react";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function EditJobPage({ params }) {
  const router = useRouter();
  const { user, token, isHomeowner } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(params.id);
        const job = res.data;

        // Only owner can edit
        if (!user || job.createdBy._id !== user.id || !isHomeowner) {
          toast.error("Not authorized to edit this job");
          router.push(`/jobs/${params.id}`);
          return;
        }

        // Cannot edit if tradesperson has acted on it
        if (job.statusUpdatedBy) {
          toast.error(
            "Cannot edit — a tradesperson has already updated this job",
          );
          router.push(`/jobs/${params.id}`);
          return;
        }

        // Cannot edit if not Open
        if (job.status !== "Open") {
          toast.error("Only Open jobs can be edited");
          router.push(`/jobs/${params.id}`);
          return;
        }

        setForm({
          title: job.title || "",
          description: job.description || "",
          category: job.category || "Plumbing",
          location: job.location || "",
          contactName: job.contactName || "",
          contactEmail: job.contactEmail || "",
        });
      } catch (err) {
        toast.error(err.message);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (user !== null) fetchJob();
  }, [params.id, user]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (
      form.contactEmail &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.contactEmail)
    )
      e.contactEmail = "Please enter a valid email";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.dismiss();
      toast.error(Object.values(validationErrors)[0]);
      return;
    }

    setSaving(true);
    setApiError("");

    try {
      await updateJob(params.id, form, token);
      toast.success("Job updated successfully!");
      router.push(`/jobs/${params.id}`);
    } catch (err) {
      setApiError(err.message);
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "var(--primary)",
    color: "var(--text-primary)",
    border: `1px solid ${errors[field] ? "#f44336" : "var(--border)"}`,
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    outline: "none",
  });

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    marginBottom: "0.4rem",
    color: "var(--text-muted)",
    fontSize: "0.875rem",
  };

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem",
          color: "var(--text-muted)",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <a
          href={`/jobs/${params.id}`}
          style={{
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <ArrowLeft size={15} /> Back to job
        </a>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginTop: "1rem",
            color: "var(--text-primary)",
          }}
        >
          Edit Job Request
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.4rem" }}>
          You can only edit this job while it is Open and untouched by a
          tradesperson
        </p>
      </div>

      {apiError && (
        <div
          style={{
            background: "#2a1a1a",
            border: "1px solid #f44336",
            color: "#f44336",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          ⚠️ {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--secondary)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            <FileText size={13} /> Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Need a plumber for leaking kitchen tap"
            style={inputStyle("title")}
          />
          {errors.title && (
            <span
              style={{
                color: "#f44336",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.title}
            </span>
          )}
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            <AlignLeft size={13} /> Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the job in detail..."
            rows={4}
            style={{
              ...inputStyle("description"),
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          {errors.description && (
            <span
              style={{
                color: "#f44336",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.description}
            </span>
          )}
        </div>

        {/* Category + Location */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              <Tag size={13} /> Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={{ ...inputStyle("category"), cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              <MapPin size={13} /> Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Glasgow"
              style={inputStyle("location")}
            />
          </div>
        </div>

        {/* Contact Name + Email */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              <User size={13} /> Contact Name
            </label>
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Your name"
              style={inputStyle("contactName")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              <Mail size={13} /> Contact Email
            </label>
            <input
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              style={inputStyle("contactEmail")}
            />
            {errors.contactEmail && (
              <span
                style={{
                  color: "#f44336",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.contactEmail}
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#555" : "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.875rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: saving ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
