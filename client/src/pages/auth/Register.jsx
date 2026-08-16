import {useState} from "react";import {Link,useNavigate} from "react-router-dom";import axios from "axios";
export default function Register(){const[f,setF]=useState({name:"",email:"",password:"",role:"student"});
const[e,setE]=useState("");const nav=useNavigate();
const submit=async x=>{x.preventDefault();
    try{const{data}=await axios.post("/api/auth/register",f);
    if(data.token)localStorage.setItem("token",data.token);
    if(data.user)localStorage.setItem("user",JSON.stringify(data.user));
    nav(f.role==="recruiter"?"/recruiter/dashboard":"/student/dashboard")}catch(x){setE(x.response?.data?.message||"Registration failed")}};
    return <main className="auth-page"><form className="card form-card" onSubmit={submit}>
        <h1>Create Account</h1>
        {e&&<p className="error">{e}</p>}
        <input required placeholder="Full name" value={f.name} onChange={x=>setF({...f,name:x.target.value})}/>
        <input required type="email" placeholder="Email" value={f.email} onChange={x=>setF({...f,email:x.target.value})}/>
        <input required type="password" placeholder="Password" value={f.password} onChange={x=>setF({...f,password:x.target.value})}/>
        <select value={f.role} onChange={x=>setF({...f,role:x.target.value})}>
            <option value="student">Student / Job Seeker</option>
            <option value="recruiter">Recruiter</option>
        </select>
        <button className="btn primary">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
    </form>
</main>}