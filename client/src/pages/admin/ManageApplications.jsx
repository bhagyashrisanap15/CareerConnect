import {useEffect,useState}from"react";
import axios from"axios";
export default function ManageApplications()
{const[a,setA]=useState([]);
    useEffect(()=>{axios.get("/api/admin/applications",
        {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(r=>setA(r.data.applications||r.data||[])).catch(console.error)},[]);
    return 
    <main className="page section">
        <h1>Manage Applications</h1>
        <div className="card">
            <table><thead>
                <tr>
                    <th>Student</th>
                    <th>Job</th>
                    <th>Company</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {a.map(x=><tr key={x._id}><td>{x.student?.name||"-"}
                    
                    </td>
                    <td>{x.job?.title||"-"}</td>
                    <td>{x.job?.company?.name||"-"}</td>
                    <td>{x.status}</td></tr>)}
                    </tbody>
                    </table>
        </div>
    </main>}
