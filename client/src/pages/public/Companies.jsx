import {useEffect,useState} from "react";import {Link} from "react-router-dom";import axios from "axios";
export default function Companies(){const[c,setC]=useState([]);
    useEffect(()=>{axios.get("/api/companies").then(r=>setC(r.data.companies||r.data||[])).catch(console.error)},[]);
    return 
    <main className="page section">
        <h1>Companies</h1>
        <div className="grid three">
            {c.map(x=><div className="card" key={x._id}>
                <h3>{x.name}</h3>
                <p>{x.industry||"Technology"} </p>
                    <p>{x.location||"India"}</p>
                    <Link className="btn secondary" to={`/companies/${x._id}`}>
                    View Company
                    </Link>
                    </div>)}
        </div>
    </main>}
