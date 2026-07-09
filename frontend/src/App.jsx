import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import HCPList from "./pages/HCPList";
import AddHCP from "./pages/AddHCP";
import Interactions from "./pages/Interactions";
import Chat from "./pages/Chat";
import DoctorProfile from "./pages/DoctorProfile";

import "./App.css";


function App() {

  const [page, setPage] = useState("dashboard");

  const [selectedDoctor, setSelectedDoctor] = useState(null);


  return (

    <div className="app-container">


      <Sidebar setPage={setPage}/>



      <div className="main-content">


        <Navbar />



        {page === "dashboard" &&
          <Dashboard />
        }



        {page === "hcp" &&
          <HCPList

            setPage={setPage}

            setSelectedDoctor={setSelectedDoctor}

          />
        }



        {page === "addhcp" &&
          <AddHCP setPage={setPage}/>
        }



        {page === "profile" &&

          <DoctorProfile

            doctor={selectedDoctor}

            setPage={setPage}

          />

        }



        {page === "interactions" &&
          <Interactions/>
        }



        {page === "chat" &&
          <Chat/>
        }



      </div>


    </div>

  );

}


export default App;