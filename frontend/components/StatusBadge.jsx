import { CircleDot, Clock, CheckCircle } from "lucide-react";

const statusConfig = {
  Open: { icon: CircleDot, bg: "#dcfce7", color: "#15803d", border: "#86efac" },
  "In Progress": {
    icon: Clock,
    bg: "#fef9c3",
    color: "#854d0e",
    border: "#fde047",
  },
  Closed: {
    icon: CheckCircle,
    bg: "#fee2e2",
    color: "#991b1b",
    border: "#fca5a5",
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
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
}
