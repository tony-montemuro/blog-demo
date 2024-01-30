import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const TABLE_WIDTH = 3;

  useEffect(() => {
    setLoading(true);
    AxiosClient.get("/blog")
      .then(({ data }) => {
        console.log(data.data);
        setBlogs(data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Blogs</h1>
        <Link to="/blogs/new" className="btn-add">Upload blog</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Create Date</th>
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
              { blogs.map(blog => {
                return (
                  <tr key={ blog.id }>
                    <td>{ blog.title }</td>
                    <td>{ blog.user.name }</td>
                    <td>{ blog.created_at }</td>
                  </tr>
                );
              })}
            </tbody>
          }

        </table>
      </div>
    </div>
  );
};