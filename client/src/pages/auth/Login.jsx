import {useState} from "react";import {Link,useNavigate} from "react-router-dom";import axios from "axios";
export default function Login(){const[f,setF]=useState({email:"",password:""});
const[e,setE]=useState("");
const nav=useNavigate();
const submit=async x=>{x.preventDefault();
    try{const{data}=await axios.post("/api/auth/login",f);
    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
    const r=data.user?.role;nav(r==="admin"?"/admin/dashboard":r==="recruiter"?"/recruiter/dashboard":"/student/dashboard")}catch(x){setE(x.response?.data?.message||"Login failed")}};
    return <main className="auth-page">
        <form className="card form-card" onSubmit={submit}>
            <h1>Login</h1>{e&&<p className="error">{e}</p>}
            <input type="email" required placeholder="Email" value={f.email} onChange={x=>setF({...f,email:x.target.value})}/>
            <input type="password" required placeholder="Password" value={f.password} onChange={x=>setF({...f,password:x.target.value})}/>
            <button className="btn primary">Login</button>
            <Link to="/forgot-password">Forgot Password?</Link>
            <p>New user? <Link to="/register">Create account</Link></p>
        </form>
    </main>}