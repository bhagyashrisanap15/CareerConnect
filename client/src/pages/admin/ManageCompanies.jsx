import {useEffect,useState}from"react";
import axios from"axios";
export default function ManageCompanies()
       {const[c,setC]=useState([]);
        useEffect(()=>{axios.get("/api/companies").then(r=>setC(r.data.companies||r.data||[])).catch(console.error)},[]);
return <main className="page section">
    <h1>Manage Companies</h1>
    <div className="card">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Industry</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {c.map(x=>(
                    <tr key={x._id}>
                        <td>{x.name}</td>
                        <td>{x.industry||"-"}</td>
                        <td>{x.location||"-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</main>}
