import {useEffect,useState} from "react";

import {getInteractionsByHCP} from "../services/api";


function DoctorProfile({doctor,setPage}){


const [interactions,setInteractions]=useState([]);




useEffect(()=>{

loadHistory();

},[]);




async function loadHistory(){


const data =
await getInteractionsByHCP(doctor.id);


setInteractions(data);


}




return (

<div>


<button

onClick={()=>setPage("hcp")}

>

← Back

</button>



<h1>
Doctor Profile
</h1>




<div className="doctor-card">


<h2>
{doctor.name}
</h2>


<p>
Specialization:
{doctor.specialization}
</p>


<p>
Hospital:
{doctor.hospital}
</p>


<p>
Location:
{doctor.location}
</p>


</div>




<h2>
Interaction History
</h2>




{

interactions.length===0 ?


<p>
No interactions found
</p>



:

interactions.map((item)=>(


<div

className="interaction-card"

key={item.id}

>


<h3>
{item.interaction_type}
</h3>


<p>
{item.summary}
</p>


<p>
Follow up:
{item.follow_up_date}
</p>


</div>


))


}



</div>


);


}


export default DoctorProfile;