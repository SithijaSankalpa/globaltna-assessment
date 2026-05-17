"use client";

import { PlusCircle, LogOut, User, Home, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, logout, isHomeowner, isTradesperson } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-sm)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "var(--accent)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
          fontFamily: "DM Serif Display, serif",
        }}
      >
        Fix<span style={{ color: "var(--text-primary)" }}>Mate</span>
      </a>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "var(--surface)",
                padding: "0.3rem 0.75rem",
                borderRadius: "20px",
                border: "1px solid var(--border)",
              }}
            >
              {isHomeowner ? <Home size={13} /> : <Wrench size={13} />}
              {user.name}
              <span
                style={{
                  background: isHomeowner ? "var(--accent-light)" : "#fef9c3",
                  color: isHomeowner ? "var(--accent)" : "#854d0e",
                  fontSize: "0.7rem",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "10px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                {user.role}
              </span>
            </span>

            {isHomeowner && (
              <a
                href="/jobs/new"
                className="btn-primary"
                style={{
                  color: "white",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 10px 20px rgba(22,163,74,0.18)",
                }}
              >
                <PlusCircle size={15} /> Post a Job
              </a>
            )}

            <button
              onClick={handleLogout}
              className="btn-danger"
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/auth/login"
              className="btn-link"
              style={{
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="btn-primary"
              style={{
                color: "white",
                padding: "0.5rem 1.2rem",
                borderRadius: "8px",
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
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="app-bg">
        <AuthProvider>
          <Navbar />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#111827",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
              success: {
                iconTheme: { primary: "#16a34a", secondary: "#ffffff" },
              },
              error: {
                iconTheme: { primary: "#dc2626", secondary: "#ffffff" },
              },
            }}
          />
          <main
            className="page-shell fade-up"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "2.5rem 1rem",
            }}
          >
            {children}
          </main>
          <footer
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--text-subtle)",
              fontSize: "0.85rem",
              borderTop: "1px solid var(--border)",
              marginTop: "4rem",
              background: "rgba(255,255,255,0.7)",
            }}
          >
            © {new Date().getFullYear()} FixMate — Service Request Board
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
