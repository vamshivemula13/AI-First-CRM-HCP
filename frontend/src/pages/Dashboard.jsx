import { useEffect, useState } from "react";

import {
  getHCPs,
  getAllInteractions,
  getFollowUps
} from "../services/api";

function Dashboard() {

  const [doctorCount, setDoctorCount] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const doctors = await getHCPs();

      const interactions = await getAllInteractions();

      const upcoming = await getFollowUps();

      setDoctorCount(doctors.length);

      setInteractionCount(interactions.length);

      setPendingCount(
        interactions.filter(
          (item) => item.status === "Pending"
        ).length
      );

      setCompletedCount(
        interactions.filter(
          (item) => item.status === "Completed"
        ).length
      );

      setFollowUps(upcoming);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div>

      <h1>📊 MedIQ Dashboard</h1>
      

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{doctorCount}</h2>
          <p>👨‍⚕️ Total Doctors</p>
        </div>

        <div className="stat-card">
          <h2>{interactionCount}</h2>
          <p>📝 Total Interactions</p>
        </div>

        <div className="stat-card">
          <h2>{pendingCount}</h2>
          <p>🟡 Pending</p>
        </div>

        <div className="stat-card">
          <h2>{completedCount}</h2>
          <p>🟢 Completed</p>
        </div>

      </div>

      <h2 style={{ marginTop: "40px" }}>
        📅 Upcoming Follow-ups
      </h2>

      {
        followUps.length === 0 ?

          <p>No upcoming follow-ups.</p>

          :

          followUps.map((item) => (

            <div
              key={item.id}
              className="interaction-card"
            >

              <h3>{item.interaction_type}</h3>

              <p>{item.summary}</p>

              <p>
                Follow-up Date: {item.follow_up_date}
              </p>

              <p>
                Status: {item.status}
              </p>

            </div>

          ))
      }

    </div>

  );

}

export default Dashboard;