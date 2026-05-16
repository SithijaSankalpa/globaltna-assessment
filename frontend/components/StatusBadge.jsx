import { CircleDot, Clock, CheckCircle } from "lucide-react";

const statusConfig = {
  Open: { icon: CircleDot, bg: "#1a3a1a", color: "#4caf50", border: "#4caf50" },
  "In Progress": {
    icon: Clock,
    bg: "#3a2a00",
    color: "#ff9800",
    border: "#ff9800",
  },
  Closed: {
    icon: CheckCircle,
    bg: "#2a1a1a",
    color: "#f44336",
    border: "#f44336",
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig["Open"];
  const Icon = config.icon;

  return (
    <span
      style={{
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        padding: "0.25rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.78rem",
        fontWeight: "600",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
      }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
}
