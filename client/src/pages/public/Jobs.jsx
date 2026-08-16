import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
export default function Jobs() {
  const [params] = useSearchParams(); 
  const [jobs,setJobs]=useState([]);
  const [search,setSearch]=useState(params.get("search")||""); 
  const [loading,setLoading]=useState(true);
  useEffect(()=>{setLoading(true);axios.get("/api/jobs",
    {params:{search,type:params.get("type")||""}}).then(r=>setJobs(r.data.jobs||r.data||[])).catch(console.error).finally(()=>setLoading(false))},[search,params]);
  return <main className="page section">
    <h1>Find Jobs & Internships</h1>
    <div className="search-row">
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search job title or skill..."/>
      <button className="btn primary">Search</button>
      </div>{loading?<p>Loading...</p>:<div className="grid three">{jobs.map(j=><div className="card" key={j._id}>
        <h3>{j.title}</h3>
        <p>{j.company?.name||j.companyName||"Company"}</p>
        <p>📍 {j.location||"Not specified"}</p>
        <p>💼 {j.jobType||j.type||"Job"}</p>
        <Link className="btn secondary" to={`/jobs/${j._id}`}>View Details</Link>
      </div>)}</div>}</main>;
}
