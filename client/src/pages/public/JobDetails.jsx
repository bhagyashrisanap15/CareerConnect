import {useEffect,useState} from "react"; import {Link,useParams} from "react-router-dom"; import axios from "axios";
export default function JobDetails(){const{id}=useParams();
const[j,setJ]=useState(null);useEffect(()=>{axios.get(`/api/jobs/${id}`).then(r=>setJ(r.data.job||r.data)).catch(console.error)},[id]);
if(!j)return 
<main className="page section">Loading...</main>;
return <main className="page section"><Link to="/jobs">← Back</Link><div className="card detail"><h1>{j.title}</h1>
<h3>{j.company?.name||j.companyName||"Company"}</h3>
<p>📍 {j.location||"-"} · 💼 {j.jobType||j.type||"-"}</p>
<hr/>
<h2>Description</h2>
<p>{j.description||"-"}</p>
<h2>Requirements</h2>
<p>{j.requirements||"-"}</p>
<h2>Skills</h2>
<p>{Array.isArray(j.skills)?j.skills.join(" • "):j.skills||"-"}</p>
<Link className="btn primary" to="/login">Login to Apply</Link>
</div>
</main>}
