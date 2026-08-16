import { Link } from "react-router-dom";
export default function Home() {
  return <main>
    <section className="hero"><div><span className="eyebrow">CAREERCONNECT</span>
    <h1>Find the right job. Build your future.</h1>
    <p>Discover jobs and internships, connect with companies, and manage applications in one place.</p>
    <div className="actions">
      <Link className="btn primary" to="/jobs">Find Jobs</Link>
      <Link className="btn secondary" to="/register">Get Started</Link>
      </div>
      </div>
    </section>
    <section className="section"><h2>Explore opportunities</h2><div className="grid three">
      <div className="card"><h3>Jobs</h3><p>Search full-time and part-time opportunities.</p><Link to="/jobs">Browse Jobs →</Link></div>
      <div className="card"><h3>Internships</h3><p>Find internships to gain real experience.</p><Link to="/jobs?type=Internship">Find Internships →</Link></div>
      <div className="card"><h3>Companies</h3><p>Explore companies and their open positions.</p><Link to="/companies">Explore Companies →</Link></div>
    </div></section>
  </main>;
}
