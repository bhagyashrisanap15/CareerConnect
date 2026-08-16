import {useEffect,useState} from "react";
import axios from "axios";
export default function ManageJobs(){
    const[j,setJ]=useState([]);
    useEffect(()=>{axios.get("/api/jobs").then(r=>setJ(r.data.jobs||r.data||[])).catch(console.error)},[]);
return <main className="page section">
    <h1>Manage Jobs</h1>
    <div className="card">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {j.map(x=>(
                    <tr key={x._id}>
                        <td>{x.title}</td>
                        <td>{x.company?.name||"-"}</td>
                        <td>{x.jobType||"-"}</td>
                        <td>{x.status||"Active"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</main>}
