import {Link} from "react-router-dom";
export default function AdminDashboard()
{return <main className="page section">
    <h1>Admin Dashboard</h1>
    <div className="grid four"><div className="stat">
        <b>Users</b>
        <strong>--</strong></div>
        <div className="stat">
            <b>Companies</b><strong>--</strong>
            </div>
            <div className="stat">
                <b>Jobs</b><strong>--</strong>
                </div><div className="stat">
                    <b>Applications</b><strong>--</strong>
            </div>
                </div>
                    <div className="grid three">
                        <Link className="card" to="/admin/users">
                        <h3>Manage Users</h3></Link>
                        <Link className="card" to="/admin/jobs">
                        <h3>Manage Jobs</h3>
                        </Link>
                        <Link className="card" to="/admin/companies">
                        <h3>Manage Companies</h3></Link>
                    </div>
</main>}
