import {useEffect,useState} from "react";import {useParams} from "react-router-dom";import axios from "axios";
export default function ApplicantDetails(){const{id}=useParams();
const[a,setA]=useState(null);const[s,setS]=useState("");
useEffect(()=>{axios.get(`/api/applications/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(r=>{const x=r.data.application||r.data;setA(x);setS(x.status)})},[id]);const update=async()=>{await axios.patch(`/api/applications/${id}/status`,{status:s},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
alert("Status updated")};if(!a)
    return <main className="page section">Loading...</main>;
return
 <main className="page section"><div className="card detail">
    <h1>{a.student?.name||"Applicant"}</h1><p>{a.student?.email||"-"}</p>
    <h2>{a.job?.title||"-"}</h2><select value={s} onChange={e=>setS(e.target.value)}>
        <option>Applied</option>
        <option>Under Review</option>
        <option>Shortlisted</option>
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
        </select>
        <button className="btn primary" onClick={update}>Update Status</button>
        </div>
 </main>}
