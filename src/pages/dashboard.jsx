import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Read user once; memo avoids re-parsing on every render
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch (err) {
      return {};
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const rows = [
    { label: "Fullname", value: user.full_name },
    { label: "Username", value: user.username },
    { label: "Country", value: user.country },
    { label: "Email id", value: user.email_id },
    { label: "Mobile number", value: user.mobile_number },
    { label: "Referral id", value: user.referral_id },
  ];

  return (
    <div className="page">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button type="button" className="btn btn--secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <p className="subtitle">Logged-in user details</p>

        <div className="table-wrap">
          <table className="user-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
