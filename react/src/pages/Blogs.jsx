import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import timeAgo from "../utils/timeAgo";

export default function Blogs() {
  const navigate = useNavigate();
  const { user, setMessage } = useStateContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const TABLE_WIDTH = 4;

  const getBlogs = () => {
    setLoading(true);
    AxiosClient.get("/blog")
      .then(({ data }) => {
        setBlogs(data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    AxiosClient.delete(`/blog/${ id }`)
      .then(() => {
        setMessage("Blog was successfully deleted.");
        getBlogs();
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div id="blogs">
      <div style={ { display: "flex", justifyContent: "space-between", alignItems: "center" } }>
        <div id="blogs-title">
          <h1>Blogs</h1>
          <p>Create and view markdown blogs!</p>
        </div>
        <Link to="/blogs/new" className="btn-add">Upload blog</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Create Date</th>
              <th></th>
            </tr>
          </thead>

          { loading ?
            <tbody>
              <tr>
                <td colSpan={ TABLE_WIDTH } className="text-center">Loading...</td>
              </tr>
            </tbody>
          :
            <tbody>
              { blogs.length > 0 ?
                blogs.map(blog => {
                  return (
                    <tr id="row" key={ blog.id } onClick={() => navigate(`/blogs/${ blog.id }`)}>
                      <td>{ blog.title }</td>
                      <td>{ blog.user.name }</td>
                      <td>{ timeAgo(blog.created_at) }</td>
                      <td>
                        { user?.id === blog.user.id &&
                          <button onClick={ (e) => onDelete(e, blog.id) } className="btn-delete">Delete</button>
                        }
                      </td>
                    </tr>
                  );
                })
              :
                <tr>
                  <td colSpan={ 4 } className="text-center"><em>No blogs exist.</em></td>
                </tr>
              }
            </tbody>
          }

        </table>
      </div>
    </div>
  );
};