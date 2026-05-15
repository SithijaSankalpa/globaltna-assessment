export default function StatusBadge({ status }) {
  const styles = {
    Open: {
      background: "#1a3a1a",
      color: "#4caf50",
      border: "1px solid #4caf50",
    },
    "In Progress": {
      background: "#3a2a00",
      color: "#ff9800",
      border: "1px solid #ff9800",
    },
    Closed: {
      background: "#2a1a1a",
      color: "#f44336",
      border: "1px solid #f44336",
    },
  };

  return (
    <span
      style={{
        ...styles[status],
        padding: "0.25rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.78rem",
        fontWeight: "600",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}
