import { useState } from "react";
import { createHCP } from "../services/api";


function AddHCP({ setPage }) {

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    hospital: "",
    location: "",
    phone: "",
    email: "",
    notes: ""
  });


  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await createHCP(formData);

      alert("Doctor added successfully");

      setPage("hcp");

    } catch (error) {

      console.error(error);

      alert("Failed to add doctor");

    }

  }


  return (

    <div>

      <h1>Add Doctor</h1>

      <p className="subtitle">
        Add a new healthcare professional
      </p>


      <form 
        className="hcp-form"
        onSubmit={handleSubmit}
      >

        <input
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
        />


        <input
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />


        <input
          name="hospital"
          placeholder="Hospital"
          value={formData.hospital}
          onChange={handleChange}
        />


        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />


        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />


        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />


        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />


        <button type="submit">
          Save Doctor
        </button>


      </form>

    </div>

  );

}


export default AddHCP;