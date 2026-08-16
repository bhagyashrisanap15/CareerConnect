import {useEffect,useState} from "react";
import axios from "axios";
export default function ManageUsers(){
    const[u,setU]=useState([]);const load=()=>axios.get("/api/admin/users",
        {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(r=>setU(r.data.users||r.data||[])).catch(console.error);
        useEffect(load,[]);const del=async id=>{if(confirm("Delete user?")){await axios.delete(`/api/admin/users/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});load()}};
        return <main className="page section">
            <h1>Manage Users</h1>
            <div className="card">
                <table><thead><tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{u.map(x=><tr key={x._id}><td>{x.name}</td><td>{x.email}</td><td>{x.role}</td><td>
                    <button className="link-btn" onClick={()=>del(x._id)}>Delete</button>
                    </td></tr>)}</tbody></table></div></main>}
