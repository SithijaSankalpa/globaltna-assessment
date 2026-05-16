"use client";

import { PlusCircle, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
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
      {/* Logo */}
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
        Fix<span style={{ color: "white" }}>Mate</span>
      </a>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <User size={15} />
              {user.name}
            </span>
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
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <PlusCircle size={15} />
              Post a Job
            </a>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/auth/login"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Login
            </a>
            <a
              href="/auth/register"
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
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>FixMate — Service Request Board</title>
        <meta
          name="description"
          content="Connect homeowners with skilled tradespeople"
        />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#16213e",
                color: "#eaeaea",
                border: "1px solid rgba(233, 69, 96, 0.3)",
                borderRadius: "8px",
                fontSize: "0.9rem",
              },
              success: {
                iconTheme: {
                  primary: "#4caf50",
                  secondary: "#16213e",
                },
              },
              error: {
                iconTheme: {
                  primary: "#f44336",
                  secondary: "#16213e",
                },
              },
            }}
          />
          <main
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "2rem 1rem",
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
              marginTop: "4rem",
            }}
          >
            © {new Date().getFullYear()} FixMate — Service Request Board
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
