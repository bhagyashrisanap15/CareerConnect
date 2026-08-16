import {useEffect,useState} from "react";import {Link,useParams} from "react-router-dom";import axios from "axios";
export default function CompanyDetails(){const{id}=useParams();
const[c,setC]=useState(null);useEffect(()=>{axios.get(`/api/companies/${id}`).then(r=>setC(r.data.company||r.data)).catch(console.error)},[id]);
if(!c)
    return
 <main className="page section">Loading...</main>;
 return 
 <main className="page section">
    <Link to="/companies">← Companies</Link>
    <div className="card detail"><h1>{c.name}</h1>
    <p>{c.industry||"-"} · {c.location||"-"}</p>
    <h2>About</h2><p>{c.description||"No description available."}</p>
    <h2>Website</h2>
    <p>{c.website||"Not available"}</p>
    </div>
</main>}
