import isLoggedIn from "../components/isLoggedIn";

export default function Dashboard() {
  
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const dept = localStorage.getItem("dept");

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="dashItem">
      This is the dashboard page for {user} with role {role} and dept {dept}
    </div>
  );
}
