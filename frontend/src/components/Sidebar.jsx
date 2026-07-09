function Sidebar({setPage}) {


return (

<aside className="sidebar">


<h2>
MedIQ👨‍⚕️🤖
</h2>



<div
className="menu"
onClick={()=>setPage("dashboard")}
>
📊 Dashboard
</div>



<div
className="menu"
onClick={()=>setPage("hcp")}
>
👨‍⚕️ Doctors (HCPs)
</div>



<div
className="menu"
onClick={()=>setPage("interactions")}
>
📝 Interactions
</div>



<div
className="menu"
onClick={()=>setPage("chat")}
>
 🤖AI Assistant
</div>



</aside>

);

}


export default Sidebar;



