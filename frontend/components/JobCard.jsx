import { MapPin, Tag, Calendar, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function JobCard({ job }) {
  return (
    <a href={`/jobs/${job._id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "1.5rem",
          cursor: "pointer",
          transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          height: "100%",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(233,69,96,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <h3
            style={{
              color: "var(--text-primary)",
              fontSize: "1.05rem",
              fontWeight: "600",
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </h3>
          <StatusBadge status={job.status} />
        </div>

        {/* Description */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {job.description}
        </p>

        {/* Meta Row */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "0.25rem",
          }}
        >
          {job.category && (
            <span
              style={{
                background: "var(--surface)",
                color: "var(--accent)",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: "500",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Tag size={11} />
              {job.category}
            </span>
          )}

          {job.location && (
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <MapPin size={12} />
              {job.location}
            </span>
          )}

          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Calendar size={12} />
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* View Details */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            color: "var(--accent)",
            fontSize: "0.82rem",
            fontWeight: "600",
            marginTop: "0.25rem",
          }}
        >
          View details <ArrowRight size={13} />
        </div>
      </div>
    </a>
  );
}
