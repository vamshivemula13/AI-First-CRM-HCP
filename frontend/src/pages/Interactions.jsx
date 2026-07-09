import { useEffect, useState } from "react";

import {
  getHCPs,
  createInteraction,
  getAllInteractions,
  updateInteractionStatus
} from "../services/api";


function Interactions() {


  const [doctors, setDoctors] = useState([]);

  const [interactions, setInteractions] = useState([]);



  const [formData, setFormData] = useState({

    hcp_id: "",
    interaction_type: "",
    summary: "",
    follow_up_date: ""

  });



  useEffect(() => {

    loadDoctors();

    loadInteractions();

  }, []);





  async function loadDoctors(){

    const data = await getHCPs();

    setDoctors(data);

  }





  async function loadInteractions(){

    const data = await getAllInteractions();

    console.log(data);

    setInteractions(data);

  }






  function handleChange(e){

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  }






  async function handleSubmit(e){

    e.preventDefault();


    try{

      await createInteraction(formData);


      alert("Interaction saved successfully");


      setFormData({

        hcp_id:"",
        interaction_type:"",
        summary:"",
        follow_up_date:""

      });


      loadInteractions();


    }
    catch(error){

      console.error(error);

      alert("Failed to save interaction");

    }

  }







  async function markCompleted(id){


    try{

      await updateInteractionStatus(
        id,
        "Completed"
      );


      loadInteractions();


    }
    catch(error){

      console.error(error);

      alert("Failed to update status");

    }

  }







return (

<div style={styles.page}>

  {/* Scoped styling for focus/hover/animation states inline objects can't express */}
  <style>{`
    @keyframes intFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .aura-field:focus {
      outline: none;
      border-color: #6d5bf6 !important;
      box-shadow: 0 0 0 4px #eef0ff;
      background: #ffffff !important;
    }
    .aura-save-btn:hover {
      box-shadow: 0 10px 24px rgba(109, 91, 246, 0.4);
      transform: translateY(-2px);
    }
    .aura-save-btn:active { transform: translateY(0); }
    .aura-history-card {
      animation: intFadeIn 0.4s ease both;
    }
    .aura-history-card:hover {
      box-shadow: 0 14px 32px rgba(16,16,28,0.10);
      transform: translateY(-3px);
      border-color: rgba(109,91,246,0.25) !important;
    }
    .aura-complete-btn:hover {
      background: #4f46e5 !important;
      color: #ffffff !important;
    }
  `}</style>

  <h1 style={styles.title}>
    Doctor Interactions
  </h1>

  <p className="subtitle" style={styles.subtitle}>
    Record meetings and follow-ups with healthcare professionals
  </p>

  <form
    className="hcp-form"
    onSubmit={handleSubmit}
    style={styles.form}
  >

    <label style={styles.label}>
      Doctor
      <select
        name="hcp_id"
        value={formData.hcp_id}
        onChange={handleChange}
        required
        className="aura-field"
        style={styles.field}
      >
        <option value="">
          Select Doctor
        </option>

        {doctors.map((doctor) => (
          <option
            key={doctor.id}
            value={doctor.id}
          >
            {doctor.name}
          </option>
        ))}
      </select>
    </label>

    <label style={styles.label}>
      Interaction Type
      <input
        name="interaction_type"
        placeholder="Meeting / Call / Email"
        value={formData.interaction_type}
        onChange={handleChange}
        required
        className="aura-field"
        style={styles.field}
      />
    </label>

    <label style={styles.label}>
      Discussion Summary
      <textarea
        name="summary"
        placeholder="What was discussed..."
        value={formData.summary}
        onChange={handleChange}
        required
        className="aura-field"
        style={{ ...styles.field, height: "100px", resize: "vertical" }}
      />
    </label>

    <label style={styles.label}>
      Follow-up Date
      <input
        type="date"
        name="follow_up_date"
        value={formData.follow_up_date}
        onChange={handleChange}
        className="aura-field"
        style={styles.field}
      />
    </label>

    <button type="submit" className="aura-save-btn" style={styles.saveBtn}>
      Save Interaction
    </button>

  </form>

  <div style={styles.divider} />

  <h2 style={styles.historyTitle}>
    Interaction History
  </h2>

  <div style={styles.historyList}>

    {interactions.map((item, index) => (

      <div
        key={item.id}
        className="doctor-card aura-history-card"
        style={{ ...styles.historyCard, animationDelay: `${index * 0.05}s` }}
      >

        <div style={styles.historyHeader}>
          <h3 style={styles.historyType}>
            {item.interaction_type}
          </h3>

          <span
            style={{
              ...styles.statusBadge,
              ...(item.status === "Completed" ? styles.statusDone : styles.statusPending),
            }}
          >
            {item.status === "Completed" ? "🟢 Completed" : "🟡 Pending"}
          </span>
        </div>

        <p style={styles.summaryText}>
          {item.summary}
        </p>

        <p style={styles.followUp}>
          <strong style={styles.followUpLabel}>Follow up:</strong> {item.follow_up_date || "No date"}
        </p>

        {item.status !== "Completed" &&
          <button
            onClick={() => markCompleted(item.id)}
            className="aura-complete-btn"
            style={styles.completeBtn}
          >
            Mark Completed
          </button>
        }

      </div>

    ))}

  </div>

</div>


);


}


export default Interactions;

const styles = {
  page: {
    padding: "8px",
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
    margin: "6px 0 28px",
    color: "#6b7189",
    fontSize: "15px",
  },

  form: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "20px",
    border: "1px solid rgba(16,16,28,0.08)",
    boxShadow: "0 4px 14px rgba(16,16,28,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxWidth: "560px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#6b7189",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  field: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1.5px solid rgba(16,16,28,0.08)",
    fontSize: "14.5px",
    fontWeight: 400,
    textTransform: "none",
    letterSpacing: "normal",
    color: "#10101c",
    background: "#fafafe",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  },

  saveBtn: {
    background: "linear-gradient(90deg, #4f46e5, #6d5bf6)",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14.5px",
    marginTop: "4px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  divider: {
    height: "1px",
    background: "rgba(16,16,28,0.08)",
    border: "none",
    margin: "36px 0 28px",
  },

  historyTitle: {
    margin: "0 0 18px",
    fontSize: "20px",
    fontWeight: 800,
    color: "#10101c",
  },

  historyList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  historyCard: {
    background: "#ffffff",
    border: "1px solid rgba(16,16,28,0.08)",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(16,16,28,0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  },

  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "8px",
  },

  historyType: {
    margin: 0,
    fontSize: "16.5px",
    fontWeight: 700,
    color: "#10101c",
  },

  statusBadge: {
    fontSize: "12px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },

  statusDone: {
    background: "#dcfce7",
    color: "#15803d",
  },

  statusPending: {
    background: "#fef9c3",
    color: "#a16207",
  },

  summaryText: {
    margin: "8px 0",
    fontSize: "14.5px",
    color: "#374151",
    lineHeight: 1.5,
  },

  followUp: {
    margin: "6px 0 14px",
    fontSize: "13.5px",
    color: "#6b7189",
  },

  followUpLabel: {
    color: "#10101c",
    fontWeight: 600,
  },

  completeBtn: {
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
};