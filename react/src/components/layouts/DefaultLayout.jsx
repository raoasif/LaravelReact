import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

export default function DefaultLayout() {

  const {user, token, notification, setUser, setToken} = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

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
      {notification &&
        <div className="notification">
          {notification}
        </div>
      }
    </div>
  )
}
