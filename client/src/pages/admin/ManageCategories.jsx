import {useEffect,useState}from"react";
import axios from"axios";
export default function ManageCategories(){const[c,setC]=useState([]);const[n,setN]=useState("");
    const load=()=>axios.get("/api/categories").then(r=>setC(r.data.categories||r.data||[]));
    useEffect(()=>{load()},[]);const add=async e=>{e.preventDefault();
        await axios.post("/api/categories",{name:n},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
        setN("");load()};
        return <main className="page section">
            <h1>Manage Categories</h1>
            <form className="actions" onSubmit={add}>
                <input placeholder="Category name" value={n} onChange={e=>setN(e.target.value)}/>
                <button className="btn primary">Add</button>
            </form>
            <div className="grid three">
                {c.map(x=>(
                    <div className="card" key={x._id}>
                        <h3>{x.name}</h3>
                    </div>
                ))}
            </div>
        </main>}
