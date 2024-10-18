import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()
  const [pagination, setPagination] = useState({
      links: {},
      meta: {}
  });

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification("User deleted successfully.")
        getUsers();
      })
  }

  const getUsers = (page = 1) => {
    setLoading(true);
    axiosClient.get(`/users?page=${page}`)
      .then(({data}) => {
        setLoading(false)
        console.log("users data: ", data);
        setUsers(data.data);
        setPagination({
            links: data.links,
            meta: data.meta
        });
      })
  }

  function Pagination({ links, setCurrentPage, meta }) {
    return (
        <div className="pagination">
            {/* <button
                disabled={!links.prev}
                onClick={() => setCurrentPage(parseInt(links.prev.split('page=')[1]))}
            >
                {`< Previous`}
            </button> */}

            {meta.links && meta.links.map((link, index) => (
                <button
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    key={index}
                    onClick={() => setCurrentPage(parseInt(link.url.split('page=')[1]))}
                    className={link.active ? 'active' : ''}
                >
                </button>
            ))}

            {/* <button
                disabled={!links.next}
                onClick={() => setCurrentPage(parseInt(links.next.split('page=')[1]))}
            >
                {`Next >`}
            </button> */}
        </div>
    );
  }



    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Users</h1>
            <Link to="/users/new" className="btn-add">Add New</Link>
          </div>

          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>


              {loading ?
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              :
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <Link className="btn-edit" to={'/users/'+user.id}>Edit</Link>
                        &nbsp;
                        <button onClick={e => onDelete(user)} className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              }
            </table>
            {/* Pagination Component */}
            <Pagination links={pagination.links} meta={pagination.meta} setCurrentPage={getUsers} />
          </div>
        </div>
    )
}

export default Users;
