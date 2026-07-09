const API_URL = "http://localhost:8000";


// ----------------------------
// HCP APIs
// ----------------------------

export async function getHCPs(){

  const response = await fetch(
    `${API_URL}/api/hcps/`
  );

  if(!response.ok){
    throw new Error("Failed to get doctors");
  }

  return await response.json();

}



export async function createHCP(data){

  const response = await fetch(
    `${API_URL}/api/hcps/`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(data)
    }
  );


  if(!response.ok){
    throw new Error("Failed to create doctor");
  }

  return await response.json();

}



export async function deleteHCP(id){

  const response = await fetch(
    `${API_URL}/api/hcps/${id}`,
    {
      method:"DELETE"
    }
  );


  if(!response.ok){
    throw new Error("Failed to delete doctor");
  }


  return await response.json();

}



// ----------------------------
// Interaction APIs
// ----------------------------


export async function createInteraction(data){

  const response = await fetch(
    `${API_URL}/api/interactions/`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(data)
    }
  );


  if(!response.ok){
    throw new Error("Failed to save interaction");
  }


  return await response.json();

}




export async function getInteractionsByHCP(hcpId){

  const response = await fetch(
    `${API_URL}/api/interactions/history/${hcpId}`
  );


  if(!response.ok){
    throw new Error("Failed to get interactions");
  }


  return await response.json();

}




export async function getAllInteractions(){

  const response = await fetch(
    `${API_URL}/api/interactions/`
  );


  if(!response.ok){
    throw new Error("Failed to fetch interactions");
  }


  return await response.json();

}




export async function getFollowUps(){

  const response = await fetch(
    `${API_URL}/api/interactions/followups/`
  );


  if(!response.ok){
    throw new Error("Failed to fetch followups");
  }


  return await response.json();

}




export async function updateInteractionStatus(id,status){

  const response = await fetch(
    `${API_URL}/api/interactions/${id}/status?status=${status}`,
    {
      method:"PUT"
    }
  );


  if(!response.ok){
    throw new Error("Failed to update status");
  }


  return await response.json();

}




// ----------------------------
// AI Chat API
// ----------------------------


export async function sendChatMessage(message){

  const response = await fetch(
    `${API_URL}/api/chat/`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },


      body:JSON.stringify({
        message:message
      })

    }
  );


  return await response.json();

}