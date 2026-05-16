"use client";

import {
  MapPin,
  Tag,
  Clock,
  Mail,
  User,
  Trash2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../components/../context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getJobById, updateJobStatus, deleteJob } from "../../../lib/api";
import StatusBadge from "../../../components/StatusBadge";

const STATUSES = ["Open", "In Progress", "Closed"];

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      try {
        const res = await getJobById(jobId);
        setJob(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    try {
      const res = await updateJobStatus(job._id, e.target.value);
      setJob(res.data);
      toast.success(`Status updated to "${res.data.status}"`);
    } catch (err) {
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job request?")) return;
    setDeleting(true);
    try {
      await deleteJob(job._id);
      toast.success("Job request deleted");
      router.push("/");
    } catch (err) {
      toast.dismiss();
      toast.error(err.message);
      setDeleting(false);
    }
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

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#f44336" }}>
        ⚠️ {error}
      </div>
    );

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Back */}
      <a
        href="/"
        style={{
          color: "var(--accent)",
          textDecoration: "none",
          fontSize: "0.9rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <ArrowLeft size={15} /> Back to listings
      </a>

      {/* Main Card */}
      <div
        style={{
          background: "var(--secondary)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "2rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Title + Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </h1>
          <StatusBadge status={job.status} />
        </div>

        {/* Meta */}
        {job.category && (
          <span
            style={{
              background: "var(--surface)",
              color: "var(--accent)",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Tag size={12} />
            {job.category}
          </span>
        )}

        {job.location && (
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <MapPin size={13} />
            {job.location}
          </span>
        )}

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <Clock size={13} />
          Posted{" "}
          {new Date(job.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Description */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Description
          </h3>
          <p
            style={{
              color: "var(--text-primary)",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            {job.description}
          </p>
        </div>

        {/* Contact */}
        {(job.contactName || job.contactEmail) && (
          <div
            style={{
              background: "var(--primary)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Contact
            </h3>
            {job.contactName && (
              <p
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <User size={14} style={{ color: "var(--text-muted)" }} />
                {job.contactName}
              </p>
            )}
            {job.contactEmail && (
              <p
                style={{
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Mail size={14} />
                {job.contactEmail}
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <label
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                marginBottom: "0.4rem",
              }}
            >
              <RefreshCw size={13} />
              Update Status
            </label>
            <select
              value={job.status}
              onChange={handleStatusChange}
              disabled={updating}
              style={{
                background: "var(--primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "0.6rem 1rem",
                fontSize: "0.9rem",
                cursor: "pointer",
                minWidth: "180px",
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {updating && (
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  marginLeft: "0.5rem",
                }}
              >
                Updating...
              </span>
            )}
          </div>

          {user && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                background: "transparent",
                color: "#f44336",
                border: "1px solid #f44336",
                borderRadius: "6px",
                padding: "0.6rem 1.25rem",
                cursor: deleting ? "not-allowed" : "pointer",
                fontSize: "0.9rem",
                fontWeight: "600",
                transition: "background 0.2s",
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(244,67,54,0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Trash2 size={15} />
              {deleting ? "Deleting..." : "Delete Job"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
