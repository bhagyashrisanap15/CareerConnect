import {useState} from "react";import axios from "axios";
export default function ForgotPassword(){const[e,setE]=useState("");
    const[s,setS]=useState(false);
    return
     <main className="auth-page">
        <form className="card form-card" onSubmit={async x=>{x.preventDefault();
        try{await axios.post("/api/auth/forgot-password",{email:e});setS(true)}catch(err){setS(true)}}}>
            <h1>Forgot Password</h1>
            {s?<p>If the email exists, reset instructions have been sent.</p>:<>
            <input type="email" required placeholder="Email" value={e} onChange={x=>setE(x.target.value)}/>
            <button className="btn primary">Send Reset Link</button></>}</form>
    </main>}
