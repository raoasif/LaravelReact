import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function DefaultLayout() {

  const {user, token} = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();
  }

  if(!token){
    return <Navigate to="/login" />
  }

  return (
    <div id="defaultLayout">

      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>

      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
