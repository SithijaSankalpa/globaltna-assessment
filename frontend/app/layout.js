"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showPostJobButton = pathname !== "/jobs/new";

  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <title>FixMate — Service Request Board</title>
        <meta
          name="description"
          content="Connect homeowners with skilled tradespeople"
        />
      </head>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <nav
          style={{
            background: "var(--secondary)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <a
            href="/"
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: "var(--accent)",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            Fix<span style={{ color: "var(--text-primary)" }}>Mate</span>
          </a>

          {showPostJobButton && (
            <a
              href="/jobs/new"
              style={{
                background: "var(--accent)",
                color: "white",
                padding: "0.5rem 1.2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              + Post a Job
            </a>
          )}
        </nav>

        <main
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "2rem 1rem",
            flex: 1,
            width: "100%",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            borderTop: "1px solid var(--border)",
            marginTop: "auto",
          }}
        >
          © {new Date().getFullYear()} FixMate — Service Request Board
        </footer>
      </body>
    </html>
  );
}
