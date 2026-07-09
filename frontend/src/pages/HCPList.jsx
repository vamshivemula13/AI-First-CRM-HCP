import { useEffect, useState } from "react";

import {
  getHCPs,
  deleteHCP
} from "../services/api";

function HCPList({ setPage, setSelectedDoctor }) {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    const data = await getHCPs();
    setDoctors(data);
  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {

      await deleteHCP(id);

      alert("Doctor deleted successfully!");

      loadDoctors();

    } catch (error) {

      alert("Failed to delete doctor.");

      console.error(error);

    }
  }

  return (
    <div style={styles.page}>
      {/* Scoped styling for hover/animation states inline objects can't express */}
      <style>{`
        @keyframes hcpFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aura-add-btn:hover { box-shadow: 0 10px 24px rgba(109, 91, 246, 0.4); transform: translateY(-2px); }
        .aura-add-btn:active { transform: translateY(0); }
        .aura-doctor-card { animation: hcpFadeIn 0.4s ease both; }
        .aura-doctor-card:hover { box-shadow: 0 14px 32px rgba(16,16,28,0.10); transform: translateY(-4px); border-color: rgba(109,91,246,0.3) !important; }
        .aura-view-btn:hover { background: #4f46e5 !important; color: #ffffff !important; }
        .aura-delete-btn:hover { background: #b91c1c !important; box-shadow: 0 8px 18px rgba(220,38,38,0.35); transform: translateY(-1px); }
      `}</style>

      <div className="page-header" style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>Doctors (HCPs)</h1>
          <p style={styles.subtitle}>{doctors.length} healthcare professionals on record</p>
        </div>

        <button
          className="add-btn aura-add-btn"
          onClick={() => setPage("addhcp")}
          style={styles.addBtn}
        >
          + Add Doctor
        </button>
      </div>

      <div className="doctor-grid" style={styles.doctorGrid}>
        {doctors.map((doctor, index) => (
          <div
            className="doctor-card aura-doctor-card"
            key={doctor.id}
            style={{ ...styles.doctorCard, animationDelay: `${index * 0.05}s` }}
          >
            <div style={styles.avatar}>
              {doctor.name ? doctor.name.charAt(0).toUpperCase() : "?"}
            </div>

            <h2 style={styles.name}>{doctor.name}</h2>

            <span style={styles.badge}>{doctor.specialization}</span>

            <p style={styles.detail}>
              <strong style={styles.detailLabel}>Hospital:</strong> {doctor.hospital}
            </p>

            <p style={styles.detail}>
              <strong style={styles.detailLabel}>Location:</strong> {doctor.location}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px"
              }}
            >
              <button
                className="aura-view-btn"
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setPage("profile");
                }}
                style={styles.viewBtn}
              >
                View Profile
              </button>

              <button
                onClick={() => handleDelete(doctor.id)}
                className="aura-delete-btn"
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "8px",
  },

  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    background: "linear-gradient(90deg, #10101c, #4f46e5)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#6b7189",
    fontSize: "14px",
  },

  addBtn: {
    background: "linear-gradient(90deg, #4f46e5, #6d5bf6)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "14.5px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 14px rgba(16,16,28,0.06)",
  },

  doctorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  doctorCard: {
    background: "#ffffff",
    border: "1px solid rgba(16,16,28,0.08)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(16,16,28,0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #6d5bf6)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "12px",
  },

  name: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#10101c",
  },

  badge: {
    display: "inline-block",
    background: "#eef0ff",
    color: "#4f46e5",
    fontSize: "12px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "999px",
    marginBottom: "12px",
  },

  detail: {
    margin: "6px 0",
    fontSize: "14px",
    color: "#374151",
  },

  detailLabel: {
    color: "#6b7189",
    fontWeight: 600,
  },

  viewBtn: {
    background: "#eef0ff",
    color: "#4f46e5",
    border: "none",
    padding: "9px 14px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "13.5px",
    cursor: "pointer",
    transition: "background 0.2s ease, color 0.2s ease",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "9px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "13.5px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  },
};

export default HCPList;