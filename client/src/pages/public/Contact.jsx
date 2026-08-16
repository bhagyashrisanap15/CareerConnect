import {useState} from "react";
export default function Contact(){const[s,setS]=useState(false);
    return 
    <main className="page section">
        <form className="card form-card" onSubmit={e=>{e.preventDefault();setS(true)}}>
            <h1>Contact Us</h1>{s?<p>Thank you. Your message has been sent.</p>:<>
            <input required placeholder="Your name"/>
            <input required type="email" placeholder="Email"/>
            <textarea required rows="6" placeholder="Message"/>
            <button className="btn primary">Send Message</button>
            </>}
        </form>
    </main>}
